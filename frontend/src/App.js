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
export const solvedRegeression = createContext()


function App() {
  const [solved, setSolved] = useState({
    demand: {
      original: {
        qd: [0, 10, 20, 30, 40],
        price: [40, 30, 20, 10, 0]
      },
      regression: {
        qd: [],
        price: []
      },
    },
    supply: {
      original: {
        qd: [0, 10, 20, 30, 40],
        price: [0, 10, 20, 30, 40],
      },
      regression: {
        qd: [],
        price: []
      },
    },
    slope: 0,
    shift: 0,

  })
  const [ original, setOriginal] = useState({
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
  const [plots, setPlots] = useState({
    demand: {
      original: {
        qd: [0, 10, 20, 30, 40],
        price: [40, 30, 20, 10, 0]
      },
      regression: {
        qd: [],
        price: []
      },
    },
    supply: {
      original: {
        qd: [0, 10, 20, 30, 40],
        price: [0, 10, 20, 30, 40],
      },
      regression: {
        qd: [],
        price: []
      },
    },
    slope: 0,
    shift: 0,

  })


  useEffect(() => {
    console.log('plots', plots)
    // solve_linear_regression(setData_Supply, data_Supply);
    solve_linear_regression(plots, setSolved);

  }, [plots]);

  useEffect(() => {
    console.log("solved", solved)
  }, [solved])

  const setUsePlots = (input) => {
    setPlots(input)
  }
  const [trevenue, setTrevenue] = useState(0)



  return (
    <div>
      <usePlots.Provider value={{ plots, setUsePlots,original, setOriginal  }} >
        <solvedRegeression.Provider value={{
          solved, setSolved, trevenue, setTrevenue
        }}>
          <NavBar_Main />

          <Container id="information" fluid >
            <Row >
              <Col md={{ order: 6 }}>
                < Plot_Law />
              </Col>
              <Col md={{ order: 1 }}>
                <Card_information />
              </Col>
            </Row>
          </Container>
        </solvedRegeression.Provider>

      </usePlots.Provider>


    </div>
  )
}




export default App

