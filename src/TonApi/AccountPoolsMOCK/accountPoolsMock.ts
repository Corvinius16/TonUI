import { ICoin, IPool } from "../../types/PlatformType";
import { Coins } from "../CoinsMOCK/coinsMOCK";
const GetCoinByName = (name:string) :ICoin =>{
    const coin = Coins.find(x=>x.name == name);
    return coin!;
}

export const Pools: IPool[] = [
    {
        swapCoins:
        {
            fromCoin:{
                coin:  GetCoinByName("BNB"),
                count:10
            },
            toCoin:{
                coin:  GetCoinByName("TON"),
                count:50
            },
        },
        APR:40,
        Earned:150,
        Liquidity:300
    },
    {
        swapCoins:
        {
            fromCoin:{
                coin:  GetCoinByName("MANA"),
                count:20
            },
            toCoin:{
                coin:  GetCoinByName("UNI"),
                count:60
            },
          
        },
        APR:10,
        Earned:70,
        Liquidity:100
    },
    {
        swapCoins:
        {
            fromCoin:{
                coin:  GetCoinByName("ETH"),
                count:0.3
            },
            toCoin:{
                coin:  GetCoinByName("1INCH"),
                count:10,
            },
        },
        APR:24,
        Earned:60,
        Liquidity:200
    },
]