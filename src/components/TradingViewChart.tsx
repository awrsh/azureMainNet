import React from 'react'
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets'

type Type = {
    symbol: string;
    interval: "1" | "3" | "5" | "15" | "30" | "60" | "120" | "180" | "240" | "D" | "W" | undefined
}
const TradingViewChart = React.memo(({
    symbol,
    interval

}: Type) => {
    return <AdvancedRealTimeChart
          symbol={symbol}
          theme={'dark'}
          timezone="Etc/UTC"
          locale="en"
          autosize
          interval={interval}
        />
})
export default TradingViewChart