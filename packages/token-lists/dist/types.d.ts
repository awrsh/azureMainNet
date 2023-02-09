declare type ExtensionValue = string | number | boolean | null | undefined;
export interface TokenInfo {
  readonly chainId: number;
  readonly address: string;
  readonly name: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly logoURI?: string | undefined;
  readonly tags?: string[] | undefined;
  readonly extensions?: {
    readonly [key: string]:
      | {
          [key: string]:
            | {
                [key: string]: ExtensionValue;
              }
            | ExtensionValue;
        }
      | ExtensionValue;
  };
}
export interface Version {
  readonly major: number;
  readonly minor: number;
  readonly patch: number;
}
export interface Tags {
  readonly [tagId?: string]: {
    readonly name?: string;
    readonly description?: string;
  };
}
export interface TokenList {
  readonly name: string;
  readonly timestamp?: string | any | undefined;
  readonly version?: Version | any | undefined;
  readonly tokens: TokenInfo[];
  readonly keywords?: string[] | any | undefined;
  readonly tags?: Tags;
  readonly logoURI?: string | any | undefined;
}
export {};
