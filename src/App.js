import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, 
         Container,  Button ,
         Form , Card  , Alert} from  'react-bootstrap';
import City from "./components/City";
import axios from "axios";
import Weather from "./components/Weather";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      lat:"",
      lon:"",
      cityName:"" ,
    
      messg: "",
      weath: [],
      desplyErr: false,
      
    }
  }



  submitHandler =(e) => {
    e.preventDefault();
    let url=`https://eu1.locationiq.com/v1/search.php?key=pk.ad87c64612b056fde5d2ab5b6a10d94d&q=${e.target.city.value}&format=json`
    axios
    .get(url).then(res=>{
        let data= res.data[0]
        this.setState({
           cityName : data.display_name ,
           lat: `lat: ${data.lat}`,
           lon: `lon: ${data.lon}`,
           mapUrl: `https://maps.locationiq.com/v3/staticmap?key=pk.ad87c64612b056fde5d2ab5b6a10d94d&center=
           ${data.lat},${data.lon}&size=300x300&zoom=14&markers=icon:large-red-cutout&path=fillcolor:%2390EE90|weight:2|
           color:blue|enc:}woiBkrk}Mb@iKtC\CEhBsD|C`,
           desplyErr: false
           
        })
        
        this.weather(this.state.cityName)
      })
      .catch((err) => {
             this.setState({
              desplyErr: true,
               messg: 'the city not found' 
        })

                
              });

              

    }


    weather = (city) => {
      let url = `http://localhost:8080/weather/${city.split(',')[0]}`
  
      axios.get(url).then(res => {
        let data = res.data
        console.log(data)
  
        this.setState({
          weath: data,
          desplyErr: false,
  
        })
        console.log(this.state.weath);
      })
        .catch((error) => {
          // handle error
          this.setState({
            desplyErr: true,
            messg: 'the weather not found' ,
            weath: []
          })
  
  
        })
    }

    


    render() {
      return (
        <div>
          <Container fluid style={{width:"20rem",marginTop:"3rem"}}>
            <Row>
              <Col>
  
                {this.state.desplyErr && <Alert  variant='danger'>
                <span>{this.state.messg}</span>
                </Alert>}
              </Col>
            </Row>
          </Container>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "" }}>
  
  
            <Form onSubmit={(e) => { this.submitHandler(e) }} style={{ display: "flex", alignItems: "flex-start" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" name='city' style={{ width: "" }} placeholder="Explore Citys" />
  
              </Form.Group>
              <Button style={{ paddingRight: "1rem" }} variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card style={{ width: '20rem', alignItems: 'center', height: '20rem', margin: '1rem ', border: "" }}>
              <Card.Img variant="top" src={this.state.mapUrl} style={{ width: '20rem', height: "10rem" }} />
              <Card.Body>
                <Card.Title style={{ color: "red" }}>{this.state.cityName}</Card.Title>
                <Card.Text>
                  {this.state.lat}
  
  
                </Card.Text>
                <Card.Text>
                  {this.state.lon}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
  
          {this.state.weath && <>  {this.state.weath.map((ele) => {
            return (<Weather dateOfCountry={ele.date} description={ele.description} />)
          })} </>}
  
        </div>
      );
    }
  }
  

export default App;



