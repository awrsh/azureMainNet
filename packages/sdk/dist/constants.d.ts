import JSBI from 'jsbi'
export declare type BigintIsh = JSBI | bigint | string
export declare enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERIL = 5,
  KOVAN = 42,
  ARBITRUM_RINKEBY = 421611,
  ARBITRUM = 42161,
  AVALANCHE_FUJI_TESTNET = 43113,
  AVALANCHE_CMAINNET = 43114,
  FANTOM_TESTNET = 4002,
  FANTOM = 250,
  BNBTESTNET = 97,
  BNB = 56,
  OPTIMISM_GOERLI = 420,
  OPTIMISM = 10,
  POLYGON = 137,
  MUMBAI = 80001,
  HARMONY = 1666600000,
  HARMONY_TESTNET = 1666700000,
  HECO = 128,
  HECO_TESTNET = 256,
  CELO = 42220,
  CELO_TESTNET = 44787,
  ETHClassic = 61
}
export declare enum TradeType {
  EXACT_INPUT = 0,
  EXACT_OUTPUT = 1
}
export declare enum Rounding {
  ROUND_DOWN = 0,
  ROUND_HALF_UP = 1,
  ROUND_UP = 2
}
export declare const FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
export declare const INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
export declare const MINIMUM_LIQUIDITY: JSBI
export declare const ZERO: JSBI
export declare const ONE: JSBI
export declare const TWO: JSBI
export declare const THREE: JSBI
export declare const FIVE: JSBI
export declare const TEN: JSBI
export declare const _100: JSBI
export declare const _997: JSBI
export declare const _1000: JSBI
export declare enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}
export declare const SOLIDITY_TYPE_MAXIMA: {
  uint8: JSBI
  uint256: JSBI
}
