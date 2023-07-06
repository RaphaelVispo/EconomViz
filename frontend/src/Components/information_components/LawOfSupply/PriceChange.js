import { BlockMath, InlineMath } from 'react-katex';
import React, { useContext, useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import {
  Form, Container, Row, Col, Button,
} from 'react-bootstrap';
import { usePlots } from '../../../App';

export default function ElasticitySupply() {
  const {
    regression,
    changeGraph, setChangeGraph,
    listSupplyRevenue,
    setListSupplyRevenue,
  } = useContext(usePlots);

  const [revenue, setRevenue] = useState([{}]);
  useEffect(() => {
    setRevenue(() => listSupplyRevenue);
  }, [listSupplyRevenue]);

  const handleAddRevenue = (id) => {
    setRevenue([...revenue, { id: id + 2 }]);
    setListSupplyRevenue([...revenue, { id: id + 2, show: true, value: 0 }]);
  };

  const handleSubtractRevenue = (i) => {
    const values = [...revenue];
    values.splice(i, 1);
    setRevenue([...values]);
    setListSupplyRevenue([...values]);
  };

  return (
    <>
      <Form>
        {
          revenue.map((field, i) => {
            console.log('field', field);
            return (
              <Container xs className="p-4">
                <Row>
                  <Col xs={1}>
                    <Form.Check // prettier-ignore
                      type="checkbox"
                      checked={!field.show}
                      onChange={() => {
                        const newArr = [...revenue];
                        newArr[i].show = !field.show;
                        setRevenue(newArr);
                        setListSupplyRevenue(newArr);
                      }}
                    />
                  </Col>

                  <Col xs={4}>
                    <InlineMath math={`P_${i} = ${parseFloat(regression.supply.regression.price[field.value]).toFixed(2)}`} />
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
                  {/* <Col xs={3}>
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
                  </Col> */}
                </Row>

                <Col>
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
                    disabled={field.show}
                    value={field.value}
                    onChange={(e) => {
                      const newArr = [...revenue];
                      newArr[i].value = e;

                      setRevenue(newArr);
                      setListSupplyRevenue(newArr);
                    }}
                  />

                </Col>

              </Container>
            );
          })
}
      </Form>
      <br />

      <h5> Rotate</h5>

      <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        markClassName="customSlider-mark"
        marks={20}
        min={-100}
        max={100}
        defaultValue={0}
        value={changeGraph.supply.slope}
        onChange={(slope) => {
          setChangeGraph((plots) => ({
            ...plots,
            supply: {
              ...plots.supply,
              slope,
            },
          }));
        }}
      />
      <br />

      <br />
      <h5>Change in Demand (shift) </h5>

      <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        markClassName="customSlider-mark"
        step={1}
        min={-100}
        max={100}
        defaultValue={0}
        value={changeGraph.supply.shift}
        onChange={(shift) => {
          setChangeGraph((plots) => ({
            ...plots,
            supply: {
              ...plots.supply,
              shift,
            },

          }));
        }}
      />

      {/* <br />
      <br />

      <h5> Own Price Elasticity of Demand </h5>
      <h6> Using Arc Elasticity </h6>
      <p>
        The own price elasticity of demend measures the responsiveness of
        Quantity Demanded of a good to change in its own price
      </p>
      <BlockMath
        math={`\\big | \\epsilon \\big |
              = \\left | \\frac{${Q2.toFixed(2)} - ${Q1.toFixed(2)}}{${Q2.toFixed(2)} + ${Q1.toFixed(2)}} \\div
             \\frac{${P2.toFixed(2)} - ${P1.toFixed(2)}}{${P2.toFixed(2)} + ${P1.toFixed(2)}} \\right|
             \\allowbreak =| ${elasticity.toFixed(2) === '-0.00' ? '0.00' : elasticity.toFixed(2)} | = ${Math.abs(elasticity.toFixed(2))}`}
      /> */}

    </>

  );
}
