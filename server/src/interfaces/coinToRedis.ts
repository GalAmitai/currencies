export interface ICoinToRedis {
    date?: Date,
    cryptocompare: number,
    bitstamp: number
}

export class Coin {

    date: Date = new Date();
    cryptocompare: number;
    bitstamp: number;

    constructor(obj: ICoinToRedis) {
        this.date = obj.date ?? this.date;
        this.cryptocompare = obj.cryptocompare;
        this.bitstamp = obj.bitstamp;
    }

    static create(obj: ICoinToRedis) {
        if(obj) {
            return new Coin({
                date: obj.date,
                cryptocompare: obj.cryptocompare,
                bitstamp: obj.bitstamp,
            })
        }
    }
}