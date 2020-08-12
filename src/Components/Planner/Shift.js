import React, { Component } from 'react'
//import { Context } from '../../Context/Context';


export default class Shift extends Component {

    constructor(props) {
        super(props)

        this.state = {


            //for resize
            shift: undefined,
            resizer: undefined,
            dropAreaLeft: undefined,
            ShiftOldWidth: undefined,
            shiftOldLeft: undefined,

            //for handlening the name and data inside the shifts
            shiftLength: undefined,
            shiftDataVIew: undefined,

            //for final resize
            shiftLeftFinal: undefined,
            shiftLengthFinal: undefined,

            //for resizing run over
            shiftId: undefined

        }
    }

    //static contextType = Context


    shiftColor = () => {

        var workerId = this.props.shiftData.workerId

        var workerFromWrokerDB = this.props.workerDB.filter((o) => (o.id === workerId))

        return workerFromWrokerDB[0].color

    }

    workerName = () => {

        let workerId = this.props.shiftData.workerId

        let workerFromWrokerDB = this.props.workerDB.filter((o) => (o.id === workerId))

        let shiftLength = this.props.shiftData.shiftLength;

        if (this.state.shiftLength === undefined) {

            if (shiftLength >= 160) {

                return (<div> {workerFromWrokerDB[0].firstName} {workerFromWrokerDB[0].lastName} </div>)

            } else if (shiftLength < 160 && shiftLength > 100) {

                //this won't work till the resizing effect the DB

                return (<div> {workerFromWrokerDB[0].firstName}. {workerFromWrokerDB[0].lastName.charAt(0)} </div>)

            } else if (shiftLength <= 100) {

                return (<div> {workerFromWrokerDB[0].firstName.charAt(0)}. {workerFromWrokerDB[0].lastName.charAt(0)} </div>)

            }


        } else if (this.state.shiftLength >= 160) {

            return (<div> {workerFromWrokerDB[0].firstName} {workerFromWrokerDB[0].lastName} </div>)

        } else if (this.state.shiftLength < 160 && this.state.shiftLength > 100) {

            return (<div> {workerFromWrokerDB[0].firstName}. {workerFromWrokerDB[0].lastName.charAt(0)} </div>)

        } else if (this.state.shiftLength <= 100) {

            return (<div> {workerFromWrokerDB[0].firstName.charAt(0)}. {workerFromWrokerDB[0].lastName.charAt(0)} </div>)

        }



    }

    drag = (ev) => {

        //console.log(ev.target);

        ev.dataTransfer.setData("srcDay", this.props.dayInd);
        ev.dataTransfer.setData("srcPost", this.props.postInd);
        ev.dataTransfer.setData("srcPart", this.props.partInd);
        ev.dataTransfer.setData("srcWorkerId", this.props.shiftData.workerId);
        ev.dataTransfer.setData("srcId", ev.target.id);
        ev.dataTransfer.setData("srcClass", ev.target.className);

    }

    rightClick = () => {

        this.props.rightClick()

    }

    resizeShift = (ev) => {

        ev.preventDefault()

        let resizer = ev.target
        console.log(resizer.className);

        let shift = ev.target.parentNode.parentNode
        let shiftId = ev.target.parentNode.parentNode.id

        // lol... should thing of getElement instead
        let dropArea = ev.target.parentNode.parentNode.parentNode.parentNode
        console.log(dropArea);

        window.addEventListener('mousemove', this.resize)
        window.addEventListener('mouseup', this.stopResize)

        let dropAreaLeft = dropArea.offsetLeft
        let ShiftOldWidth = shift.getBoundingClientRect().width
        let shiftOldLeft = shift.getBoundingClientRect().left - dropAreaLeft - 0.625


        console.log('dropAreaLeft ' + dropAreaLeft);
        console.log('ShiftOldWidth ' + ShiftOldWidth);
        console.log('shiftOldLeft ' + shiftOldLeft);



        //this.resize(ev)

        this.setState({ shiftId, shift, resizer: resizer.className, dropAreaLeft, ShiftOldWidth, shiftOldLeft })


        // let element = this.parentNode
        // console.log(element);

    }


    resize = (eve) => {

        let shift = this.state.shift;
        let resizer = this.state.resizer
        let dropAreaLeft = this.state.dropAreaLeft;
        let ShiftOldWidth = this.state.ShiftOldWidth;
        let shiftOldLeft = this.state.shiftOldLeft;

        let shortestShift = 10

        let shiftDB = [...this.props.shiftSet]
        let dayInd = this.props.dayInd
        let postInd = this.props.postInd
        let partInd = this.props.partInd

        let partObj = this.props.partObj


        // let shiftId = this.state.shiftId

        // console.log(shiftDB[dayInd].posts[postInd].shifts);




        //console.log(shiftIdArr);



        if (resizer === 'leftResizer') {

            let shiftsObj = shiftDB[dayInd].posts[postInd].parts[partInd].shifts

            let shiftIdArr = []

            //check working with 3rd map propety
            for (let shiftInd = 0; shiftInd < shiftsObj.length; shiftInd++) {

                if (shiftOldLeft > shiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftStart) {

                    shiftIdArr.push(shiftsObj[shiftInd])

                }

            }

            //console.log(shiftIdArr);



            // pointer after the start of the part but before the end of its own shift - the shortest shift

            if (eve.pageX - dropAreaLeft > partObj.partStart && eve.pageX - dropAreaLeft <= shiftOldLeft + ShiftOldWidth - shortestShift) {

                // console.log(partObj.partStart);
                // console.log(eve.pageX - dropAreaLeft);
                // console.log(shiftOldLeft + ShiftOldWidth - shortestShift)

                // I need correct a bug when shift end some times at 1 pixel more or less then needed
                //the consol reveal that the propblem is with the shiftOldLeft

                // for the shift div itself
                shift.style.left = (Math.floor((eve.pageX - dropAreaLeft - partObj.partStart + 1) / 5)) * 5 + 'px'
                shift.style.width = ShiftOldWidth + shiftOldLeft - (Math.floor((eve.pageX - dropAreaLeft + 1) / 5)) * 5 + 'px'

                // for the resizing function
                let shiftLeftFinal = (Math.floor((eve.pageX - dropAreaLeft - partObj.partStart + 1) / 5)) * 5
                let shiftLengthFinal = ShiftOldWidth + shiftOldLeft - (Math.floor((eve.pageX - dropAreaLeft + 1) / 5)) * 5

                this.setState({ shiftLength: shiftLengthFinal })

                this.setState({ shiftLeftFinal: shiftLeftFinal })
                this.setState({ shiftLengthFinal: shiftLengthFinal })


                if (shiftLengthFinal < 60) {

                    this.setState({ shiftDataVIew: 'none' })

                } else if (shiftLengthFinal >= 60) {

                    this.setState({ shiftDataVIew: 'flex' })

                }

                // pushing the right end of shifts while resizing shift run over them

                // for (let i = 0; i < shiftIdArr.length; i++) {

                //     let shiftEnd = shiftIdArr[i].shiftStart + shiftIdArr[i].shiftLength
                //     let otherShift = document.getElementById(`${shiftIdArr[i].shiftId}`)

                //     //console.log(shiftEnd);
                //     //console.log(otherShift);

                //     if (shiftLeftFinal < shiftEnd) {

                //         otherShift.style.width = shiftLeftFinal - shiftIdArr[i].shiftStart + 'px'

                //         // I'm not sure what is going to be inside the shift, till then I'll just remove it content

                //         if (shiftLeftFinal - shiftIdArr[i].shiftStart < 100 && shiftIdArr[i].shiftStart < shiftLeftFinal) {

                //             // console.log(shiftIdArr[i].shiftStart);
                //             // console.log(shiftLeftFinal);

                //             const shiftElement = document.getElementById(`${shiftIdArr[i].shiftId}`);

                //             while (shiftElement.lastElementChild) {

                //                 shiftElement.removeChild(shiftElement.lastElementChild);

                //             }

                //         }


                //     } else {

                //         otherShift.style.width = shiftIdArr[i].shiftLength + 'px'

                //     }



                // }

            } else if (eve.pageX - dropAreaLeft <= partObj.partStart) {

                // console.log(partObj.partStart);
                // console.log(eve.pageX - dropAreaLeft);

                shift.style.left = 0 + 'px'
                shift.style.width = ShiftOldWidth + shiftOldLeft - partObj.partStart + 'px'

                this.setState({ shiftLength: ShiftOldWidth + shiftOldLeft - partObj.partStart })

                this.setState({ shiftLeftFinal: 0 })
                this.setState({ shiftLengthFinal: ShiftOldWidth + shiftOldLeft - partObj.partStart })

            } else if (eve.pageX - dropAreaLeft > shiftOldLeft + ShiftOldWidth - shortestShift) {

                // console.log(eve.pageX - dropAreaLeft);
                // console.log(shiftOldLeft + ShiftOldWidth - shortestShift);


                shift.style.left = shiftOldLeft + ShiftOldWidth - shortestShift - partObj.partStart + 'px'
                shift.style.width = shortestShift + 'px'

                //   this.setState({ shiftLength: shortestShift })

                this.setState({ shiftLeftFinal: shiftOldLeft + ShiftOldWidth - shortestShift - partObj.partStart })
                this.setState({ shiftLengthFinal: shortestShift })

                //  for handling realy realy realt fast mouse movment
                this.setState({ shiftDataVIew: 'none' })


            }

        } else if (resizer === 'rightResizer') {



            let shiftsObj = shiftDB[dayInd].posts[postInd].parts[partInd].shifts

            let shiftIdArr = []

            for (let shiftInd = 0; shiftInd < shiftsObj.length; shiftInd++) {

                if (shiftOldLeft < shiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftStart) {

                    shiftIdArr.push(shiftsObj[shiftInd])

                }

            }

            if (eve.pageX - dropAreaLeft < partObj.partStart + partObj.partLength && eve.pageX - dropAreaLeft >= shiftOldLeft + shortestShift) {

                // console.log(shiftOldLeft + shortestShift);
                // console.log(eve.pageX - dropAreaLeft);
                // console.log(partObj.partStart + partObj.partLength)

                // for the shift div itself
                shift.style.width = (Math.floor((eve.pageX - dropAreaLeft - shiftOldLeft + 1) / 5)) * 5 + 'px'

                // a variable the resizing function need to put in the timed state
                let shiftLengthFinal = (Math.floor((eve.pageX - dropAreaLeft - shiftOldLeft + 1) / 5)) * 5

                // this.setState({ shiftLength: shiftLengthFinal })

                // this.setState({ shiftLengthFinal: shiftLengthFinal })

                if (shiftLengthFinal < 60) {

                    this.setState({ shiftDataVIew: 'none' })

                } else if (shiftLengthFinal >= 60) {

                    this.setState({ shiftDataVIew: 'flex' })

                }

                // console.log(shiftIdArr);

                // for (let i = 0; i < shiftIdArr.length; i++) {

                //     let shiftStart = shiftIdArr[i].shiftStart
                //     let otherShift = document.getElementById(`${shiftIdArr[i].shiftId}`)

                //     if (eve.pageX - dropAreaLeft > shiftStart && eve.pageX - dropAreaLeft < shiftIdArr[i].shiftStart + shiftIdArr[i].shiftLength) {

                //         otherShift.style.left = shiftOldLeft + shiftLengthFinal + 'px'
                //         otherShift.style.width = shiftIdArr[i].shiftStart + shiftIdArr[i].shiftLength - shiftOldLeft - shiftLengthFinal + 'px'

                //         // I'm not sure what is going to be inside the shift, till then I'll just remove it content

                //         // need to take care of rapid mouse movment

                //         if (shiftIdArr[i].shiftStart + shiftIdArr[i].shiftLength - shiftOldLeft - shiftLengthFinal < 100) {

                //             const shiftElement = document.getElementById(`${shiftIdArr[i].shiftId}`);

                //             while (shiftElement.lastElementChild) {

                //                 shiftElement.removeChild(shiftElement.lastElementChild);

                //             }

                //         } else {

                //             otherShift.style.left = shiftOldLeft + shiftLengthFinal + 'px'
                //             otherShift.style.width = shiftIdArr[i].shiftStart + shiftIdArr[i].shiftLength - shiftOldLeft - shiftLengthFinal + 'px'

                //         }

                //         // I had some problem when resizing the right edge too fast, so I needed to bolster it conditions

                //     } else if (eve.pageX - dropAreaLeft >= shiftIdArr[i].shiftStart + shiftIdArr[i].shiftLength) {

                //         // console.log(shiftIdArr[i]);

                //         otherShift.style.width = 0 + 'px'

                //     } else {

                //         // console.log(shiftIdArr[i]);

                //         otherShift.style.left = shiftIdArr[i].shiftStart + 'px'
                //         otherShift.style.width = shiftIdArr[i].shiftLength + 'px'

                //     }



                // }


            } else if (eve.pageX - dropAreaLeft >= partObj.partStart + partObj.partLength) {

                // console.log(partObj.partStart + partObj.partLength)
                // console.log(eve.pageX - dropAreaLeft);

                // we need to get all the side shifts in here and zero them

                // shift.style.width = 720 - shiftOldLeft + 'px'

                // this.setState({ shiftLength: 720 - shiftOldLeft })

                // this.setState({ shiftLengthFinal: 720 - shiftOldLeft })

                // for (let i = 0; i < shiftIdArr.length; i++) {

                //     let shiftStart = shiftIdArr[i].shiftStart
                //     let otherShift = document.getElementById(`${shiftIdArr[i].shiftId}`)

                //     otherShift.style.left = shiftStart + 'px' // my own paranoia

                //     otherShift.style.width = 0 + 'px'

                //     // I'm not sure what is going to be inside the shift, till then I'll just remove it content


                // }

            } else if (eve.pageX - dropAreaLeft < shortestShift + shiftOldLeft) {

                // should research how to hundel when mouse move realy fast to the left side


                console.log(eve.pageX - dropAreaLeft);
                console.log(shiftOldLeft + shortestShift);

                //     console.log(eve.pageX - dropAreaLeft);

                //     shift.style.width = shortestShift + 'px'

                //     this.setState({ shortestShift })

                //     this.setState({ shiftLengthFinal: shortestShift })

                //     // for handling realy realy realt fast mouse movment
                //     this.setState({ shiftDataVIew: 'none' })

            }

        }

    }

    dataDivView = () => {

        //console.log(this.props.shiftData.shiftLength);

        if (this.state.shiftDataVIew !== undefined) {

            return this.state.shiftDataVIew

        } else {

            if (this.props.shiftData.shiftLength >= 60) {

                return 'flex'

            } else if (this.props.shiftData.shiftLength < 60) {

                return 'none'

            }

        }


    }

    stopResize = () => {

        window.removeEventListener('mousemove', this.resize)
        window.removeEventListener('mouseup', this.stopResize)

        //const { setResizeData } = this.context

        this.props.setResizeData(

            this.state.resizer,
            this.state.shiftOldLeft,
            this.state.ShiftOldWidth,
            this.state.shiftLeftFinal,
            this.state.shiftLengthFinal,
            this.props.shiftData.workerId,
            this.props.dayInd,
            this.props.postInd,
            this.props.partInd

        )

    }

    showShiftStart = () => {

        if (this.state.shiftLeftFinal === undefined) {

            return this.props.shiftData.shiftStart

        } else {

            return this.state.shiftLeftFinal

        }

    }

    showShiftEnd = () => {

        if (this.state.shiftLeftFinal === undefined && this.state.shiftLengthFinal === undefined) {

            return this.props.shiftData.shiftStart + this.props.shiftData.shiftLength

        } else if (this.state.shiftLeftFinal === undefined && this.state.shiftLengthFinal !== undefined) {

            return this.props.shiftData.shiftStart + this.state.shiftLengthFinal

        } else if (this.state.shiftLeftFinal !== undefined && this.state.shiftLengthFinal !== undefined) {

            return this.state.shiftLeftFinal + this.state.shiftLengthFinal

        }



    }


    render() {

        return (

            <div
                className='shiftDiv'
                id={`d${this.props.dayInd}p${this.props.postInd}t${this.props.partInd}s${this.props.shiftData.shiftStart}w${this.props.shiftData.workerId}`}
                draggable='true'
                onDragStart={this.drag}
                //onDrag={this.draging}
                //onMouseDown={this.bring}
                //onAuxClick={this.rightClick}
                style={{
                    position: "absolute",
                    width: `${this.props.shiftData.shiftLength}px`,
                    left: `${this.props.shiftData.shiftStart}px`,
                    top: '-1px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: `${this.shiftColor()}`,
                    height: '23px',
                    borderRadius: '3px',
                    zIndex: 1,
                }}
            >

                <div style={{ display: 'flex', pointerEvents: 'none' }}>

                    <div style={{ backgroundColor: '#888888', width: '2px', height: '100%', cursor: 'ew-resize', pointerEvents: 'initial' }}
                        className='leftResizer'
                        onMouseDown={this.resizeShift}
                    ></div>

                    <div
                        className='shiftDataDiv'
                        style={{ display: `${this.dataDivView()}`, zIndex: 0, fontSize: '8px', pointerEvents: 'none', backgroundColor: '#aaaaaa' }}
                    >
                        {this.showShiftStart()}
                    </div>

                </div>

                <div

                    style={{
                        display: `${this.dataDivView()}`,
                        pointerEvents: 'none',
                        position: "relative",
                        zIndex: 0,
                        fontSize: '12px'

                    }}
                >
                    {this.workerName()}
                </div>

                <div style={{ display: 'flex', pointerEvents: 'none' }}>

                    <div
                        className='shiftDataDiv'
                        style={{ display: `${this.dataDivView()}`, zIndex: 0, fontSize: '8px', pointerEvents: 'none', backgroundColor: '#aaaaaa' }}
                    >
                        {this.showShiftEnd()}
                    </div>

                    <div style={{ backgroundColor: '#888888', width: '2px', height: '100%', cursor: 'ew-resize', pointerEvents: 'initial' }}
                        className='rightResizer'
                        onMouseDown={this.resizeShift}

                    ></div>

                </div>

            </div>

        )
    }
}
