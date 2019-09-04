import React from "react";
import {useFetch} from "../Hooks";
import {Col, Container, Row} from "react-materialize";
import moment from 'moment'
import {Error, Loading} from "../Loading";
import Textfit from 'react-textfit'

import './Earthquake.css'

type Earthquake = Readonly<{
    place: string
    time: Date
    magnitude: number
}>

export default function Earthquakes({count}) {
    let earthquakes: Earthquake[] | any = useFetch('http://localhost:8000/earthquakes', '15m')

    if (!earthquakes) {
        return (<Loading/>)
    } else if (earthquakes.err) {
        return (<Error name="earthquakes" msg={earthquakes.err}/>)
    }

    earthquakes = earthquakes.slice(0, count);

    return (
        <Container className="earthquakes">
            <h6 className="center">Earthquakes</h6>
            <br />
            {
                earthquakes.map((r, i) => (<Earthquake key={i} earthquake={r}/>))
            }
        </Container>
    )
}

function Earthquake({earthquake}: { earthquake: Earthquake }) {
    return (
        <Row className="earthquake">
            <Col s={2}>{earthquake.magnitude}</Col>
            <Col s={4}>{moment(earthquake.time).format("ddd, ha")}</Col>
            <Col s={12-6}>
                <Textfit>{earthquake.place}</Textfit>
            </Col>
        </Row>
    )
}
