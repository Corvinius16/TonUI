
const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));     //Эмуляция ожидания

export const GetPriceTON = async () : Promise<number> =>{
    const price = 3.167;        //  Зашлушка для получения стоимости TON
    await delay(100);            //  эмуляция задержки ответа от платформы
    return price;
}
