import React , {useState, useEffect} from 'react'
import {solve_linear_regression} from './linear_regression'
import 'katex/dist/katex.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-slider/dist/css/bootstrap-slider.css"
import { Plot_Law } from './Components/plot_components/plot';
import { Card_information } from './Components/information_components';
import { NavBar_Main } from './Components/navbar/navbar';


function App(){
  const [data_Supply, setData_Supply] = useState({
    original: {
      X: [0, 10, 20, 30, 40],
      y: [0, 10, 20, 30, 40],
    },
    regression: {
      X: [],
      y: [],      
    }

  });
  const [data_Demand, setdata_Demand] = useState({
    original: {
      X: [0, 10, 20, 30, 40],
      y: [40, 30, 20, 10, 0]
    },
    regression: {
      X: [],
      y: [],      
    }

  });

  const [data_slider, setData_slider] = useState(0)

  const [slope_slider, setSlope_slider] = useState(0)

  const [shift_slider, setShift_slider] = useState(0)

  
  useEffect(() => {
    solve_linear_regression(setData_Supply, data_Supply);
    solve_linear_regression(setdata_Demand, data_Demand, slope_slider, shift_slider);

  }, [slope_slider, shift_slider]);

  useEffect(() => {
    console.log(data_Demand)
  })

  const adjust_slider = (value) => {
      setData_slider(value)
  };

  const adjust_slope_slider = (value) => {
    setSlope_slider(value)
  };


  const adjust_shift_slider = (value) => {
    setShift_slider(value)
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
              shift_slider = {shift_slider}
              adjust_shift_slider  = {adjust_shift_slider}
              data_Demand = {data_Demand}
              data_slider = {data_slider}
              slope_slider = {slope_slider}
              adjust_slider = {adjust_slider}
              adjust_slope_slider = {adjust_slope_slider}
          />
        </Col>
      </Row>
    </Container>

    </div>
  )
}


export default App

