import { IPool } from "./PlatformType";
import IWallet from "./walletType";

interface IAccount{
    wallet: IWallet,
    pools: IPool[],
}

export default IAccount;