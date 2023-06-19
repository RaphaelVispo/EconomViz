import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export function Matrix_Input() {

    const [demand_inputs, setDemand_inputs] = useState(1);
    const [DemandFields, setDemandFields] = useState([{
        id: 1,

    }])
    const [SupplyFields, setSupplyFields] = useState([{
        id: 1,

    }])



    // Demand Functions
    const handleChangeInputDemand = (i, e) => {
        console.log(e.target.value);
        const values = [...DemandFields]
        values[i][e.target.name] = e.target.value
        setDemandFields(values)
    }

    const handleAddDemand = (id) => {
        setDemandFields([...DemandFields, { id: id + 2, }])
    }

    const handleSubtractDemand = (i) => {
        const values = [...DemandFields]
        values.splice(i, 1)
        setDemandFields([...values])
    }

    // Supply functions
    const handleChangeInputSupply = (i, e) => {
        console.log(e.target.value);
        const values = [...SupplyFields]
        values[i][e.target.name] = e.target.value
        setSupplyFields(values)
    }

    const handleAddSupply = (id) => {
        setSupplyFields([...SupplyFields, { id: id + 2, }])
    }

    const handleSubtractSupply = (i) => {
        const values = [...SupplyFields]
        values.splice(i, 1)
        setSupplyFields([...values])
    }


    useEffect(
        () => { console.log(DemandFields);
        console.log(SupplyFields) },
        [DemandFields, SupplyFields]

    )

    return (
        <>

            <Form >
                <Container className='m-2'>
                    
                    <Form.Group controlId="formField">
                        <Container className='my-2'>
                            <h3>Demand Points</h3>
                            <Row className="m-1 d-flex align-items-center justify-content-center" fluid >
                                <Col sm={4}><h5>x</h5></Col>
                                <Col sm={5}><h5>y</h5></Col>
                            </Row>
                            {
                                DemandFields.map((field, i) => {
                                    return (
                                        <Row fluid >
                                            <Col md className="m-1">
                                                <Form.Control
                                                    value={field.x}
                                                    name='x'
                                                    onChange={e => handleChangeInputDemand(i, e)}
                                                    type="text" placeholder="Enter a value" />
                                            </Col>

                                            <Col md className="m-1">
                                                <Form.Control
                                                    value={field.y}
                                                    name='y'
                                                    onChange={e => handleChangeInputDemand(i, e)}
                                                    type="text" placeholder="Enter a value" />
                                            </Col>
                                            <Col md className="m-1">
                                                <Button className="mx-2"
                                                    type="button" onClick={() => handleAddDemand(i)}>
                                                    +
                                                </Button>
                                                <Button disabled={field.id === 1}
                                                    type="button" onClick={() => handleSubtractDemand(i)}>
                                                    -
                                                </Button>
                                            </Col>
                                        </Row>)
                                })
                            }
                        </Container>

                        <Container className='my-2'>


                            <h3>Supply Points</h3>
                            <Row className="m-1 d-flex align-items-center justify-content-center" fluid >
                                <Col sm={4}><h5>x</h5></Col>
                                <Col sm={5}><h5>y</h5></Col>
                            </Row>
                            {
                                SupplyFields.map((field, i) => {
                                    return (
                                        <Row fluid >
                                            <Col md className="m-1">
                                                <Form.Control
                                                    value={field.x}
                                                    name='x'
                                                    onChange={e => handleChangeInputSupply(i, e)}
                                                    type="text" placeholder="Enter a value" />
                                            </Col>

                                            <Col md className="m-1">
                                                <Form.Control
                                                    value={field.y}
                                                    name='y'
                                                    onChange={e => handleChangeInputSupply(i, e)}
                                                    type="text" placeholder="Enter a value" />
                                            </Col>
                                            <Col md className="m-1">
                                                <Button className="mx-2"
                                                    type="button" onClick={() => handleAddSupply(i)}>
                                                    +
                                                </Button>
                                                <Button disabled={field.id === 1}
                                                    type="button" onClick={() => handleSubtractSupply(i)}>
                                                    -
                                                </Button>
                                            </Col>
                                        </Row>)
                                })
                            }
                        </Container>


                    </Form.Group>
                    <Button type="button" variant="success">Graph</Button>
                </Container>
            </Form>

        </>
    )

}