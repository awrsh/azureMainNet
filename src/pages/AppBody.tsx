/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { isMobile, isTablet } from 'react-device-detect';
import Marquee from 'react-fast-marquee';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { HotIcon } from '../components/Icon/Icons';
import './globals.css';
import './swiper.css';
import './test.css';
import './nav.scss';
import './scrollbar.scss';
import './range-slider.css';
import 'tailwindcss/tailwind.css';
import { InfluxDB } from '@influxdata/influxdb-client';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// import { UniswapTradingview, Dex } from 'uniswap-tradingview'
// import TradingView from '../utils/tradingview/main'
import { banners, tickerItems } from '../constants/swap-data/data'
import TopCurrencyTable from 'src/components/CurrencyTable';
import Favorites from 'src/components/favorites';
import ComparisonChart from 'src/components/retro-comparision-chart';
import Tricker from 'src/components/tricker';
import SwapPage from 'src/components/swap';
export const MainWrapper = styled.div`
  width: 100%;
  .d-none {
    display: none !important;
  }
  .swap_box_wrapper{    
    flex-wrap: nowrap;
    gap: 0 12px;
  }
  

  @media (max-width: 1023px) {
    .swap_box_wrapper{
      gap: 24px ;
      padding: 16px;
    }
    
    .currency-table .os-content-arrange{
        display: none;
    }
  }
 
`;
export const BodyWrapper = styled.div`
  position: relative;
  
  margin: 0 auto;
  background: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01);
  padding: 1rem;

  @media (max-width: 1441px) and (min-width: 1023px) {
    width: 28%;
    max-width: 400px;
    min-width: 350px;
  }
  @media (min-width: 1441px) {
    min-width: 465px;
  }
  @media (max-width: 1023px) {
    width: 100%;
  }
`;

export default function AppBody({ children }: { children: React.ReactNode }) {
  const getData = async (t = '0x55d398326f99059ff775485246999027b3197955') => {
    const token =
      'M6lZJYgygHhLfcWJSK6EQbkyFFK6mUQ1OPmbBgBI7inUhk52olVI4iVf8JVn7L8TPDEpKYwzZJ6RCWdnizQmjw==';
    const org = 'abba';
    const bucket = 'default';
    const url = 'http://82.115.18.68:8068';

    const query = `from(bucket: "${bucket}")
        |> range(start: -24h)
        |> filter(fn: (r) => r["_measurement"] == "transfer")
        |> filter(fn: (r) => r["token"] == "${t}")
        `;
    const res: {
      [key: string]:
        | {
            token: string;
            symbol: string;
            name: string;
            to: string;
            from: string;
            tokenValue: string;
            otherSymbolName: string;
            amount: string;
          }
        | any;
    } = {};

    const queryApi = await new InfluxDB({
      url,
      token,
      transportOptions: { rejectUnauthorized: false },
    }).getQueryApi(org);
    await queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        const item = res[o._time] || {};
        item[o._field] = o._value;
        res[o._time] = item;
      },
      complete() {
        // alert();
      },
      error(error: Error) {
        console.log('query failed- ', error);
      },
    });
    console.log('res is', res);
    return res;
  };
  useEffect(() => {
    getData('0x55d398326f99059ff775485246999027b3197955');
    document.body.classList.add('app-page');
    return () => {
      document.body.classList.remove('app-page');
    };
  }, []);
  let num = 4;
  if (isMobile && !isTablet) {
    num = 1;
  } else if (isTablet) {
    num = 2;
  }

  return (
    // <section id="main_wrap">
    <MainWrapper className="rounded-lg pt-[64px]">
      <section id="content_wrapper" className="">
       
        <div className="header-hot-pairs ">
        <Marquee pauseOnHover gradient={false} speed={150}> 
            {tickerItems.map((item, index) => {
              return (
                <div className="ticker_view" key={item.name + index}>
                  <span>#{index + 1}</span>
                  <p>{item.name}</p>
                  {/* <HotIcon /> */}
                  <img src={item.logo} />
                </div>
              )
            })}
          </Marquee>
          {/* <Tricker /> */}
        </div>
        <div className="promo_box d-none">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={15}
            navigation
            slidesPerView={num}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {banners.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    <img src={item.imgUrl} />
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="swap_wrapper">
          <section className="swap_box_wrapper flex  flex-col lg:flex-row  ">
            <BodyWrapper className='roundend-lg'>
              {children}
            </BodyWrapper>
            {/* <div className="rounded-lg bg-white shadow-card dark:bg-light-dark flex-none lg:w-[400px]">
              <SwapPage></SwapPage>
            </div> */}
            <ComparisonChart />
            <Favorites />
          </section>

          <TopCurrencyTable />
        </div>
      </section>
    </MainWrapper>
  );
}
