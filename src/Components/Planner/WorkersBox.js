import React, { Component } from 'react'
import WorkerTicket from './WorkerTicket'


export default class WorkersBox extends Component {

    bringWorkerID3 = (workerID) => {

        this.props.bringWorkerID4(workerID)

    }

    render() {
        return (
            <div>

                {this.props.workerDB2.map((e,i)=>{
                    return (
                        <WorkerTicket
                        bringWorkerID2={this.bringWorkerID3}

                        key={i} 
                        workerDB3={this.props.workerDB2}

                        i1={i}
                        />
                    )
                })}

                
            </div>
        )
    }
}
