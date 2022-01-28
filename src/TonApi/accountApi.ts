import IAccount from "../types/AccountType";
import { IPool } from "../types/PlatformType";
import {Pools} from "./AccountPoolsMOCK/accountPoolsMock"
const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));     //Эмуляция ожидания


export const GetAccountPools = async (account: IAccount) : Promise<IPool[]> =>{
    const pools =  Pools;          //  Зашлушка для получения пулов аккаунта
    await delay(200);              //  эмуляция задержки ответа от кошелька
    return pools;
}