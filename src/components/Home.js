import React, { Component } from 'react';
import PieChart from './PieChart';
import axios from 'axios';
import DailyChart from './DailyChart';
import { Button } from "react-bootstrap";

class Home extends Component {
    constructor(props) {

        super(props)

        this.state = {
            // data: internetten alinacak yer de denilebilir ancak yatimi uzun olacagi icin tercih etmiyoruz
            confirmed: 0,
            recovered: 0,
            deaths: 0,
            lastUpdate: '',
            daily:false,
            totalConfirmed:[],
            totalDeaths:[]
        }
    }

    componentDidMount () {
        axios
            .get('https://covid19.mathdro.id/api')
            .then( res => res.data)
            .then( data => {
                                console.log(data)
                                this.setState({
                                    confirmed: data.confirmed.value,
                                    recovered:  data.recovered.value,
                                    deaths: data.deaths.value,
                                    lastUpdate: data.lastUpdate
                                })
                                console.log('this state :',this.state)
            })
    }

    seeDailyReport = () =>{
        this.setState({
            daily:true
        })
    }

    componentDidUpdate() {
        // console.log('componentDidUpdate has worked.')
        if (this.state.daily === true &&
            this.state.totalConfirmed.length === 0 &&
            this.state.totalDeaths.length === 0
            ){
                axios
                    .get('https://covid19.mathdro.id/api/daily')
                    .then(res => res.data)
                    .then( data => {
                            console.log('data:', data);

                            let totalConfirmed = data.map ( item => {
                                                                        return {
                                                                            x : new Date(item.reportDate),
                                                                            y : item.totalConfirmed
                                                                               }
                                                                     })
                            let totalDeaths = data.map ( item => {
                                                                    return{
                                                                            x : new Date (item.reportDate),
                                                                            y : item.deaths.total

                                                                    }
                                                                 })

                            this.setState ({
                                totalConfirmed,
                                totalDeaths
                            })
                    })

             }
    }


    render() {
        // CLASS COMPONENT lar icerisinde JS islemleri (Array yapisi, variable atama,toplama vs) bu kisimda yapilabilir.

        const {confirmed, recovered, deaths, lastUpdate , daily , totalConfirmed , totalDeaths} = this.state

        const pieChartData = [
                                { y: confirmed,
                                  label:'Confirmed',color:'#30475e'},
                                { y: recovered,
                                  label:'Recovered', color:'#216353'},
                                { y: deaths,
                                  label:'Deaths',color:'#d63447'}
        ]



        return (
            <div className="container text-center" >
                <PieChart
                    title = 'Covit-19 LAST UPDATE OVER THE WORLD'
                    date = { new Date(lastUpdate).toLocaleString()}
                    chartData = {pieChartData}

                />

                <h3 className="text-center text-danger mt-5">Click for daily report</h3>
                <Button className="mx-auto my-3" variant='outline-danger' onClick={this.seeDailyReport}>Click me</Button>

                <div>
                    {
                        daily ? <DailyChart totalConfirmed = {totalConfirmed} totalDeaths ={totalDeaths} /> : null
                    }
                </div>
                <div>
                    {
                        daily ? <DailyChart totalConfirmed = {totalConfirmed}  /> : null
                    }
                </div>
                <div>
                    {
                        daily ? <DailyChart totalDeaths ={totalDeaths} /> : null
                    }
                </div>

            </div>
        )
    }
}

export default Home;
