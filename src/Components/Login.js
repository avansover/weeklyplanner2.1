import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

export default class Login extends Component {
    render() {
        return (
            <div>

                <div style={{width: '300px'}}>
                    <Form>
                        <Form.Group>
                            <Form.Control type='text' placeholder='User name' />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type='text' placeholder='Password' />
                        </Form.Group>
                    </Form>
                </div>

                {/* will have to change it once I implament the password feature */}

                <div>
                    <Link to='/planner'>
                        <Button variant="primary" onClick={() => this.props.login()}>enter</Button>
                    </Link>
                </div>

            </div>
        )
    }
}
