import React, { Component } from 'react';
import PostPart from './PostPart';
import ContextProvider from '../../Context/Context'

export default class Post extends Component {

    constructor(props) {
        super(props)

        this.state = {

            axisX: undefined,

            shiftStartForDrop: undefined,
            shiftLengthForDrop: undefined,

            tempA: undefined

        }
    }

   

    allowDrop = (ev) => {

        // *** learn conextAPI

        ev.preventDefault();

        //console.log(ev.target);
        //console.log(ev.pageX);

        // via createElement

        // var markerDivExist = document.getElementById('markerDiv')

        // if (markerDivExist === null) {

        //     var markerDiv = document.createElement('div')
        //     markerDiv.id = 'markerDiv'
        //     markerDiv.style.height = '10px'
        //     markerDiv.style.width = '10px'
        //     markerDiv.style.border = '1px solid red'
        //     markerDiv.style.position = 'relative'
        //     markerDiv.style.left = `${ev.pageX-200}px`
        //     markerDiv.style.zIndex = '-1'

        //     //console.log(markerDiv);

        //     document.getElementById(`dropDay${this.props.dayInd}Post${this.props.dayInd}`).appendChild(markerDiv)

        // }

        // console.log(this.props.dayInd);


        if (this.state.axisX !== ev.pageX) {

            this.setState({ axisX: ev.pageX })

            // console.log(this.state.axisX);

            // via createElement

            // var markerDiv = document.getElementById('markerDiv')

            // if (markerDiv !== null) {

            //     markerDiv.remove()

            // }

        }

        if (ev.target.className !== 'shiftDiv' && ev.target.className !== 'shiftDataDiv') {

            let localDayInd = this.props.dayInd
            let localPostInd = this.props.dayInd

            //this.props.placeMarker2(localDayInd, localPostInd)

            const { setMarkerInd } = this.context

            setMarkerInd(localDayInd, localPostInd)

        }

    }

    

    rightClick = () => {

        console.log('rightClick');

    }

    deleteMarker1 = () => {

        // *** at app, set markerPlaceDay and markerPlacePost to undefined,


        var markerDiv = document.getElementById('markerDiv')

        if (markerDiv !== null) {

            markerDiv.remove()

        }

        //console.log('leave');

        this.props.deleteMarker2()


    }

    addShiftToDB1 = (workerInd2, dayInd, postInd, axisX2) => {

        //console.log('adding shift');

        this.props.addShiftToDB2(workerInd2, dayInd, postInd, axisX2)

    }

    render() {

       
        return (
            <div>

                <div className='postBodyDiv'>

                    <div>{this.props.shiftSet[this.props.dayInd].posts[this.props.postInd].name}</div>

                    <div className='partsBodyDiv'
                        style={{ display: 'flex', position: "relative", left: '10px' }}
                        id={`dropDay${this.props.dayInd}Post${this.props.dayInd}`}

                    >

                        {this.props.shiftSet[this.props.dayInd].posts[this.props.postInd].parts.map((o, i) => {
                            return (
                                <ContextProvider key={i}>
                                    <PostPart
                                        key={i}
                                        deleteMarker={this.props.deleteMarker}
                                        setResizeData={this.props.setResizeData}

                                        shiftSet={this.props.shiftSet}
                                        workerDB={this.props.workerDB}
                                        dayStart={this.props.dayStart}

                                        dayInd={this.props.dayInd}
                                        postInd={this.props.postInd}
                                        partInd={i}
                                        partObj={o}
                                    />
                                </ContextProvider>
                            )
                        })}

                    </div>

                </div>




            </div>
        )
    }
}
