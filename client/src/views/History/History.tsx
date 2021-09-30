import { Link, Redirect } from "react-router-dom";
import { Layout } from "../../components/Layout"
import './History.css';
import Helper from './../../helpers';
import { useEffect, useState } from "react";
import axios from 'axios';
import environment from "../../config";

export const History = ({ match }: any) => {

    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.get(environment.serverBaseUrl + '/api/get-history?type=' + type).then((response: any) => {
            setHistory(response.data.data);
        }).finally(() => setLoading(false));
    }, []);

    const type: string = match.params.type;
    const allowTypes: string[] = ['btc_usd', 'eth_usd', 'ltc_usd']
    if (!allowTypes.includes(type)) {
        return <Redirect to="/404" />
    }

    return (
        <div className="center">
            <Layout>
                <main className="_p-history">
                    <div className="currency_icon">
                        <img src={process.env.PUBLIC_URL + '/assets/images/icons/coin-' + type.split('_')[0] + '.png'} alt="" />
                    </div>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th colSpan={3}>History of {Helper.getName(type)}</th>
                                <th>CryptoCompare</th>
                                <th>Bitstamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history && history.map((row: any) => {
                                    return <tr key={row.date}>
                                        <td colSpan={3}>{row.date.split('.')[0].replace('T', ' ')}</td>
                                        <td>{Helper.numberWithCommas(row.cryptocompare)}$</td>
                                        <td>{Helper.numberWithCommas(row.bitstamp)}$</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    <Link to="/" className="back-btn">BACK</Link>
                </main>
            </Layout>
        </div>
    )
}