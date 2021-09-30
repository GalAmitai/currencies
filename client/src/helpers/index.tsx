const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getName = (id: string) => {
    switch (id) {
        case 'btc_usd':
            return 'BTC -> USD';
            break;
        case 'eth_usd':
            return 'ETH -> USD';
            break;
        case 'ltc_usd':
            return 'LTC -> USD'
            break;
        default:
    }
}

export default {
    numberWithCommas,
    getName
}