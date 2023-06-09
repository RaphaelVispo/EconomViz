import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import React, {
  useState, useContext, useEffect,
} from 'react';
import ReactSlider from 'react-slider';
import { usePlots } from '../../App';

export function MatrixInput() {
  const [DemandFields, setDemandFields] = useState([{
    id: 1,
  }, {
    id: 2,
  }]);
  const [SupplyFields, setSupplyFields] = useState([{
    id: 1,
  }, {
    id: 2,
  }]);
  const {
    original,
    setOriginal, regression,
    changeGraph, setChangeGraph,
  } = useContext(usePlots);

  // Demand Functions
  const handleChangeInputDemand = (i, e) => {
    const values = [...DemandFields];
    values[i][e.target.name] = e.target.value;
    setDemandFields(values);
  };

  const handleAddDemand = (id) => {
    setDemandFields([...DemandFields, { id: id + 2 }]);
  };

  const handleSubtractDemand = (i) => {
    const values = [...DemandFields];
    values.splice(i, 1);
    setDemandFields([...values]);
  };

  // Supply functions
  const handleChangeInputSupply = (i, e) => {
    const values = [...SupplyFields];
    values[i][e.target.name] = e.target.value;
    setSupplyFields(values);
  };

  const handleAddSupply = (id) => {
    setSupplyFields([...SupplyFields, { id: id + 2 }]);
  };

  const handleSubtractSupply = (i) => {
    const values = [...SupplyFields];
    values.splice(i, 1);
    setSupplyFields([...values]);
  };

  // submit function
  const onSubmit = () => {
    setOriginal((plot) => ({

      demand: {
        original: {
          qd: DemandFields.map((value) => parseInt(value.qd, 10)),
          price: DemandFields.map((value) => parseInt(value.price, 10)),
        },
      },
      supply: {
        ...plot.supply,
        original: {
          qd: SupplyFields.map((value) => parseInt(value.qd, 10)),
          price: SupplyFields.map((value) => parseInt(value.price, 10)),
        },
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  useEffect(() => {
    setDemandFields(() => (
      original.demand.original.qd.map((val, i) => ({
        id: i + 1,
        qd: original.demand.original.qd[i],
        price: original.demand.original.price[i],
      }))

    ));
    setSupplyFields(() => (
      original.supply.original.qd.map((val, i) => ({
        id: i + 1,
        qd: original.supply.original.qd[i],
        price: original.supply.original.price[i],
      }))

    ));
  }, [original]);

  return (

    <Container>

      <Form onSubmit={handleSubmit}>
        <Container className="px-1">

          <Form.Group controlId="formField">
            <Container className="my-4">
              <h4>Demand Points</h4>
              <Row className="mx-1" fluid>
                <Col xs><p>Quantity</p></Col>
                <Col xs className="d-flex">
                  <p className="float-left">Price</p>
                </Col>
              </Row>
              {
                DemandFields.map((field, i) => (
                  <Row fluid className="my-1">
                    <Col xs>
                      <Form.Control
                        required
                        value={field.qd}
                        name="qd"
                        onChange={(e) => handleChangeInputDemand(i, e)}
                        type="number"
                        placeholder="Value"
                      />
                    </Col>

                    <Col xs>
                      <Form.Control
                        required

                        value={field.price}
                        name="price"
                        onChange={(e) => handleChangeInputDemand(i, e)}
                        type="number"
                        placeholder="Value"
                      />
                    </Col>
                    <Col xs>
                      <Button
                        className="mx-1"
                        type="button"
                        onClick={() => handleAddDemand(i)}
                      >
                        +
                      </Button>
                      <Button
                        disabled={field.id <= 2}
                        type="button"
                        onClick={() => handleSubtractDemand(i)}
                      >
                        -
                      </Button>
                    </Col>
                  </Row>
                ))
              }
            </Container>

            <Container className="my-4">

              <h4>Supply Points</h4>
              <Row className="mx-1" fluid>
                <Col xs><p>Quantity</p></Col>
                <Col xs className="d-flex">
                  <p className="float-left">Price</p>
                </Col>
              </Row>
              {
                SupplyFields.map((field, i) => (
                  <Row fluid className="my-1">
                    <Col xs>
                      <Form.Control
                        value={field.qd}
                        name="qd"
                        onChange={(e) => handleChangeInputSupply(i, e)}
                        type="number"
                        placeholder="Value"
                      />
                    </Col>

                    <Col xs>
                      <Form.Control
                        value={field.price}
                        name="price"
                        onChange={(e) => handleChangeInputSupply(i, e)}
                        type="number"
                        placeholder="Value"
                      />
                    </Col>
                    <Col xs>
                      <Button
                        className="mx-1"
                        type="button"
                        onClick={() => handleAddSupply(i)}
                      >
                        +
                      </Button>
                      <Button
                        disabled={field.id <= 2}
                        type="button"
                        onClick={() => handleSubtractSupply(i)}
                      >
                        -
                      </Button>
                    </Col>
                  </Row>
                ))
              }
            </Container>

          </Form.Group>
          <Form.Check // prettier-ignore
            type="checkbox"
            label="Price Floor"
            checked={changeGraph.showPriceFloor}
            onChange={() => {
              setChangeGraph((prev) => ({
                ...prev,
                showPriceFloor: !changeGraph.showPriceFloor,
              }));
            }}
          />
          {changeGraph.showPriceFloor && (
          <ReactSlider
            className="customSlider"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            markClassName="customSlider-mark"
            marks={20}
            min={regression.priceEquilibrium[1]}
            max={Math.min(
              Math.max.apply(Math, regression.demand.regression.price),
              Math.max.apply(Math, regression.supply.regression.price),
            )}
            defaultValue={changeGraph.priceFloor}
            onChange={(value) => {
              setChangeGraph((plots) => ({
                ...plots,
                priceFloor: value,
              }));
            }}
          />
          )}
          <br />
          <br />

          <Form.Check // price cieling
            type="checkbox"
            label="Price Ceiling"
            checked={changeGraph.showPriceCeiling}
            onChange={() => {
              setChangeGraph((prev) => ({
                ...prev,
                showPriceCeiling: !changeGraph.showPriceCeiling,
              }));
            }}
          />
          {changeGraph.showPriceCeiling && (
          <ReactSlider
            className="customSlider"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            markClassName="customSlider-mark"
            marks={100}
            defaultValue={changeGraph.priceCeiling}
            min={Math.max(
              Math.min.apply(Math, regression.demand.regression.price),
              Math.min.apply(Math, regression.supply.regression.price),
            )}
            max={regression.priceEquilibrium[1]}
            onChange={(value) => {
              setChangeGraph((plots) => ({
                ...plots,
                priceCeiling: value,
              }));
            }}
          />
          )}
          <br />
          <br />
          <Button type="submit">Graph</Button>
        </Container>
      </Form>

      <br />
      <br />

      <br />

    </Container>

  );
}
