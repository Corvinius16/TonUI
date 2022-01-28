
import IPlatrform, { ICoin, IPool } from "../types/PlatformType";
import { Coins } from "./CoinsMOCK/coinsMOCK";
import {Pools} from "./PoolsMOCK/poolsMock";
const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));     //Эмуляция ожидания

export const GetPriceTON = async () : Promise<number> =>{
    const price = 3.167;        //  Зашлушка для получения стоимости TON
    await delay(100);            //  эмуляция задержки ответа от платформы
    return price;
}

export const GetCoins = async () : Promise<ICoin[]> =>{
    const coins = Coins;                   //  Зашлушка для получения монет
    await delay(100);            //  эмуляция задержки ответа от платформы
    return coins;
}

export const GetPools = async () : Promise<IPool[]> =>{
    const pools = Pools;         //  Зашлушка для получения пулов
    await delay(100);            //  эмуляция задержки ответа от платформы
    return pools;
}

export const AddPool = async (platform: IPlatrform, pool:IPool) : Promise<IPool[]> =>{
     //  Зашлушка для добавления нового пула
    const PIndex = platform.pools.findIndex(el=>el.swapCoins.fromCoin.coin == pool.swapCoins.fromCoin.coin && el.swapCoins.toCoin.coin == pool.swapCoins.toCoin.coin);
    if(PIndex!=-1){
        platform.pools[PIndex].Liquidity+=pool.Liquidity;
    }
    else{
        platform.pools.push(pool);
    }
    await delay(100);                //  эмуляция задержки ответа от платформы
    return platform.pools;
}
export const RemovePool = async (platform: IPlatrform, pool:IPool) : Promise<IPool[]> =>{
    //  Зашлушка для убавления пула
    const PIndex = platform.pools.findIndex(el=>el.swapCoins.fromCoin.coin == pool.swapCoins.fromCoin.coin && el.swapCoins.toCoin.coin == pool.swapCoins.toCoin.coin);
    platform.pools[PIndex].Liquidity -=pool.Liquidity;
    if(platform.pools[PIndex].Liquidity === 0)
    {
        platform.pools.splice(PIndex,1);
    }
    await delay(100);                //  эмуляция задержки ответа от платформы
    return platform.pools;
}





