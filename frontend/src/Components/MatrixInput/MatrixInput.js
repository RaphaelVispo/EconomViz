import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import React, {
  useState, useContext,
} from 'react';
import { usePlots } from '../../App';

export function MatrixInput() {
  const [DemandFields, setDemandFields] = useState([{
    id: 1,

  }]);
  const [SupplyFields, setSupplyFields] = useState([{
    id: 1,

  }]);
  const {
    setOriginal,
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

  return (
    <Form>
      <Container className="px-2">

        <Form.Group controlId="formField">
          <Container className="my-4">
            <h4>Demand Points</h4>
            <Row className="px-2" fluid>
              <Col xm={6} md={4}><p>Quantity</p></Col>
              <Col xm={12} md={8}><p>Price</p></Col>
            </Row>
            {
                            DemandFields.map((field, i) => (
                              <Row fluid>
                                <Col xm className="m-1">
                                  <Form.Control
                                    value={field.x}
                                    name="qd"
                                    onChange={(e) => handleChangeInputDemand(i, e)}
                                    type="text"
                                    placeholder="Enter a value"
                                  />
                                </Col>

                                <Col xm className="m-1">
                                  <Form.Control
                                    value={field.y}
                                    name="price"
                                    onChange={(e) => handleChangeInputDemand(i, e)}
                                    type="text"
                                    placeholder="Enter a value"
                                  />
                                </Col>
                                <Col xm className="m-1">
                                  <Button
                                    className="mx-1"
                                    type="button"
                                    onClick={() => handleAddDemand(i)}
                                  >
                                    +
                                  </Button>
                                  <Button
                                    disabled={field.id === 1}
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
            <Row className="px-2" fluid>
              <Col xm={6} md={4}><p>Quantity</p></Col>
              <Col xm={12} md={8}><p>Price</p></Col>
            </Row>
            {
                            SupplyFields.map((field, i) => (
                              <Row fluid>
                                <Col xs className="m-1">
                                  <Form.Control
                                    value={field.x}
                                    name="qd"
                                    onChange={(e) => handleChangeInputSupply(i, e)}
                                    type="text"
                                    placeholder="Enter a value"
                                  />
                                </Col>

                                <Col xs className="m-1">
                                  <Form.Control
                                    value={field.y}
                                    name="price"
                                    onChange={(e) => handleChangeInputSupply(i, e)}
                                    type="text"
                                    placeholder="Enter a value"
                                  />
                                </Col>
                                <Col xs className="m-1">
                                  <Button
                                    className="mx-1"
                                    type="button"
                                    onClick={() => handleAddSupply(i)}
                                  >
                                    +
                                  </Button>
                                  <Button
                                    disabled={field.id === 1}
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
        <Button type="button" variant="success" onClick={onSubmit}>Graph</Button>
      </Container>
    </Form>
  );
}
