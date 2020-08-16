import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

export default class PlannerStats extends Component {

    constructor(props) {
        super(props)

        this.state = {
            DASView: 'none'
        }
    }

    deleteAllShift = () => {

        this.props.deleteAllShift()
        this.setState({ DASView: 'none' })

    }

    render() {
        return (
            <div>

                PlannerStats
                <Button variant="warning" onClick={() => this.setState({ DASView: 'flex' })}>Delete all shifts</Button>

                <div id='DASDiv' style={{ display: `${this.state.DASView}`, position: "fixed", top: '26%', left: '35%', zIndex: '10' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>Delete all shifts?!</div>

                    <div>
                        <div className='mainMenuBtDiv'>
                            <Button variant="success" onClick={() => this.setState({ DASView: 'none' })}>Lets drink coffee and think about it</Button>
                        </div>

                        <div className='mainMenuBtDiv'>
                            <Button variant="danger" onClick={() => this.deleteAllShift()}>I know what I'm doing</Button>
                        </div>

                    </div>


                </div>




            </div>
        )
    }
}
