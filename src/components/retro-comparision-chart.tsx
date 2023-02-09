import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { format } from 'date-fns';
import cn from 'classnames';
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from 'recharts';
import { Bitcoin } from './Icon/bitcoin';
import { EthereumDark } from './Icon/ethereum-dark';
import { SwapIcon } from './Icon/swap-icon';
import { Refresh } from './Icon/refresh';
import Button from './ui/button';
import { ArrowUp } from './Icon/arrow-up';
import { RadioGroup } from './ui/radio-group';
// import { useBreakpoint } from '../hooks/use-breakpoint';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import store from '../state'
import {
  weeklyComparison,
  monthlyComparison,
  yearlyComparison,
} from '../data/static/price-history-retro';
import { DefaultRootState, useSelector, useStore } from 'react-redux';
import { useDerivedSwapInfo, useSwapState } from 'src/state/swap/hooks';
import { Field } from '../state/swap/actions'
import useWrapCallback, { WrapType } from 'src/hooks/useWrapCallback';
import useENSAddress from 'src/hooks/useENSAddress';
import useToggledVersion, { Version } from 'src/hooks/useToggledVersion';
import { computeTradePriceBreakdown } from 'src/utils/prices';
import styled from 'styled-components';
import TradingViewChart from './TradingViewChart';

const ChartWrapper = styled.div`
  @media (min-width: 993px) and (max-width: 1440px){
    width: 100%;
    order: 3;
    margin-top: 24px;
    margin-inline: 0;
  }
  
`
interface RadioOptionProps {
  value: "1" | "3" | "5" | "15" | "30" | "60" | "120" | "180" | "240" | "D" | "W";
  label: string;
}

function RadioGroupOption({ value, label }: RadioOptionProps) {
  return (
    <RadioGroup.Option value={value}>
      {({ checked }: { checked: Boolean }) => (
        <span
          className={`relative flex h-8 cursor-pointer items-center justify-center rounded-lg px-3 text-sm uppercase tracking-wider ${
            checked ? 'text-white' : 'text-brand dark:text-gray-400'
          }`}
        >
          {checked && (
            <span className="absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-brand-gradient shadow-large" />
          )}
          <span className="relative">{label}</span>
        </span>
      )}
    </RadioGroup.Option>
  );
}

export default React.memo(function ComparisonChart() {
  // const { theme } = { theme: 'dark' };
  // const breakpoint = useBreakpoint();
  const [price] = useState(6.2);
  const [date] = useState(1624147200);
  const [status, setStatus] = useState<RadioOptionProps>({
    value: "1",
    label: "1M"
  });
  const [chartData, setChartData] = useState(yearlyComparison);
  const [priceDiff] = useState(-1.107);
  const [percentage] = useState('2.22%');
  const [toggleCoin, setToggleCoin] = useState(false);
  const formattedDate = format(new Date(date * 1000), 'MMMM d, yyyy hh:mma');
  const {
    v1Trade,
    v2Trade,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError
  } = useDerivedSwapInfo()
  const { independentField, typedValue, recipient } = useSwapState()
  const { wrapType, execute: onWrap, inputError: wrapInputError } = useWrapCallback(
    currencies[Field.INPUT],
    currencies[Field.OUTPUT],
    typedValue
  )
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const { address: recipientAddress } = useENSAddress(recipient)
  const toggledVersion = useToggledVersion()
  const trade = showWrap
    ? undefined
    : {
      [Version.v1]: v1Trade,
      [Version.v2]: v2Trade
    }[toggledVersion]




  const [fromToken, toToken] = useMemo(() => {
    const from = currencies[Field.INPUT]?.symbol || "ETH" 
    const to = currencies[Field.OUTPUT]?.symbol  || "USDT"
    return [from, to]
  }, [currencies]) 
  type valsT= {
    "1": string,
    "60": string,
    "D": string
  }
  const vals: valsT = {
    "1": "1M",
    "60": "1H",
    "D": "1D"
  }
  const changeStatus = (e: string) => {
    switch(e){
      case "1": setStatus({value:"1",label: "1M"});break;
      case "60": setStatus({value:"60",label: "1H"});break;
      case "D": setStatus({value:"D",label: "1D"});break;
    }
  }
  const formattedPrice = !toggleCoin ? (trade?.executionPrice?.toSignificant(6)) : trade?.executionPrice?.invert()?.toSignificant(6)
  
  return (
    <ChartWrapper className="rounded-lg bg-white shadow-card dark:bg-light-dark flex-auto  ">
      <div className="light:border light:border-slate-200 rounded-lg bg-white shadow-card dark:bg-light-dark px-4 pt-8 flex  justify-between	flex-col lg:flex-row">
        <div className="pb-12">
          <div className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 sm:text-base ">
            <span className="flex items-center gap-2.5">
              <span
                className={cn(
                  'flex items-center gap-2.5',
                  toggleCoin ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                <Bitcoin className="h-auto w-7 lg:w-9" />
                <EthereumDark className="h-auto w-7 lg:w-9" />
              </span>
              <span
                className={cn(
                  'flex items-end font-medium text-dark dark:text-gray-400',
                  toggleCoin ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                <span>{fromToken}</span>/<span>{toToken}</span>
              </span>
              <Button
                size="mini"
                color="gray"
                shape="circle"
                variant="transparent"
                onClick={() => setToggleCoin(!toggleCoin)}
                className="rotate-90 border border-gray-100 shadow-[0px_0px_14px_rgba(0,0,0,0.08)]  dark:border-gray-700"
              >
                <SwapIcon className="h-auto w-3" />
              </Button>
            </span>
          </div>
          <div className="ml-auto mt-5 flex items-end gap-3 text-base font-medium text-gray-900 dark:text-white sm:text-xl lg:flex-wrap 2xl:flex-nowrap">
            <span className="text-2xl font-semibold xl:text-4xl">{formattedPrice}</span>
            <span
              className={cn(
                'flex items-end',
                toggleCoin ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <span>{fromToken}</span>/<span>{toToken}</span>
            </span>

            <span
              className={cn(
                'mb-1 flex items-center text-xs sm:mb-0 sm:text-base',
                priceDiff > 0 ? 'text-green-500' : 'text-red-500'
              )}
            >
              <span
                className={`inline-flex ltr:mr-2 rtl:ml-2 ${
                  priceDiff > 0 ? '' : 'rotate-180'
                }`}
              >
                <ArrowUp />
              </span>
              {priceDiff} ({percentage})
            </span>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 sm:text-sm">
            <Refresh /> {formattedDate}
          </div>
        </div>
        <RadioGroup
          value={status.value}
          onChange={changeStatus}
          className="flex items-center gap-5 mx-auto lg:ml-auto"
        >
          <RadioGroupOption value="1" label="1M"/>
          <RadioGroupOption value="60" label="1H"/>
          <RadioGroupOption value="D" label="1D"/>
        </RadioGroup>
      </div>

      <div className="px-3 pb-4  mt-5 h-56 sm:mb-12 md:h-96 lg:h-[416px] xl:h-[479px] 3xl:h-[496px] 4xl:h-[580px] h-[500px]">
        <TradingViewChart
          symbol={!toggleCoin? `BINANCE:${fromToken}${toToken}`:`BITFINEX:${toToken}${fromToken}`}
          interval={status.value}/>
        
      
      </div>
    </ChartWrapper>
  );
});
