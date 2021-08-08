import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row,  Button , Image } from  'react-bootstrap';
import City from "./components/City";
import axios from "axios";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      lat:"0.0",
      lon:"0.0",
      cityName:""
      
    }
  }

  getDataHandler = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };

  //  url=`https://eu1.locationiq.com/v1/search.php?key=pk.60346fba30221450f0bd55e67928ff53&q=${this.state.cityName}&format=json`

  submitHandler =(e) => {
    e.preventDefault();
    let url=`https://eu1.locationiq.com/v1/search.php?key=pk.60346fba30221450f0bd55e67928ff53&q=${this.state.cityName}&format=json`
    axios.get(url).then(res=>{
        let data= res.data[0]
        this.setState({
           cityName : data.display_name ,
           lat:data.lat ,
           lon:data.lon
           


        })
      })

    }
    


  render() {
    return (
      
          <div>

        <h1>City Explore</h1>
        <form onSubmit={(e)=>{this.submitHandler(e)}} >
          <input type="text" onChange={(e)=>{this.getDataHandler(e)}} placeholder="Enter A valid location"/>
          <Button type="submit">Explore!</Button>
        </form>
        <City cityName={this.state.cityName} lat={this.state.lat} lon={this.state.lon}/>
        <Image src='`https://maps.locationiq.com/v3/staticmap?key=pk.60346fba30221450f0bd55e67928ff53&center=${res.data[0].lat},${res.data[0].lon}&zoom=16&size=600x600&markers=icon:large-red-cutout|${res.data[0].lat},${res.data[0].lon}|${res.data[0].lat},${res.data[0].lon}`' />
      </div>
   
    );
  }
}

export default App;



