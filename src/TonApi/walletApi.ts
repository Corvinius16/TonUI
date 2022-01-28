
import IAccount from "../types/AccountType";
import { IPool } from "../types/PlatformType";
import IWallet, { IWalletCoin,IWalletSwapCoin } from "../types/walletType";
import { Coins } from "./WalletCoinsMOCK/walletCoinsMock";
const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));     //Эмуляция ожидания


export const ConnectWallet = async () : Promise<string> =>{
    const accountId =  "0xasfgdfg"; //  Зашлушка для получения кошелька
    await delay(1000);              //  эмуляция задержки ответа от кошелька
    return accountId;
}
export const GetWalletBalance = async (wallet: IWallet): Promise<IWalletCoin[]> =>{
    const walletCoins = Coins;  //Эмуляция запроса получения баланса из кошелька
    await delay(1000);          //Эмуляция задержки ответа от кошелька
    return walletCoins;
}

export const SwapCoinInWallet = async (wallet: IWallet, swapInfo:IWalletSwapCoin): Promise<IWalletCoin[]> =>{
    const {fromCoin,toCoin} = swapInfo;

    const fIndex = wallet.coins.findIndex(el=>el.name == fromCoin.name); //Зашлушка для обмена валют
    if(fIndex != -1)
    {
     wallet.coins[fIndex].count -=fromCoin.count;
    }

    const sIndex = wallet.coins.findIndex(el=>el.name == toCoin.name);
    if(sIndex != -1)
    {
        wallet.coins[sIndex].count +=toCoin.count;
    }
    else{
        wallet.coins.push({
            name: toCoin.name,
            count: toCoin.count
        });
    }
    await delay(100);                 //эмуляция задержки
    return wallet.coins;
}

export const createPool = async (account: IAccount, wallet: IWallet, pool:IPool): Promise<IPool[]> =>{
    const {swapCoins} = pool;

    const fIndex = wallet.coins.findIndex(el=>el.name == swapCoins.fromCoin.coin.name); //Зашлушка для создания пула

    if(fIndex != -1)
    {
        wallet.coins[fIndex].count -=swapCoins.fromCoin.count;
    }

    const sIndex = wallet.coins.findIndex(el=>el.name == swapCoins.toCoin.coin.name);
    if(sIndex != -1)
    {
        wallet.coins[sIndex].count -=swapCoins.toCoin.count;
    }
    
    account.pools.push(pool);

    await delay(100);                 //эмуляция задержки
    return account.pools;
}
export const removePool = async (account: IAccount, wallet: IWallet, pool:IPool): Promise<IPool[]> =>{
    const {swapCoins} = pool;

    const fIndex = wallet.coins.findIndex(el=>el.name == swapCoins.fromCoin.coin.name); //Зашлушка для выхода из пула
   
    if(fIndex != -1)
    {
        wallet.coins[fIndex].count +=swapCoins.fromCoin.count;
    }
    else{
        wallet.coins.push({
            name: swapCoins.fromCoin.coin.name,
            count: swapCoins.fromCoin.count
        });
    }

    const sIndex = wallet.coins.findIndex(el=>el.name == swapCoins.toCoin.coin.name);

    if(sIndex != -1)
    {
        
        wallet.coins[sIndex].count +=swapCoins.toCoin.count;
    }
    else{
        wallet.coins.push({
            name: swapCoins.toCoin.coin.name,
            count: swapCoins.toCoin.count
        });
    }
    const poolIndex = account.pools.findIndex(el=>el.swapCoins.fromCoin.coin == pool.swapCoins.fromCoin.coin && el.swapCoins.toCoin.coin == pool.swapCoins.toCoin.coin);
    account.pools.splice(poolIndex,1);

    await delay(100);                 //эмуляция задержки
    return account.pools;
}