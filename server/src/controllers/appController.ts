import { NextFunction, Request, Response } from "express";
import Redis from '../redis/index';

const getShoutbox = async (req: Request, res: Response, next: NextFunction) => {
    let message = '';
    try {
        const response = await Redis.getValue('shoutbox');
        message = response;
    } catch(e) {
        message = ''
    }
    res.status(200).json({
        data: message
    });
}

const setShoutbox = async (req: Request, res: Response, next: NextFunction) => {
    const message = req.body.message;
    try {
        await Redis.setValue('shoutbox', message);
    } catch(e) {
        res.status(400).json({
            status: 'Error'
        });
        return;
    }
    res.status(200).json({
        status: 200
    });
}

export default {
    setShoutbox,
    getShoutbox,
}