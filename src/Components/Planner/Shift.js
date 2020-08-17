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
            shiftLength: undefined, // need to see if I can use shiftLengthFinal for this job
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

        let elementId = `d${this.props.dayInd}p${this.props.postInd}t${this.props.partInd}s${this.props.shiftData.shiftStart + this.props.partObj.partStart}w${this.props.shiftData.workerId}`

        var workerId = this.props.shiftData.workerId

        // that "if" has nothing to do with coloring, it just a test to see that IDs are being kept as they should

        if (elementId === this.props.shiftData.shiftId) {

            var workerFromWrokerDB = this.props.workerDB.filter((o) => (o.id === workerId))

            return workerFromWrokerDB[0].color

        }

    }

    workerName = () => {

        let workerId = this.props.shiftData.workerId

        let workerFromWrokerDB = this.props.workerDB.filter((o) => (o.id === workerId))

        let shiftLength = this.props.shiftData.shiftLength;

        if (this.state.shiftLength === undefined) {

            if (shiftLength >= 160) {

                return (<div> {workerFromWrokerDB[0].firstName} {workerFromWrokerDB[0].lastName} </div>)

            } else if (shiftLength < 160 && shiftLength > 120) {

                //this won't work till the resizing effect the DB

                return (<div> {workerFromWrokerDB[0].firstName}. {workerFromWrokerDB[0].lastName.charAt(0)} </div>)

            } else if (shiftLength <= 120) {

                return (<div> {workerFromWrokerDB[0].firstName.charAt(0)}. {workerFromWrokerDB[0].lastName.charAt(0)} </div>)

            }


        } else if (this.state.shiftLength >= 160) {

            return (<div> {workerFromWrokerDB[0].firstName} {workerFromWrokerDB[0].lastName} </div>)

        } else if (this.state.shiftLength < 160 && this.state.shiftLength > 120) {

            return (<div> {workerFromWrokerDB[0].firstName}. {workerFromWrokerDB[0].lastName.charAt(0)} </div>)

        } else if (this.state.shiftLength <= 120) {

            return (<div> {workerFromWrokerDB[0].firstName.charAt(0)}. {workerFromWrokerDB[0].lastName.charAt(0)} </div>)

        }



    }

    drag = (ev) => {

        //console.log(ev.target);



        ev.dataTransfer.setData("srcDay", this.props.dayInd);
        ev.dataTransfer.setData("srcPost", this.props.postInd);
        ev.dataTransfer.setData("srcPart", this.props.partInd);
        ev.dataTransfer.setData("srcPartStart", this.props.partObj.partStart);
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
        let ShiftOldWidth = Math.round(shift.getBoundingClientRect().width)

        // the problem with offsetLeft is that on the last version it gave me the value expected less 1,
        // getBoundingClientRect seems to be more aqurate, but it can't handle drops outside rounded corner.
       
        // let shiftOldLeft = Math.round(shift.getBoundingClientRect().left - dropAreaLeft - 0.625)
        let shiftOldLeft = shift.offsetLeft + this.props.partObj.partStart

       
        //console.log(Math.round(shift.getBoundingClientRect().left));
        //console.log(shift.offsetLeft + this.props.partObj.partStart);

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

        let shortestShift = 5

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

                let everyShiftStart = shiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftStart
                let partStart = shiftDB[dayInd].posts[postInd].parts[partInd].partStart

                //console.log(shiftOldLeft);
                //console.log(everyShiftStart + partStart);

                if (shiftOldLeft > everyShiftStart + partStart) {

                    shiftIdArr.push(shiftsObj[shiftInd])

                }

            }

            // console.log(shiftIdArr);

            // pointer after the start of the part but before the end of its own shift - the shortest shift

            if (eve.pageX - dropAreaLeft > partObj.partStart && eve.pageX - dropAreaLeft <= shiftOldLeft + ShiftOldWidth - shortestShift) {

                // console.log(partObj.partStart);
                // console.log(eve.pageX - dropAreaLeft);
                // console.log(shiftOldLeft + ShiftOldWidth - shortestShift)

                // I need correct a bug when shift end some times at 1 pixel more or less then needed
                // the consol reveal that the propblem is with the shiftOldLeft

                // for the shift div itself
                shift.style.left = (Math.floor((eve.pageX - dropAreaLeft - partObj.partStart + 1) / 5)) * 5 + 'px'
                shift.style.width = ShiftOldWidth + shiftOldLeft - (Math.floor((eve.pageX - dropAreaLeft + 1) / 5)) * 5 + 'px'

                // for the resizing function
                let shiftLeftFinal = (Math.floor((eve.pageX - dropAreaLeft - partObj.partStart + 1) / 5)) * 5
                let shiftLengthFinal = ShiftOldWidth + shiftOldLeft - (Math.floor((eve.pageX - dropAreaLeft + 1) / 5)) * 5

                this.setState({ shiftLength: shiftLengthFinal })

                this.setState({ shiftLeftFinal: shiftLeftFinal })
                this.setState({ shiftLengthFinal: shiftLengthFinal })


                if (shiftLengthFinal < 70) {

                    this.setState({ shiftDataVIew: 'none' })

                } else if (shiftLengthFinal >= 70) {

                    this.setState({ shiftDataVIew: 'flex' })

                }


                // pushing the right end of shifts while resizing shift run over them

                for (let i = 0; i < shiftIdArr.length; i++) {

                    let shiftEnd = shiftIdArr[i].shiftStart + shiftIdArr[i].shiftLength

                    let otherShift = document.getElementById(`${shiftIdArr[i].shiftId}`)

                    // console.log(shiftIdArr[i].shiftId);
                    // console.log(shiftLeftFinal + partObj.partStart);
                    // console.log(otherShift);

                    if (shiftLeftFinal < shiftEnd) {

                        otherShift.style.width = shiftLeftFinal - shiftIdArr[i].shiftStart + 'px'

                        // I'm not sure what is going to be inside the shift, till then I'll just remove it content

                        if (shiftLeftFinal - shiftIdArr[i].shiftStart < 100 && shiftIdArr[i].shiftStart < shiftLeftFinal) {

                            // console.log(shiftIdArr[i].shiftStart);
                            // console.log(shiftLeftFinal);

                            const shiftElement = document.getElementById(`${shiftIdArr[i].shiftId}`);

                            while (shiftElement.lastElementChild) {

                                shiftElement.removeChild(shiftElement.lastElementChild);

                            }

                        }


                    } else {

                        otherShift.style.width = shiftIdArr[i].shiftLength + 'px'

                    }



                }

            } else if (eve.pageX - dropAreaLeft <= partObj.partStart) {

                // console.log(partObj.partStart);
                // console.log(eve.pageX - dropAreaLeft);

                shift.style.left = 0 + 'px'
                shift.style.width = ShiftOldWidth + shiftOldLeft - partObj.partStart + 'px'

                for (let i = 0; i < shiftIdArr.length; i++) {

                    let otherShifts = document.getElementById(`${shiftIdArr[i].shiftId}`)

                    otherShifts.style.left = shiftIdArr[i].shiftStart + 'px'
                    otherShifts.style.width = 0 + 'px'

                    // I'm not sure what is going to be inside the shift, till then I'll just remove it content

                }

                this.setState({ shiftLength: ShiftOldWidth + shiftOldLeft - partObj.partStart })

                this.setState({ shiftLeftFinal: 0 })
                this.setState({ shiftLengthFinal: ShiftOldWidth + shiftOldLeft - partObj.partStart })

            } else if (eve.pageX - dropAreaLeft > shiftOldLeft + ShiftOldWidth - shortestShift) {

                console.log(1);

                // console.log(eve.pageX - dropAreaLeft);
                // console.log(shiftOldLeft + ShiftOldWidth - shortestShift);

                shift.style.left = shiftOldLeft + ShiftOldWidth - shortestShift - partObj.partStart + 'px'
                shift.style.width = shortestShift + 'px'

                for (let i = 0; i < shiftIdArr.length; i++) {

                    let otherShifts = document.getElementById(`${shiftIdArr[i].shiftId}`)

                    otherShifts.style.left = shiftIdArr[i].shiftStart + 'px'
                    otherShifts.style.width = shiftIdArr[i].shiftLength + 'px'

                    // I'm not sure what is going to be inside the shift, till then I'll just remove it content

                }

                // this.setState({ shiftLength: shortestShift })

                this.setState({ shiftLeftFinal: shiftOldLeft + ShiftOldWidth - shortestShift - partObj.partStart })
                this.setState({ shiftLengthFinal: shortestShift })

                //  for handling realy realy realt fast mouse movment
                this.setState({ shiftDataVIew: 'none' })


            }

        } else if (resizer === 'rightResizer') {

            let shiftsObj = shiftDB[dayInd].posts[postInd].parts[partInd].shifts
            let partStart = shiftDB[dayInd].posts[postInd].parts[partInd].partStart

            let shiftIdArr = []

            for (let shiftInd = 0; shiftInd < shiftsObj.length; shiftInd++) {

                let everyShiftStart = shiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftStart

                if (shiftOldLeft < everyShiftStart + partStart) {

                    shiftIdArr.push(shiftsObj[shiftInd])

                }

            }

            if (eve.pageX - dropAreaLeft >= shiftOldLeft + shortestShift && eve.pageX - dropAreaLeft < partObj.partStart + partObj.partLength) {
                // interval for inside the dropArea

                // console.log(shiftOldLeft + shortestShift);
                // console.log(eve.pageX - dropAreaLeft);
                // console.log(partObj.partStart + partObj.partLength)

                // for the shift div itself
                shift.style.width = (Math.floor((eve.pageX - dropAreaLeft - shiftOldLeft + 1) / 5)) * 5 + 'px'

                // a variable the resizing function need to put in the timed state
                let shiftLengthFinal = (Math.floor((eve.pageX - dropAreaLeft - shiftOldLeft + 1) / 5)) * 5

                this.setState({ shiftLength: shiftLengthFinal })

                this.setState({ shiftLengthFinal: shiftLengthFinal })

                if (shiftLengthFinal < 70) { //this "if" removes the divs from the activly resized shift once it get too small

                    this.setState({ shiftDataVIew: 'none' })

                } else if (shiftLengthFinal >= 70) {

                    this.setState({ shiftDataVIew: 'flex' })

                }

                for (let i = 0; i < shiftIdArr.length; i++) {

                    let shiftStart = shiftIdArr[i].shiftStart + partObj.partStart

                    // console.log(shiftOldLeft + shiftLengthFinal);
                    // console.log(shiftStart);

                    let otherShifts = document.getElementById(`${shiftIdArr[i].shiftId}`)

                    if (shiftOldLeft + shiftLengthFinal > shiftStart && shiftOldLeft + shiftLengthFinal < shiftIdArr[i].shiftStart + shiftIdArr[i].shiftLength + partObj.partStart) {

                        //console.log('interval');

                        otherShifts.style.left = shiftOldLeft + shiftLengthFinal - partObj.partStart + 'px'
                        otherShifts.style.width = shiftIdArr[i].shiftStart + shiftIdArr[i].shiftLength + partObj.partStart - shiftOldLeft - shiftLengthFinal + 'px'

                        // I'm not sure what is going to be inside the shift, till then I'll just remove it content

                        // need to take care of rapid mouse movment

                        if (shiftIdArr[i].shiftStart + shiftIdArr[i].shiftLength - shiftOldLeft - shiftLengthFinal + partObj.partStart < 100) {

                            let shiftElement = document.getElementById(`${shiftIdArr[i].shiftId}`);

                            while (shiftElement.lastElementChild) {

                                shiftElement.removeChild(shiftElement.lastElementChild);

                            }

                        } else {

                            otherShifts.style.left = shiftOldLeft + shiftLengthFinal - partObj.partStart + 'px'
                            otherShifts.style.width = shiftIdArr[i].shiftStart + shiftIdArr[i].shiftLength + partObj.partStart - shiftOldLeft - shiftLengthFinal + 'px'

                        }

                        // I had some problem when resizing the right edge too fast, so I needed to bolster it conditions

                    } else if (eve.pageX - dropAreaLeft >= shiftIdArr[i].shiftStart + shiftIdArr[i].shiftLength + partObj.partStart) {

                        otherShifts.style.width = 0 + 'px'

                        let shiftElement = document.getElementById(`${shiftIdArr[i].shiftId}`);

                        while (shiftElement.lastElementChild) {

                            shiftElement.removeChild(shiftElement.lastElementChild);

                        }

                    } else if (eve.pageX - dropAreaLeft >= 0) {

                        //console.log(shiftIdArr[i]);

                        otherShifts.style.left = shiftIdArr[i].shiftStart + 'px'
                        otherShifts.style.width = shiftIdArr[i].shiftLength + 'px'


                    }



                }



            } else if (eve.pageX - dropAreaLeft >= partObj.partStart + partObj.partLength) {

                // console.log(partObj.partStart + partObj.partLength)
                // console.log(eve.pageX - dropAreaLeft);

                // we need to get all the side shifts in here and zero them

                shift.style.width = partObj.partStart + partObj.partLength - shiftOldLeft - 2 + 'px'

                for (let i = 0; i < shiftIdArr.length; i++) {

                    let otherShifts = document.getElementById(`${shiftIdArr[i].shiftId}`)

                    otherShifts.style.left = shiftIdArr[i].shiftStart + 'px'
                    otherShifts.style.width = 0 + 'px'

                    // I'm not sure what is going to be inside the shift, till then I'll just remove it content

                }

                this.setState({ shiftLength: partObj.partStart + partObj.partLength - shiftOldLeft - 2 })

                this.setState({ shiftLengthFinal: partObj.partStart + partObj.partLength - shiftOldLeft - 2 })

            } else if (eve.pageX - dropAreaLeft < shortestShift + shiftOldLeft + partObj.partStart) {

                console.log('interval');

                shift.style.width = shortestShift + 'px'

                for (let i = 0; i < shiftIdArr.length; i++) {

                    let otherShifts = document.getElementById(`${shiftIdArr[i].shiftId}`)

                    otherShifts.style.left = shiftIdArr[i].shiftStart + 'px'
                    otherShifts.style.width = shiftIdArr[i].shiftLength + 'px'

                    // I'm not sure what is going to be inside the shift, till then I'll just remove it content

                }

                this.setState({ shiftLengthFinal: shortestShift })

                // for handling realy realy realy fast mouse movment
                this.setState({ shiftDataVIew: 'none' })

            }

        }

    }

    dataDivView = () => {

        //console.log(this.props.shiftData.shiftLength);

        if (this.state.shiftDataVIew !== undefined) {

            return this.state.shiftDataVIew

        } else {

            if (this.props.shiftData.shiftLength >= 70) {

                return 'flex'

            } else if (this.props.shiftData.shiftLength < 70) {

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

    showStartHour = () => {

        if (this.state.shiftLeftFinal === undefined) {

            var startMinute = (this.props.shiftData.shiftStart + this.props.partObj.partStart) * 2 % 60
            var startHour = (Math.floor((this.props.shiftData.shiftStart + this.props.partObj.partStart) / 30) + this.props.dayStart) % 24

        } else {

            startMinute = (this.state.shiftLeftFinal + this.props.partObj.partStart) * 2 % 60
            startHour = (Math.floor((this.state.shiftLeftFinal + this.props.partObj.partStart) / 30) + this.props.dayStart) % 24

        }

        if (startMinute < 10) {

            return `${startHour}:0${startMinute}`

        } else return `${startHour}:${startMinute}`

    }

    showShiftEnd = () => {

        if (this.state.shiftLeftFinal === undefined && this.state.shiftLengthFinal === undefined) {

            var endMinute = (this.props.shiftData.shiftStart + this.props.shiftData.shiftLength + this.props.partObj.partStart) * 2 % 60
            var endHour = (Math.floor((this.props.shiftData.shiftStart + this.props.shiftData.shiftLength + this.props.partObj.partStart) / 30) + this.props.dayStart) % 24

        } else if (this.state.shiftLeftFinal === undefined && this.state.shiftLengthFinal !== undefined) {

            endMinute = (this.props.shiftData.shiftStart + this.state.shiftLengthFinal + this.props.partObj.partStart) * 2 % 60
            endHour = (Math.floor((this.props.shiftData.shiftStart + this.state.shiftLengthFinal + this.props.partObj.partStart) / 30) + this.props.dayStart) % 24

        } else if (this.state.shiftLeftFinal !== undefined && this.state.shiftLengthFinal !== undefined) {

            endMinute = (this.state.shiftLeftFinal + this.state.shiftLengthFinal + this.props.partObj.partStart) * 2 % 60
            endHour = (Math.floor((this.state.shiftLeftFinal + this.state.shiftLengthFinal + this.props.partObj.partStart) / 30) + this.props.dayStart) % 24

        }

        if (endMinute < 10) {

            return `${endHour}:0${endMinute}`

        } else return `${endHour}:${endMinute}`



    }

    resizerWidth = () => {

        if (this.state.shiftLengthFinal === undefined) {

            if (this.props.shiftData.shiftLength >= 100) {

                return 4

            } else if (this.props.shiftData.shiftLength >= 50 && this.props.shiftData.shiftLength < 100) {

                return 3

            } else if (this.props.shiftData.shiftLength < 50) {

                return 2

            }



        } else {

            if (this.state.shiftLengthFinal >= 100) {

                return 4

            } else if (this.state.shiftLengthFinal >= 50 && this.state.shiftLengthFinal < 100) {

                return 3

            } else if (this.state.shiftLengthFinal < 50) {

                return 2

            }

        }




    }


    render() {

        return (

            <div
                className='shiftDiv'
                id={`d${this.props.dayInd}p${this.props.postInd}t${this.props.partInd}s${this.props.shiftData.shiftStart + this.props.partObj.partStart}w${this.props.shiftData.workerId}`}
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

                    <div style={{ backgroundColor: '#888888', width: `${this.resizerWidth()}px`, alignSelf: 'center', height: '15px', cursor: 'ew-resize', pointerEvents: 'initial' }}
                        className='leftResizer'
                        onMouseDown={this.resizeShift}
                    ></div>

                    <div
                        className='shiftDataDiv'
                        style={{ display: `${this.dataDivView()}`, zIndex: 0, fontSize: '8px', pointerEvents: 'none', backgroundColor: '#aaaaaa' }}
                    >
                        {this.showStartHour()}
                    </div>

                </div>

                <div

                    style={{
                        display: `${this.dataDivView()}`,
                        pointerEvents: 'none',
                        position: "relative",
                        zIndex: 0,
                        height: 'fit-content',
                        fontSize: '12px',
                        backgroundColor: '#ffffff',
                        alignSelf: 'center',
                        paddingRight: '3px',
                        paddingLeft: '3px',
                        borderRadius: '4px'

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

                    <div style={{ backgroundColor: '#888888', width: `${this.resizerWidth()}px`, alignSelf: 'center', height: '15px', cursor: 'ew-resize', pointerEvents: 'initial' }}
                        className='rightResizer'
                        onMouseDown={this.resizeShift}

                    ></div>

                </div>

            </div>

        )
    }
}
