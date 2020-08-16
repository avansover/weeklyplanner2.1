import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

export default class AddWorker extends Component {

    constructor(props) {
        super(props)

        this.state = {

            firstName: '',
            lastName: '',
            identification: '',
            phone: '',
            secondPhone: '',
            address: '',
            email: '',

            class: '',
            lastTraining: '',

        }

    }

    render() {

        return (
            <div>
                AddWorker

                <Form>
                    <Form.Group>
                        <Form.Control type='text' placeholder='First name' onChange={(ev) => this.setState({ firstName: ev.target.value })} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type='text' placeholder='Last name' onChange={(ev) => this.setState({ lastName: ev.target.value })} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type='text' placeholder='ID' onChange={(ev) => this.setState({ identification: ev.target.value})} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type='text' placeholder='Phone' onChange={(ev) => this.setState({ phone: ev.target.value })} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type='text' placeholder='Second phone' onChange={(ev) => this.setState({ secondPhone: ev.target.value })} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type='text' placeholder='Address' onChange={(ev) => this.setState({ address: ev.target.value })} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" onChange={(ev) => this.setState({ identification: ev.target.value })} />
                    </Form.Group>

                </Form>

                <Button onClick={() => this.props.addWorker(
                    this.state.firstName,
                    this.state.lastName,
                    this.state.identification,
                    this.state.phone,
                    this.state.secondPhone,
                    this.state.address,
                    this.state.email,

                )}>add worker</Button>



            </div>
        )
    }
}
