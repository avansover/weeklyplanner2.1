import React, { Component } from 'react'


export default class WorkerTicket extends Component {

    drag = (ev) => {

        //console.log(this.props.workerDB3[this.props.i1])

        // --- getting the index from the workerDB ---

        ev.dataTransfer.setData("workerId", this.props.workerDB3[this.props.i1].id);
        ev.dataTransfer.setData("srcClass", ev.target.className);

        //console.log(ev.target.className);

        ev.dataTransfer.setData("ticketWorkerId", this.props.workerDB3[this.props.i1].id);
        ev.dataTransfer.setData("ticketClass", ev.target.className);



    }

    draging = (ev) => {

        //   console.log(ev.pageX);
        //   console.log(ev.target);

        // via createElement

        // var markerDiv = document.getElementById('markerDiv')

        // if (markerDiv !== null) {

        //     markerDiv.remove()

        // }

    }

    bringWorkerID1 = () => {

        //console.log(this.props.workerDB3[this.props.i1].id);

        this.props.bringWorkerID2(this.props.workerDB3[this.props.i1].id)

    }
    
    

    
    render() {
        return (
            <div id={`ticket${this.props.i1}`}
                className='ticketDiv'
                style={{ borderColor: `${this.props.workerDB3[this.props.i1].color}` }}
                draggable='true'
                onDragStart={this.drag}
                onDrag={this.draging}
                onMouseDown={this.bringWorkerID1}
                
                
            >

                {this.props.workerDB3[this.props.i1].firstName} {this.props.workerDB3[this.props.i1].lastName}

            </div>
        )
    }
}
