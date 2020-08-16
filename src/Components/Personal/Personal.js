import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap'
import AddWorker from './AddWorker';
import PersonalStat from './PersonalStat';

export default class Presonal extends Component {

    constructor(props) {
        super(props)

        this.state = {

            addWorkerWindow: false,

        }

    }

    addWorkerView = () => {

        if (this.state.addWorkerWindow) {

            return <AddWorker
            addWorker={this.props.addWorker}
            />

        } else {

            return <PersonalStat />

        }

    }

    buttonText = () => {

        if (this.state.addWorkerWindow) {

            return 'Personal Stat'

        } else {

            return 'Add worker'

        }

    }

    render() {

        return (
            <div style={{ display: 'flex', position: "relative" }}>


                <div>

                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Dropdown Button
                            </Dropdown.Toggle>

                        <Dropdown.Menu>

                            {this.props.workerDB.map((o, i) => { return (<Dropdown.Item href={`#/worker${o.id}`} key={i}>{o.id}</Dropdown.Item>) })}

                        </Dropdown.Menu>
                    </Dropdown>

                    <button onClick={() => this.setState({ addWorkerWindow: !this.state.addWorkerWindow })}>{this.buttonText()}</button>

                </div>


                <div>{this.addWorkerView()}</div>

            </div>

        )
    }
}
