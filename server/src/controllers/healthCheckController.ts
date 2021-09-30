import { NextFunction, Request, Response } from "express";

const healthCheck = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({status: 200});
}

export default {
    healthCheck
}