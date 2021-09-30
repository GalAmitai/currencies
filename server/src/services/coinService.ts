import logger from './loggerService';
import axios from 'axios';
import Redis from './../redis/index';
import { ICoinToRedis } from '../interfaces/coinToRedis';

const getLatest = async () => {
    
    logger.info(`Getting Latest Data To Redis`)

    const btc_usd: ICoinToRedis | null = await getBTCvUSD();
    const eth_usd: ICoinToRedis | null = await getETHvUSD();
    const ltc_usd: ICoinToRedis | null = await getLTCvUSD();
    
    // Store them inside DB
    if(btc_usd) {
        await Redis.prepareDataToRedis('btc_usd', btc_usd)
    }
    if(eth_usd) {
        await Redis.prepareDataToRedis('eth_usd', eth_usd)
    }
    if(ltc_usd) {
        await Redis.prepareDataToRedis('ltc_usd', ltc_usd)
    } 
}

const getBTCvUSD = async () => {
    try {
        const [response1, response2] = await axios.all([
            // BTC -> USD
            axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD'),
            axios.get('https://www.bitstamp.net/api/v2/transactions/btcusd/')
        ]);

        return {
            date: new Date(),
            cryptocompare: parseFloat(response1.data.USD),
            bitstamp: parseFloat(response2.data[0].price)
        }
    } catch (e) {
        logger.error(`F: getBTCvUSD`);
        console.error({ e });
        return null;
    }
}

const getETHvUSD = async () => {
    try {
        const [response1, response2] = await axios.all([
            // ETH -> USD
            axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'),
            axios.get('https://www.bitstamp.net/api/v2/transactions/ethusd/'),
        ]);

        return {
            date: new Date(),
            cryptocompare: parseFloat(response1.data.USD),
            bitstamp: parseFloat(response2.data[0].price)
        }
    } catch (e) {
        logger.error(`F: getETHvUSD`);
        console.error({ e });
        return null;
    }
}

const getLTCvUSD = async () => {
    try {
        const [response1, response2] = await axios.all([
            // LTC -> USD
            axios.get('https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD'),
            axios.get('https://www.bitstamp.net/api/v2/transactions/ltcusd/')
        ]);

        return {
            date: new Date(),
            cryptocompare: parseFloat(response1.data.USD),
            bitstamp: parseFloat(response2.data[0].price)
        }
    } catch (e) {
        logger.error(`F: getLTCvUSD`);
        console.error({ e });
        return null;
    }
}

export default {
    getLatest
};