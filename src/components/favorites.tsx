import React from 'react';
import cn from 'classnames';
// import { TopPoolsData } from '../data/static/token-data';
// import CurrencySwapIcons from './ui/currency-swap-icons';
// import { CoinList } from './ui/currency-swap-icons';
import { useLayout } from '../hooks/use-layout';
import { LAYOUT_OPTIONS } from '../lib/constants';
import TopupButton from './ui/topup-button';
import OverviewChart from './ui/overview-chart';
import styled from 'styled-components';

interface TopPoolsProps {
  limit?: number;
}

const FavoriteWrapper = styled.div`
  @media (min-width: 768px){
    max-width: 450px;
  }
  @media (max-width: 768px){
    img{
      width: 100%;
    }
  }
  
  @media (min-width: 993px) and (max-width: 1440px){
    max-width: 320px;
    min-width: 295px;
    order: 2;
  }
`
export default function Favorites({ limit }: TopPoolsProps) {
  const { layout } = useLayout();
  return (
    <FavoriteWrapper
      className={cn(
        'rounded-lg bg-white shadow-card dark:bg-light-dark flex-auto mt-4 lg:mt-0',
      )}
    >
      <div className="p-3">
        <h3 className="mb-6 text-base font-medium uppercase">FAVORITES </h3>
        <div className="rounded-lg bg-white  shadow-card dark:bg-light-dark sm:p-3">
          <span className="col-span-2">
            Your favorite list is empty! Start building your favorite list by
            adding this pair.
          </span>
        </div>
        <TopupButton className="mb-12 lg:mb-44" />
      </div>
      <OverviewChart />
    </FavoriteWrapper>
  );
}
