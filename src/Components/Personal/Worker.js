import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'

export default class Worker extends Component {
    render() {
        return (
            <div style={{ display: 'flex', position: "relative" }}>


                <div>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                            </Dropdown.Toggle>

                        <Dropdown.Menu>

                            {this.props.workerDB.map((o, i) => { return (<Dropdown.Item href={`#/worker${o.id}`} key={i}>{o.id}</Dropdown.Item>) })}

                        </Dropdown.Menu>
                    </Dropdown>

                </div>

                <div>

                    Worker id is {this.props.workerID}

                </div>


            </div>
        )
    }
}
