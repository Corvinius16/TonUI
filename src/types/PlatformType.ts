interface IPlatrform{
    priceTON: number,
    coins: ICoin[],
    isInited: boolean,
    slippageTolerance:number,
    pools: IPool[]
}
interface IPoolSwapCoin{
    coin: ICoin,
    count:number
}
export interface IPoolSwap{

    fromCoin: IPoolSwapCoin,
    toCoin: IPoolSwapCoin,
}
export interface IPool{
    swapCoins: IPoolSwap
    APR: number,
    Earned: number,
    Liquidity: number,
}

export interface ICoin{
    price: number,
    icon: string,
    name: string,
}

export default IPlatrform;

