import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row,  Button  , Alert} from  'react-bootstrap';
import City from "./components/City";
import axios from "axios";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      lat:"0.0",
      lon:"0.0",
      cityName:"" ,
      errorIn: false,
      errMessage: "",
      
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
    axios
    .get(url).then(res=>{
        let data= res.data[0]
        this.setState({
           cityName : data.display_name ,
           lat:data.lat ,
           lon:data.lon
           
        })
      })
      .catch((err) => {
                if (err.response) {
                  this.setState({
                    errorIn: true,
                    errMessage:
                      "Incorrect City Name  " 
                  });
                }
              });

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
        <img
              src={`https://maps.locationiq.com/v3/staticmap?key=pk.60346fba30221450f0bd55e67928ff53&center=${this.state.lat},${this.state.lon}&zoom=15`}
              alt=""
              
            />
            <Alert
              variant="danger"
              className="text-center p-5 mt-5 align-middle"
              style={{ height: "1rem" }}
            >
              {this.state.errMessage}
            </Alert>
      </div>
   
    );
  }
}

export default App;



