import React, { useState, useEffect, createContext, useContext } from 'react'
import { solve_linear_regression } from './linear_regression'
import 'katex/dist/katex.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-slider/dist/css/bootstrap-slider.css"
import { Plot_Law } from './Components/plot_components/plot';
import { Card_information } from './Components/information_components';
import { NavBar_Main } from './Components/navbar/navbar';


export const usePlots = createContext()


function App() {
  const [changeGraph, setChangeGraph] = useState({
    slope: 0,
    shift: 0,
  })
  const [original, setOriginal] = useState({
    demand: {
      original: {
        qd: [0, 10, 20, 30, 40],
        price: [40, 30, 20, 10, 0]
      }
    },
    supply: {
      original: {
        qd: [0, 10, 20, 30, 40],
        price: [0, 10, 20, 30, 40],
      }
    }

  })
  const [regression, setRegression] = useState({
    demand: {
      regression: {
        qd: [],
        price: []
      },
    },
    supply: {

      regression: {
        qd: [],
        price: []
      },
    }
  })

  const [trevenue, setTrevenue] = useState(0)
  const [range, setRange] = useState({
    qdmax: 0,
    pricemax: 0
  });

  useEffect(() => {
    console.log('change origninal', original)
    solve_linear_regression(original, regression, 
                  changeGraph, setRegression,
                  setRange, true)

  }, [original]);

  useEffect(() => {
    console.log('cahnge graph', original)
    solve_linear_regression(original, regression, 
                  changeGraph, setRegression,
                  setRange, false)

  }, [changeGraph]);





  return (
    <div>
      <usePlots.Provider value={{
        regression, setRegression,
        changeGraph, setChangeGraph,
        original, setOriginal,
        trevenue, setTrevenue,
        range, setRange
      }} >

        <NavBar_Main />

        <Container id="information" fluid >
          <Row className='d-flex justify-content-center'>
            <Col md>
              < Plot_Law />
            </Col>
            <Col md>
              <Card_information />
            </Col>
          </Row>
        </Container>
      </usePlots.Provider>


    </div>
  )
}




export default App

