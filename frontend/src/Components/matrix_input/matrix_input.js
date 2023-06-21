import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useEffect, createContext, useState, useContext } from 'react';
import { config } from '../../Context/intro_Context';
import { usePlots } from '../../App';


export function Matrix_Input() {

    const [DemandFields, setDemandFields] = useState([{
        id: 1,

    }])
    const [SupplyFields, setSupplyFields] = useState([{
        id: 1,

    }])
    const { plots, setUsePlots, original, setOriginal } = useContext(usePlots);




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

    // submit function
    const onSubmit = () => {    
        setOriginal(plot => ({
        
            demand: {
                original: {
                    qd: DemandFields.map(value => parseInt(value.qd)),
                    price: DemandFields.map(value => parseInt(value.price))
                }
            },
            supply: {
                ...plot.supply,
                original: {
                    qd: SupplyFields.map(value => parseInt(value.qd)),
                    price: SupplyFields.map(value => parseInt(value.price))
                }
            }
        }))
    }

    useEffect(() => {
        console.log("plots", plots);
    }, [plots]);


    return (
        <>

            <Form >
                <Container className='m-2'>

                    <Form.Group controlId="formField">
                        <Container className='my-2'>
                            <h3>Demand Points</h3>
                            <Row className="m-1 d-flex " fluid >
                                <Col className='align-items-center justify-content-center' sm={4}><h5>Quantity</h5></Col>
                                <Col className='d-flex  align-items-center justify-content-center' sm={4}><h5>Price</h5></Col>
                            </Row>
                            {
                                DemandFields.map((field, i) => {
                                    return (
                                        <Row fluid >
                                            <Col xm className="m-1">
                                                <Form.Control
                                                    value={field.x}
                                                    name='qd'
                                                    onChange={e => handleChangeInputDemand(i, e)}
                                                    type="text" placeholder="Enter a value" />
                                            </Col>

                                            <Col xm className="sm m-1">
                                                <Form.Control
                                                    value={field.y}
                                                    name='price'
                                                    onChange={e => handleChangeInputDemand(i, e)}
                                                    type="text" placeholder="Enter a value" />
                                            </Col>
                                            <Col xm className="m-1">
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
                            <Row className="m-1 d-flex " fluid >
                                <Col className='align-items-center justify-content-center' sm={4}><h5>Quantity</h5></Col>
                                <Col className='d-flex  align-items-center justify-content-center' sm={4}><h5>Price</h5></Col>
                            </Row>
                            {
                                SupplyFields.map((field, i) => {
                                    return (
                                        <Row fluid >
                                            <Col xs className="m-1">
                                                <Form.Control
                                                    value={field.x}
                                                    name='qd'
                                                    onChange={e => handleChangeInputSupply(i, e)}
                                                    type="text" placeholder="Enter a value" />
                                            </Col>

                                            <Col xs className="m-1">
                                                <Form.Control
                                                    value={field.y}
                                                    name='price'
                                                    onChange={e => handleChangeInputSupply(i, e)}
                                                    type="text" placeholder="Enter a value" />
                                            </Col>
                                            <Col xs className="m-1">
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
                    <Button type="button" variant="success" onClick={onSubmit}>Graph</Button>
                </Container>
            </Form>

        </>
    )

}

export const Anotherfunction = () => {
    const { plots, setUsePlots } = useContext(usePlots);

    return (
        <Container>
            <Button onClick={() => { setUsePlots(val => !val) }}>{`$plots`}</Button>
        </Container>
    )
}