import React, { Component } from 'react'
import { Container,Row,Col,Alert } from 'react-bootstrap'

export class Weather extends Component {

  render() {
    return (
      <div>
        <Container fluid style={{textAlign:"center"}}>
          <Row> 
            <Col>

            <span>{this.props.dateOfCountry}</span>
              <span>{this.props.description}</span>
            <br/>
              
              </Col>
          </Row>
        </Container>
        
      </div>
    )
  }
}

export default Weather