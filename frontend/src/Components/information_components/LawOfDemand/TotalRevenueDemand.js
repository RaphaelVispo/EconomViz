import { InlineMath, BlockMath } from 'react-katex';
import React, { useContext, useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import { usePlots } from '../../../App';
import { Col, Container, Button, Row, Form } from 'react-bootstrap';

export default function TotalRevenueDemand() {
  const {
    listRevenue, setListRevenue,
    regression, trevenue, setTrevenue,
  } = useContext(usePlots);

  const demandRegressionQd = regression.demand.regression.qd[trevenue];
  const demandRegressionP = regression.demand.regression.price[trevenue];
  const Total = demandRegressionQd * demandRegressionP;


  const [revenue, setRevenue] = useState([{}]);

  const handleAddRevenue  = (id) => {
    setRevenue([...revenue, { id: id + 2 }]);
    setListRevenue([...revenue, { id: id + 2, show: true, value:0}])
  };

  const handleSubtractRevenue = (i) => {
    const values = [...revenue];
    values.splice(i, 1);
    setRevenue([...values]);
    setListRevenue([...values])
  };

  useEffect(()=>{
    setRevenue(()=> listRevenue)
  }, [])



  return (
    <>
      <Form>
        {
          revenue.map((field, i) => {
            console.log("field", field)
            return (
              <Container xs className='p-4'>
                <Row>
                  <Col xs = {1}>
                  <Form.Check // prettier-ignore
                    type='checkbox'
                    checked={field.show }
                    onChange={() => {
                      let newArr = [...revenue];
                      newArr[i].show = !field.show;
                      setRevenue(newArr);
                      setListRevenue(newArr)
                    }}
                  />
                  </Col>

                  <Col xs={4}>
                    <InlineMath math={`P_${i} = ${parseFloat(regression.demand.regression.price[field.value]).toFixed(2)}`} />

                  </Col>
                  <Col xs={4}>
                    <Button
                      className="mx-1"
                      type="button"
                      onClick={() => handleAddRevenue(i)}
                    >
                      +
                    </Button>
                    <Button
                      disabled={field.id === 0}
                      type="button"
                      onClick={() => handleSubtractRevenue(i)}
                    >
                      -
                    </Button>
                  </Col>
                  <Col xs={3}>
                    <Button
                      type="button"
                      onClick={() => {
                        setTrevenue((val) => {
                          return field.value
                        })
                      }}
                    >
                      Solve
                    </Button>
                  </Col>
                </Row>

                <Col >
                  <ReactSlider
                    key={field.id}
                    className="customSlider"
                    thumbClassName="customSlider-thumb"
                    trackClassName="customSlider-track"
                    markClassName="customSlider-mark"
                    marks={20}
                    min={0}
                    max={regression.demand.regression.qd.length - 1}
                    defaultValue={0}
                    disabled = {!field.show}
                    value={field.value}
                    onChange={(e) => {
                      let newArr = [...revenue];
                      newArr[i].value = e;

                      setRevenue(newArr);
                      setListRevenue(newArr)
                    }
                    }
                  />

                </Col>

              </Container>)

          })}
      </Form>



      <h5> Total Revenue Equation</h5>
      <BlockMath>TR ~= ~ P \times Q</BlockMath>
      <BlockMath
        math={`TR =${parseFloat(demandRegressionP).toFixed(2)} ~\\times~ ${parseFloat(demandRegressionQd).toFixed(2)} ~= ~${Total.toFixed(2)}`}
      />



    </>

  );
}
