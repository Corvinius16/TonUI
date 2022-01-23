

const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));     //Эмуляция ожидания


export const ConnectWallet = async () : Promise<string> =>{
    const accountId =  "0xasfgdfg"; //  Зашлушка для получения кошелька
    await delay(1000);              //  эмуляция задержки ответа от кошелька
    return accountId;
}
