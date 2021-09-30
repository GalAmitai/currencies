import { ICoinToRedis } from "../interfaces/coinToRedis";

const asyncRedis = require("async-redis");
const client = asyncRedis.createClient(6379, 'redis');

client.on('error', (err: any) => {
    console.log('Redis Client Error', err);
});

const setValue = async (key: string, value: string) => {
    try {
        return await client.set(key, value)
    } catch (e) {
        console.log({ setValue: e });
        return [];
    }
}

const getValue = async (key: string) => {
    try {
        return await client.get(key);
    } catch (e) {
        console.log({ getValue: e });
        return [];
    }
}

const getAllKeys = async (key: string) => {
    try {
        return await client.keys(key);
    } catch(e) {
        console.log({ getAllValues: e });
        return [];
    }
}

const getAllValues = async (key: string) => {
    try {
        return await client.mget(key);
    } catch(e) {
        console.log({ getAllValues: e });
        return [];
    }
}

const prepareDataToRedis = async (type: string, coin: ICoinToRedis) => {
    const key: string = `${type}:${new Date().toISOString()}`
    setValue(key, JSON.stringify(coin));
}

export default {
    setValue,
    getValue,
    getAllKeys,
    getAllValues,
    prepareDataToRedis
}