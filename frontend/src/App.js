import React, {
  useState, useEffect, createContext,
} from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { solveLinearRegression, resetValues } from './linear_regression';
import 'katex/dist/katex.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.css';
import { PlotLaw } from './Components/plot_components/plot';
import { CardInformation } from './Components/information_components';
import { NavBarMain } from './Components/navbar/navbar';

export const usePlots = createContext();

function App() {
  const [changeGraph, setChangeGraph] = useState({
    slope: 0,
    shift: 0,
  });
  const [original, setOriginal] = useState({
    demand: {
      original: {
        qd: [0, 10, 20, 30, 40],
        price: [40, 30, 20, 10, 0],
      },
    },
    supply: {
      original: {
        qd: [0, 10, 20, 30, 40],
        price: [0, 10, 20, 30, 40],
      },
    },

  });
  const [regression, setRegression] = useState({
    demand: {
      regression: {
        qd: [],
        price: [],
      },
    },
    supply: {

      regression: {
        qd: [],
        price: [],
      },
    },
  });

  const [trevenue, setTrevenue] = useState(0);
  const [range, setRange] = useState({
    qdmax: 0,
    pricemax: 0,
  });

  useEffect(() => {
    solveLinearRegression(
      original,
      regression,
      changeGraph,
      setRegression,
      setRange,
      true,
      setChangeGraph,
    );
  }, [original]);

  useEffect(() => {
    solveLinearRegression(
      original,
      regression,
      changeGraph,
      setRegression,
      setRange,
      false,
    );
  }, [changeGraph]);

  return (
    <div>
      <usePlots.Provider value={{
        regression,
        setRegression,
        changeGraph,
        setChangeGraph,
        original,
        setOriginal,
        trevenue,
        setTrevenue,
        range,
        setRange,
      }}
      >

        <NavBarMain />

        <Container id="information" fluid>
          <Row className="d-flex justify-content-center">
            <Col md>
              <PlotLaw />
            </Col>
            <Col md>
              <CardInformation />
            </Col>
          </Row>
        </Container>
      </usePlots.Provider>

    </div>
  );
}

export default App;
