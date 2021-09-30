import { useState } from "react";
import { CoinBox } from "../../components/Coinbox/Coinbox";
import { Layout } from "../../components/Layout"
import axios from 'axios';

import './Home.css';
import environment from "../../config";
import { useEffect } from "react";

export const Home = ({ props }: any) => {

    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState({});

    useEffect(() => {
        try {
            axios.get(environment.serverBaseUrl + '/api/get-latest').then((response: any) => {
                setCoins(response.data);
                console.log({data: response.data});
            }).finally(() => setLoading(false));
        } catch(e) {
            console.log({e});
        }
    }, []);

    return (
        <div className="center">
            <Layout>
                <main>
                    <div className="coins">
                        {
                            Object.keys(coins).length > 0 
                            ?
                            Object.entries(coins).map(([key, value]: any) => {
                                if(value.length) {
                                    return <CoinBox key={key} coin={value} name={key} />
                                }
                                <h1>Loading...</h1>
                            })
                            :
                            <h1>Please refresh the page to update the data.</h1>
                        }
                    </div>
                </main>
            </Layout>
        </div>
    )
}