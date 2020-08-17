import React, { Component } from 'react';
import { Dropdown, Button } from 'react-bootstrap'
import AddWorker from './AddWorker';
import PersonalStat from './PersonalStat';
import TestColor from '../Planner/TestColor';

export default class Presonal extends Component {

    constructor(props) {
        super(props)

        this.state = {

            addWorkerWindow: false,

            colorPalette1: [
                '#cc3333', '#33cc33', '#3333cc', '#cccc33', '#cc33cc', '#33cccc',
                '#ff6666', '#66ff66', '#6666ff', '#ffff66', '#ff66ff', '#66ffff',
                '#ff99cc', '#ccff99', '#99ccff', '#cc99ff', '#99ffcc', '#ffcc99',
                '#cc6600', '#00cc66', '#6600cc', '#0066cc', '#66cc00', '#cc0066',
                '#ffcc00', '#00ffcc', '#cc00ff', '#00ccff', '#ccff00', '#ff00cc',
            ]
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

    setColor = () => {

        let temp1 = [...this.state.colorPalette1]
      

        for (let i = 0; i < temp1.length; i++) {

            let rr = (255 - (i * 51)).toString(16)

            if (rr.length === 1) {

                rr = `0${rr}`

            }

            let gg = (i * 51).toString(16)

            if (gg.length === 1) {

                gg = `0${gg}`

            }

            let bb = (i * 51).toString(16)

            if (bb.length === 1) {

                bb = `0${bb}`

            }

            temp1[i] = `#${rr}${gg}${bb}`

        }

       


      

        this.setState({ colorPalette1: temp1})

    }

    render() {

        return (
            <div style={{ display: 'flex', position: "relative" }}>


                <div>

                    <div style={{ marginBottom: '0.125rem' }}>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Select Worker
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {this.props.workerDB.map((o, i) => { return (<Dropdown.Item href={`#/worker${o.id}`} key={i}>{o.id}</Dropdown.Item>) })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div>
                        <Button variant="primary" onClick={() => this.setState({ addWorkerWindow: !this.state.addWorkerWindow })}>{this.buttonText()}</Button>
                    </div>

                    <button onClick={() => this.setColor()}>set color</button>

                </div>

                <div>{this.addWorkerView()}</div>

                <div>

                    {this.state.colorPalette1.map((o, i) => {
                        return (<TestColor
                            key={i}
                            color={o}
                        />)
                    })}

                </div>

            




            </div>

        )
    }
}
