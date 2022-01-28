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
                count:0
            },
            toCoin:{
                coin:  GetCoinByName("TON"),
                count:0
            },
        },
        APR:40,
        Earned:0,
        Liquidity:145288724
    },
    {
        swapCoins:
        {
            fromCoin:{
                coin:  GetCoinByName("UNI"),
                count:0
            },
            toCoin:{
                coin:  GetCoinByName("1INCH"),
                count:0
            },
        },
        APR:72,
        Earned:0,
        Liquidity:985464255
    },
    {
        swapCoins:
        {
            fromCoin:{
                coin:  GetCoinByName("1INCH"),
                count:0
            },
            toCoin:{
                coin:  GetCoinByName("TON"),
                count:0
            },
        },
        APR:130,
        Earned:0,
        Liquidity:1025878655
    },
    {
        swapCoins:
        {
            fromCoin:{
                coin:  GetCoinByName("MANA"),
                count:0
            },
            toCoin:{
                coin:  GetCoinByName("UNI"),
                count:0
            },
        },
        APR:10,
        Earned:0,
        Liquidity:5488962235
    },
    {
        swapCoins:
        {
            fromCoin:{
                coin:  GetCoinByName("DOGE"),
                count:0
            },
            toCoin:{
                coin:  GetCoinByName("TON"),
                count:0
            },
        },
        APR:5,
        Earned:0,
        Liquidity:5420256854
    },
    {
        swapCoins:
        {
            fromCoin:{
                coin:  GetCoinByName("ETH"),
                count:0
            },
            toCoin:{
                coin:  GetCoinByName("1INCH"),
                count:0
            },
        },
        APR:24,
        Earned:0,
        Liquidity:1235587756
    },
    {
        swapCoins:
        {
            fromCoin:{
                coin:  GetCoinByName("BTC"),
                count:0
            },
            toCoin:{
                coin:  GetCoinByName("TRX"),
                count:0
            },
        },
        APR:18,
        Earned:0,
        Liquidity:198542048
    },
    {
        swapCoins:
        {
            fromCoin:{
                coin:  GetCoinByName("BTC"),
                count:0
            },
            toCoin:{
                coin:  GetCoinByName("ADA"),
                count:0
            },
        },
        APR:750,
        Earned:0,
        Liquidity:120584558
    },
]