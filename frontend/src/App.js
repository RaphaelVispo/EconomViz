import React , {useState, useEffect} from 'react'
import Plot from 'react-plotly.js';
import { InlineMath, BlockMath } from 'react-katex';
import {solve_linear_regression} from './linear_regression'
import 'katex/dist/katex.min.css';
import {Container, Navbar, Nav, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function App(){
  const [data_Supply, setData_Supply] = useState({
    original: {
      X: [0, 1, 2, 3, 4],
      y: [0, 1, 4, 9, 16],
    },
    regression: {
      X: [0, 1, 2, 3, 4],
      y: [0, 1, 4, 9, 16],      
    }

  });
  const [data_Demand, setdata_Demand] = useState({
    original: {
      X: [0, 1, 2, 3, 4],
      y: [16, 9, 4, 1, 0]
    },
    regression: {
      X: [0, 1, 2, 3, 4],
      y: [0, 1, 4, 9, 16],      
    }

  });

  
  useEffect(() => {
    solve_linear_regression(setData_Supply, data_Supply);
    solve_linear_regression(setdata_Demand, data_Demand);

  }, []);
  
  useEffect(() => {
    console.log("supply:", data_Supply);
  }, [data_Supply]);

  useEffect(() => {
    console.log("demand:", data_Demand);
  }, [data_Demand]);


  return(
    <div>

    <Navbar  bg="light"  expand="lg">
      <Container>
        <Navbar.Brand >EconomiViz</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>ECON 11</Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container id = "information">
      <Row>
        <Col>      
        <Plot
          data={[

            {
              x: data_Supply.regression.X  ,
              y: data_Supply.regression.y ,
              type: 'line',
              marker: {color: 'red'},
              line: { width: 5} ,
              name: 'Supply Regression',
            },
            {
              x: data_Demand.regression.X  ,
              y: data_Demand.regression.y ,
              type: 'line',
              marker: {color: 'blue'},
              line: { width: 5} ,
              name: 'Demand Regression',
            },
            {type: 'scatter',
              x: data_Supply.original.X,
              y: data_Supply.original.y,
              mode: 'markers',
              marker: {opacity: 0.5},
              name: 'Supply Data',
            },
            {type: 'scatter',
              x: data_Demand.original.X,
              y: data_Demand.original.y,
              mode: 'markers',
              marker: {opacity: 0.5},
              name: 'Demand Data',
            },
          ]}
          layout={{
            
              width: 1000,
              height: 800,
              margin: {
                l: 50, // left margin
                r: 50, // right margin
                t: 50, // top margin
                b: 50, // bottom margin
                pad: 4 // padding between plot area and the margin
              }}}
          ></Plot>
        </Col>
        <Col>      
        <div>
          <BlockMath>{`y = mx + b`}
          </BlockMath>
        </div>
      </Col>
      </Row>
    </Container>
    </div>
  )
}

export default App