import React , {useState, useEffect} from 'react'
import {solve_linear_regression} from './linear_regression'
import 'katex/dist/katex.min.css';
import {Container, Navbar, Nav, Row, Col, Card, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-slider/dist/css/bootstrap-slider.css"
import { Plot_Law } from './Components/plot_components/plot';
import { Card_information } from './Components/information_components';
import { NavBar_Main } from './Components/navbar/navbar';


function App(){
  const [data_Supply, setData_Supply] = useState({
    original: {
      X: [0, 1, 2, 3, 4],
      y: [0, 1, 4, 9, 16],
    },
    regression: {
      X: [],
      y: [],      
    }

  });
  const [data_Demand, setdata_Demand] = useState({
    original: {
      X: [0, 1, 2, 3, 4],
      y: [16, 9, 4, 1, 0]
    },
    regression: {
      X: [],
      y: [],      
    }

  });

  const [data_slider, setData_slider] = useState(0)

  
  useEffect(() => {
    solve_linear_regression(setData_Supply, data_Supply);
    solve_linear_regression(setdata_Demand, data_Demand);

  }, []);
  
  // useEffect(() => {
  //   console.log("supply:", data_Supply);
  // }, [data_Supply]);

  // useEffect(() => {
  //   console.log("demand:", data_Demand);
  // }, [data_Demand]);

  const adjust_slider = (value) => {
      setData_slider(value)
  };



  return(
    <div>

    <NavBar_Main />

    <Container id = "information" fluid = "true" >
      <Row >
        <Col md = {{order :6}}>      
          < Plot_Law 
          data_Demand = {data_Demand} 
          data_Supply = {data_Supply} 
          data_slider = {data_slider} />
        </Col>
        <Col  md = {{order:1}}>  
          <Card_information
              data_Demand = {data_Demand}
              data_slider = {data_slider}
              adjust_slider = {adjust_slider}
          />
        </Col>
      </Row>
    </Container>

    </div>
  )
}


export default App

