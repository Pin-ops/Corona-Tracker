import React, { Component } from 'react'
import axios from "axios";
import BarChart from './BarChart';
import {CardGroup} from "react-bootstrap";

class CountrySearch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            countries: [],
            usa:[],
            china:[],
            italy:[],
            germany:[],
            turkey:[],
            selectedCountry : '',
            other : {country: '', name: '', chartData: []}
        }
    }

    componentDidMount() {
        axios
            // .get('url')  when we have only one url
            // .all ([])    when we have more than one url, we have to use axios.all and write like an object
            .all ([
                axios.get ('https://covid19.mathdro.id/api/countries'),
                axios.get ('https://covid19.mathdro.id/api/countries/USA'),
                axios.get ('https://covid19.mathdro.id/api/countries/CHN'),
                axios.get ('https://covid19.mathdro.id/api/countries/ITA'),
                axios.get ('https://covid19.mathdro.id/api/countries/DEU'),
                axios.get ('https://covid19.mathdro.id/api/countries/TUR'),
            ])
            // to read all the url s we have to write axios.spread, it's a function
            .then( axios.spread ( (countryList, usa, china, italy, germany, turkey) => {
                        this.setState({
                            countries : countryList.data.countries.map( item => [item.name, item.iso3]),
                            usa : [usa.data.confirmed.value,
                                   usa.data.deaths.value,
                                   usa.data.recovered.value,
                                   usa.data.lastUpdate],
                            china : [china.data.confirmed.value,
                                   china.data.deaths.value,
                                   china.data.recovered.value,
                                   china.data.lastUpdate],
                            italy : [italy.data.confirmed.value,
                                   italy.data.deaths.value,
                                   italy.data.recovered.value,
                                   italy.data.lastUpdate],
                            germany : [germany.data.confirmed.value,
                                   germany.data.deaths.value,
                                   germany.data.recovered.value,
                                   germany.data.lastUpdate],
                            turkey : [turkey.data.confirmed.value,
                                   turkey.data.deaths.value,
                                   turkey.data.recovered.value,
                                   turkey.data.lastUpdate],
                            other : {country: this.state.selectedCountry}
                        }, () => console.log('2nd step : ',this.state))
            } ))
            // console.log('1st step);
    }


    componentDidUpdate() {
        console.log('componentDidUpdate has worked.');
        if (this.state.selectedCountry !== this.state.other.country) {
            console.log('Countries are different, thats why axios has worked again.')
            const short = this.state.selectedCountry.slice(this.state.selectedCountry.length - 3)
            axios
                .get(`https://covid19.mathdro.id/api/countries/${short}`)
                .then( res => res.data)
                .then( data => {
                    console.log(data);
                    const chartData =[ data.confirmed.value , data.deaths.value, data.lastUpdate];
                    const name = this.state.selectedCountry.split(',')[0];
                    const country = this.state.selectedCountry

                    this.setState({
                        other : {
                                    country,
                                    name,
                                    chartData
                                }
                    })
                })
        }
    }


    render() {

        const { usa, china, italy, germany, turkey, countries,other} = this.state
        const barChartCountries = [
            {
                name : 'CHINA',
                chartData : china
            },
            {
                name : 'USA',
                chartData : usa
            },
            {
                name : 'ITALY',
                chartData : italy
            },
            {
                name : 'GERMANY',
                chartData : germany
            },
            {
                name : 'TURKEY',
                chartData : turkey
            }

        ]


        return (
            <div className="mb-5" width="20%" >
                <CardGroup>
                        {
                            barChartCountries.map ( (item,index) =>
                                                    <div key={index} style={{width:'20%'}}>
                                                        <div style={{margin:'20px'}}>
                                                            <BarChart {...item} />
                                                        </div>

                                                    </div>

                                                )
                        }
                </CardGroup>
                <hr/>
                <div className="container">
                        <div>Select a Country</div>
                        <select
                            style={{height:'40px'}}
                            className="p-2"
                            onChange={
                                e => this.setState({
                                    selectedCountry : e.target.value
                                })
                            }
                            >
                            {
                                countries.map ( (item, index) =>
                                        <option key={index}>{item[0] + ', ' + item[1]}</option>

                                )
                            }
                        </select>
                        {
                            other.country ? <div className="px-3 mb-3">
                                                <BarChart {...other}/>
                                            </div> :
                                            null
                        }

                </div>

            </div>
        )
    }
}

export default CountrySearch;
