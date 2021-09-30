import './Coinbox.css';
import { Line } from "react-chartjs-2";
import Helper from '../../helpers';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export const CoinBox = ({ coin, name }: any) => {
    const currentData = coin[0];

    let diff1 = 0;
    let diff2 = 0;
    try {
        if(coin.length > 1 && currentData) {
            let prevData = coin[1];
            diff1 = ((currentData.cryptocompare - prevData.cryptocompare) / prevData.cryptocompare * 100)
            diff2 = ((currentData.bitstamp - prevData.bitstamp) / prevData.bitstamp * 100)
        }
    } catch(e) {
        console.log({e});
        return <Redirect to="/" />;
    }
    
    const dataLabels = coin.map((e:any) => {
        return e.date.split('T')[0];
    });
    const dataGraph1 = coin.map((e:any) => {
        return e.cryptocompare;
    });
    const dataGraph2 = coin.map((e:any) => {
        return e.bitstamp;
    })
    const data = {
        labels: dataLabels,
        datasets: [
            {
                label: 'Cryptocompare',
                data: dataGraph1,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: 'Bitstamp',
                data: dataGraph2,
                backgroundColor: "rgb(250, 129, 16, 0.2)",
                borderColor: "rgb(250, 129, 16)"
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{ display: false }],
            yAxes: [{ display: false }]
        },
        elements: {
            line: {
                tension: false
            }
        },
        tooltips: {
            mode: 'index',
            intersect: false
        }
    };

    return (
        <div className="coin-box">
            <div className="top">
                <div>
                    <div className="icon">
                        <img src={process.env.PUBLIC_URL + '/assets/images/icons/coin-' + name.split('_')[0] + '.png'} alt="" />
                    </div>
                    <div className="currency">{Helper.getName(name)}</div>
                </div>
                <div>
                    <Link to={"/history/" + name}><img src={process.env.PUBLIC_URL + '/assets/images/icons/history-btn.png'} className="history-btn" /></Link>
                </div>
            </div>
            <div className="price">
                <div>
                    <div className="_name c">Cryptocompare</div>
                    <div className="_price">
                        {Helper.numberWithCommas(currentData.cryptocompare)}$
                        <small className={diff1 >= 0 ? 'label plus' : 'label minus'}>({diff1.toFixed(2)}%)</small>
                    </div>
                </div>
                <div>
                    <div className="_name b">Bitstamp</div>
                    <div className="_price">
                        {Helper.numberWithCommas(currentData.bitstamp)}$
                        <small className={diff2 >= 0 ? 'label plus' : 'label minus'}>({diff2.toFixed(2)}%)</small>
                    </div>
                </div>
            </div>
            <div className="graph">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}