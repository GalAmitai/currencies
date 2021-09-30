import { NextFunction, Request, Response } from "express";
import { type } from "os";
import coinService from "../services/coinService";
import Redis from './../redis/index';


const refresh = async (req: Request, res: Response, next: NextFunction) => {
    await coinService.getLatest();
    res.status(200).json({
        status: 200
    });
}

const getLatest = async (req: Request, res: Response, next: NextFunction) => {
    // Call to server to bring the data from DB and return to client

    let btc_usd_keys = await Redis.getAllKeys('btc_usd*');
    let btc_usd_values = [];
    if (btc_usd_keys.length) {
        btc_usd_values = await Redis.getAllValues(btc_usd_keys);
    }
    let eth_usd_keys = await Redis.getAllKeys('eth_usd*');
    let eth_usd_values = [];
    if (eth_usd_keys.length) {
        eth_usd_values = await Redis.getAllValues(eth_usd_keys);
    }
    let ltc_usd_keys = await Redis.getAllKeys('ltc_usd*');
    let ltc_usd_values = [];
    if (ltc_usd_keys.length) {
        ltc_usd_values = await Redis.getAllValues(ltc_usd_keys);
    }

    res.status(200).json({
        btc_usd: Object.values(btc_usd_values).map(e => JSON.parse(e as string)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        eth_usd: Object.values(eth_usd_values).map(e => JSON.parse(e as string)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        ltc_usd: Object.values(ltc_usd_values).map(e => JSON.parse(e as string)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    });
}

const getHistory = async (req: Request, res: Response, next: NextFunction) => {
    // Call to server to bring the data from DB and return to client
    const types = ['btc_usd', 'eth_usd', 'ltc_usd'];
    const type = req.query?.type || '';
    if (!types.includes(type as string)) {
        res.status(200).json({ error: 'Bad Request' });
    } else {
        let keys = await Redis.getAllKeys(`${type}*`);
        let values = [];
        if (keys.length) {
            values = await Redis.getAllValues(keys);
        }
        res.status(200).json({ 
            data:  Object.values(values).map(e => JSON.parse(e as string)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        });
    }
}
export default {
    getLatest,
    getHistory,
    refresh
}