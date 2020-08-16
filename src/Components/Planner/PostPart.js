import React, { Component } from 'react'
import ShiftMarker from './ShiftMarker';
import { Context } from '../../Context/Context';
import Shift from './Shift';

export default class PostPart extends Component {

    constructor(props) {
        super(props)

        this.state = {

            axisX: undefined,

            // shiftStartForDrop: undefined,
            // shiftLengthForDrop: undefined,

        }
    }

    static contextType = Context

    allowDrop = (ev) => {

        // *** learn conextAPI

        ev.preventDefault();

        //console.log(ev.target);
        //console.log(ev.pageX);

        if (this.state.axisX !== ev.pageX) {

            this.setState({ axisX: ev.pageX })

        }

        if (ev.target.className !== 'shiftDiv') {


            let localDayInd = this.props.dayInd
            let localPostInd = this.props.postInd
            let localPartInd = this.props.partInd

            const { setMarkerInd } = this.context

            setMarkerInd(localDayInd, localPostInd, localPartInd)

        }

    }

    placeMarker = () => {

        let { globalMarkDay, globalMarkPost, globalMarkPart } = this.context

        if (this.props.dayInd === globalMarkDay && this.props.postInd === globalMarkPost && this.props.partInd === globalMarkPart) {

            return <ShiftMarker
                axisX={this.state.axisX}
                partObj={this.props.partObj}
                dayStart={this.props.dayStart}
            />

        }

    }

    deleteMarker = () => {

        // *** at app, set markerPlaceDay and markerPlacePost to undefined,

        var markerDiv = document.getElementById('markerDiv')

        if (markerDiv !== null) {

            markerDiv.remove()

        }

        // entanglement

        this.props.deleteMarker()

    }

    addShiftToDB = (axisX, workerId) => {

        let shiftDB = this.props.shiftSet
        let dayInd = this.props.dayInd
        let postInd = this.props.postInd
        let partInd = this.props.partInd

        var shiftLength = 240

        let dropAreaLeft = document.getElementsByClassName('dropAreaDiv')[0].parentNode.offsetLeft

        let partObj = this.props.partObj
        let partStart = this.props.partObj.partStart
        let endOfPart = this.props.partObj.partLength

        var dropAreaAxisX = axisX - dropAreaLeft - partStart

        let shiftMap = partObj.shifts.map((o) => ({ st: o.shiftStart + partStart, ln: o.shiftLength }))

        console.log(shiftMap);

        for (let i = 0; i < shiftMap.length; i++) {

            //should also make the same for marker
            //console.log(shiftMap[i].st);

            console.log(dropAreaAxisX);

            console.log(shiftMap[i].st);
            console.log(shiftMap[i].ln);

            console.log(shiftMap[i].st+shiftMap[i].ln);

            if (dropAreaAxisX >= shiftMap[i].st - partStart) {

                console.log('after the start');

                if (dropAreaAxisX <= shiftMap[i].st + shiftMap[i].ln - partStart) {

                    console.log('steped on');

                   return
                    
                }

            }

        }

        

        if (dropAreaAxisX > -1 && dropAreaAxisX < endOfPart - 2) {

            // making and array for all the starting point of the shifts + the mouse pointer

            var shiftStr = shiftDB[dayInd].posts[postInd].parts[partInd].shifts.map((o, i) => { return o.shiftStart })

            //var shiftStr = shiftDB[dayInd].posts[postInd]

            //the 720 is the ending point when there is no shift after the one we just droped
            shiftStr.push(endOfPart - 2)
            shiftStr.push(dropAreaAxisX)

            // sort the starting points of the shifts + the mouse pointer, inside the post area.

            for (let j = 0; j < shiftStr.length - 1; j++) {

                for (let i = 0; i < shiftStr.length - 1 - j; i++) {

                    if (shiftStr[i] > shiftStr[i + 1]) {

                        let tempI = shiftStr[i]
                        shiftStr[i] = shiftStr[i + 1]
                        shiftStr[i + 1] = tempI

                    }

                }

            }

            // console.log(shiftStr);

            // in that new sorted array, we check where is mouse pointer is positioned

            for (let i = 0; i < shiftStr.length; i++) {

                if (shiftStr[i] === dropAreaAxisX) {
                    var mouseIndStr = i
                }

            }

            var endLimit = shiftStr[mouseIndStr + 1]

            console.log('endLimit ' + endLimit);

            // sort the starting point of the shifts + the mouse pointer, inside the post area.

            var shiftend = shiftDB[dayInd].posts[postInd].parts[partInd].shifts.map((o, i) => { return o.shiftLength + o.shiftStart })

            // the 0 is the starting point when there is no shift before the one we just droped
            shiftend.push(0)
            shiftend.push(dropAreaAxisX)

            // sort the ending points of the shifts + the mouse pointer, inside the post area.

            for (let j = 0; j < shiftend.length - 1; j++) {

                for (let i = 0; i < shiftend.length - 1 - j; i++) {

                    if (shiftend[i] > shiftend[i + 1]) {

                        let tempI = shiftend[i]
                        shiftend[i] = shiftend[i + 1]
                        shiftend[i + 1] = tempI

                    }

                }

            }

            // here in that new sorted array, we check again where is mouse pointer is positioned

            for (let i = 0; i < shiftend.length; i++) {

                if (shiftend[i] === dropAreaAxisX) {
                    var mouseIndEnd = i
                }

            }

            var strLimit = shiftend[mouseIndEnd - 1]

            console.log('strLimit ' + strLimit);

            if (dropAreaAxisX < strLimit + 120) {

                var shiftStart = strLimit
                let gap = endLimit - strLimit

                if (gap < 240) {

                    shiftStart = strLimit
                    shiftLength = endLimit - strLimit

                }


            } else if (dropAreaAxisX > endLimit - 120) {

                let gap = endLimit - strLimit

                if (gap >= 240) {

                    shiftStart = endLimit - 240

                } else if (gap < 240) {

                    shiftStart = strLimit
                    shiftLength = endLimit - strLimit

                }

            } else {

                shiftStart = dropAreaAxisX - 120
                shiftStart = (Math.floor((shiftStart + 1) / 5)) * 5

            }

            shiftDB[dayInd].posts[postInd].parts[partInd].shifts.push({ workerId: workerId, part: partInd, shiftStart: shiftStart, shiftLength: shiftLength, shiftId: `d${dayInd}p${postInd}t${partInd}s${shiftStart + partStart}w${workerId}` })

            console.log(shiftDB);

        }



    }

    shiftSorter = () => {

        let shiftDB = this.props.shiftSet
        let dayInd = this.props.dayInd
        let postInd = this.props.postInd
        let partInd = this.props.partInd

        for (let j = 0; j < shiftDB[dayInd].posts[postInd].parts[partInd].shifts.length; j++) {

            for (let i = 0; i < shiftDB[dayInd].posts[postInd].parts[partInd].shifts.length - 1 - j; i++) {

                let firstShift = shiftDB[dayInd].posts[postInd].parts[partInd].shifts[i]
                let secondShift = shiftDB[dayInd].posts[postInd].parts[partInd].shifts[i + 1]

                //console.log(shiftDB[dayInd].posts[postInd].parts[partInd].shifts[i].shiftStart);

                if (firstShift.shiftStart > secondShift.shiftStart) {

                    let tempShift = shiftDB[dayInd].posts[postInd].parts[partInd].shifts[i]
                    shiftDB[dayInd].posts[postInd].parts[partInd].shifts[i] = shiftDB[dayInd].posts[postInd].parts[partInd].shifts[i + 1]
                    shiftDB[dayInd].posts[postInd].parts[partInd].shifts[i + 1] = tempShift


                }

            }
        }

    }

    shiftMerger = () => {

        let shiftDB = this.props.shiftSet
        let dayInd = this.props.dayInd
        let postInd = this.props.postInd
        let partInd = this.props.partInd

        let partStart = this.props.partObj.partStart

        for (let shiftInd = 0; shiftInd < shiftDB[dayInd].posts[postInd].parts[partInd].shifts.length - 1; shiftInd++) {

            console.log(shiftDB[dayInd].posts[postInd].parts[partInd].shifts);

            let firstShift = shiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd]
            let secondShift = shiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd + 1]

            if (firstShift.shiftStart + firstShift.shiftLength === secondShift.shiftStart && firstShift.workerId === secondShift.workerId) {

                shiftDB[dayInd].posts[postInd].parts[partInd].shifts.push({ workerId: firstShift.workerId, part: partInd, shiftStart: firstShift.shiftStart, shiftLength: firstShift.shiftLength + secondShift.shiftLength, shiftId: `d${dayInd}p${postInd}t${partInd}s${firstShift.shiftStart + partStart}w${firstShift.workerId}` })

                let localShiftNum = shiftDB[dayInd].posts[postInd].parts[partInd].shifts.length

                let newMergedShift = shiftDB[dayInd].posts[postInd].parts[partInd].shifts[localShiftNum - 1]

                shiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd] = newMergedShift

                shiftDB[dayInd].posts[postInd].parts[partInd].shifts.splice(shiftInd + 1, 1)

                shiftDB[dayInd].posts[postInd].parts[partInd].shifts.pop()

            }

        }



    }

    drop = (ev) => {

        // *** learn conextAPI

        ev.preventDefault();

        // console.log(ev.target);

        // --- from shift ---
        let srcClass = ev.dataTransfer.getData("srcClass");

        console.log(srcClass);

        if (srcClass === 'ticketDiv' && ev.target.className === 'dropAreaDiv') {

            console.log('clone');

            // hundle normal clonning from ticket to planner area drop

            let axisX = ev.pageX
            let workerId = ev.dataTransfer.getData("ticketWorkerId");

            // let shiftDB = this.props.shiftSet
            // let dayInd = this.props.dayInd
            // let postInd = this.props.postInd
            // let partInd = this.props.partInd

            this.addShiftToDB(axisX, workerId)

            this.shiftSorter()

            for (let k = 0; k < 2; k++) {

                this.shiftMerger()

            }

        } else if (srcClass === 'ticketDiv' && ev.target.className === 'shiftDiv') {

            console.log('run over');

            let ticketWorkerId = ev.dataTransfer.getData("ticketWorkerId");

            console.log('ticketWorkerId ' + ticketWorkerId);

            let dayInd = this.props.dayInd
            let postInd = this.props.postInd
            let partInd = this.props.partInd
            let shiftDB = this.props.shiftSet

            let tgtShiftId = ev.target.id
            console.log('tgtId ' + tgtShiftId);

            let tgtWorkerId = tgtShiftId.slice(tgtShiftId.indexOf('w') + 1, tgtShiftId.length)
            console.log('tgtWorkerId ' + tgtWorkerId);

            //console.log(shiftDB[dayInd].posts[postInd]);

            for (let shiftInd = 0; shiftInd < shiftDB[dayInd].posts[postInd].parts[partInd].shifts.length; shiftInd++) {

                if (shiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftId === tgtShiftId) {

                    console.log('tgt found');
                    console.log(shiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd]);

                    var tgtShiftInd2 = shiftInd

                }

            }

            let tgtNewShiftId = tgtShiftId.slice(0, tgtShiftId.indexOf('w') + 1) + ticketWorkerId

            // console.log(tgtNewShiftId);

            shiftDB[dayInd].posts[postInd].parts[partInd].shifts[tgtShiftInd2].workerId = ticketWorkerId
            shiftDB[dayInd].posts[postInd].parts[partInd].shifts[tgtShiftInd2].shiftId = tgtNewShiftId

            // merg shifts

            for (let k = 0; k < 2; k++) {

                this.shiftMerger()

            }

        } else if (srcClass === 'shiftDiv' && ev.target.className === 'dropAreaDiv') {

            console.log('transfer');

            let shiftDB = this.props.shiftSet

            let workerId = ev.dataTransfer.getData("srcWorkerId");
            let axisX = ev.pageX

            this.addShiftToDB(axisX, workerId)

            this.shiftSorter()

            let srcId = ev.dataTransfer.getData("srcId");
            let srcDay = ev.dataTransfer.getData("srcDay");
            let srcPost = ev.dataTransfer.getData("srcPost");
            let srcPart = ev.dataTransfer.getData("srcPart");
            let srcPartStart = ev.dataTransfer.getData("srcPartStart");

            // console.log(srcPartStart);

            // console.log(srcId.slice(srcId.indexOf('s') + 1, srcId.indexOf('w')));

            let srcShiftStart = parseInt(srcId.slice(srcId.indexOf('s') + 1, srcId.indexOf('w')))

            let shiftsNearSrc = shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts

            // console.log(shiftsNearSrc.filter((o) => (o.shiftStart + parseInt(srcPartStart) === srcShiftStart)));

            for (let shiftInd = 0; shiftInd < shiftsNearSrc.length; shiftInd++) {

                if (shiftsNearSrc.filter((o) => (o.shiftStart + parseInt(srcPartStart) === srcShiftStart))[0].shiftStart === shiftsNearSrc[shiftInd].shiftStart) {

                    console.log(shiftsNearSrc[shiftInd]);

                    var shiftToRemoveInd = shiftInd

                }

            }

            // console.log(shiftToRemoveInd);

            shiftsNearSrc.splice(shiftToRemoveInd, 1)

            for (let k = 0; k < 2; k++) {

                this.shiftMerger()

            }

        } else if (srcClass === 'shiftDiv' && ev.target.className === 'shiftDiv') {

            console.log('swap');

            let srcId = ev.dataTransfer.getData("srcId");
            let srcDay = ev.dataTransfer.getData("srcDay");
            let srcPost = ev.dataTransfer.getData("srcPost");
            let srcPart = ev.dataTransfer.getData("srcPart");
            let srcPartStart = ev.dataTransfer.getData("srcPartStart");
            let srcWorkerId = ev.dataTransfer.getData("srcWorkerId");

            //console.log(srcPartStart);

            console.log('srcId ' + srcId);
            console.log('srcDay ' + srcDay);
            console.log('srcPost ' + srcPost);
            console.log('srcPart ' + srcPart);
            console.log('srcWorkerId ' + srcWorkerId);

            let shiftDB = this.props.shiftSet
            let tgtShiftId = ev.target.id
            console.log('tgtId ' + tgtShiftId);

            let tgtDay = this.props.dayInd
            console.log('tgt day ' + tgtDay);

            let tgtPost = this.props.postInd
            console.log('tgt post ' + tgtPost);

            let tgtPart = this.props.partInd
            console.log('tgtPart ' + tgtPart);

            let tgtPartStart = this.props.partObj.partStart

            let tgtWorkerId = tgtShiftId.slice(tgtShiftId.indexOf('w') + 1, tgtShiftId.length)
            console.log('tgtWorkerId ' + tgtWorkerId);


            for (let shiftInd = 0; shiftInd < shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts.length; shiftInd++) {

                if (shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts[shiftInd].shiftId === srcId) {

                    console.log('src found');
                    console.log(shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts[shiftInd]);

                    var srcShiftInd = shiftInd

                }

            }

            for (let shiftInd = 0; shiftInd < shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts.length; shiftInd++) {

                if (shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts[shiftInd].shiftId === tgtShiftId) {

                    console.log('tgt found');
                    console.log(shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts[shiftInd]);

                    var tgtShiftInd = shiftInd

                }

            }

            console.log(srcShiftInd);
            console.log(tgtShiftInd);



            console.log('remaking shiftId ');

            let srcNewShiftId = srcId.slice(0, srcId.indexOf('w') + 1) + tgtWorkerId

            console.log('newSrcId ' + srcNewShiftId);

            let tgtNewShiftId = tgtShiftId.slice(0, tgtShiftId.indexOf('w') + 1) + srcWorkerId

            console.log('tgtNewShiftId ' + tgtNewShiftId);

            shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts[srcShiftInd].workerId = tgtWorkerId
            shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts[srcShiftInd].shiftId = srcNewShiftId

            shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts[tgtShiftInd].workerId = srcWorkerId
            shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts[tgtShiftInd].shiftId = tgtNewShiftId

            if (parseInt(srcDay) === tgtDay && parseInt(srcPart) === tgtPart) {

                console.log('same part');

                this.shiftSorter()

                for (let k = 0; k < 2; k++) {

                    this.shiftMerger()

                }

            } else {

                for (let k = 0; k < 2; k++) {

                    for (let shiftInd = 0; shiftInd < shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts.length - 1; shiftInd++) {

                        console.log(shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts);

                        let firstShift = shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts[shiftInd]
                        let secondShift = shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts[shiftInd + 1]

                        if (firstShift.shiftStart + firstShift.shiftLength === secondShift.shiftStart && firstShift.workerId === secondShift.workerId) {

                            shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts.push({ workerId: firstShift.workerId, shiftStart: firstShift.shiftStart, shiftLength: firstShift.shiftLength + secondShift.shiftLength, shiftId: `d${srcDay}p${srcPost}t${srcPart}s${firstShift.shiftStart + parseInt(srcPartStart)}w${firstShift.workerId}` })

                            let localShiftNum = shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts.length

                            let newMergedShift = shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts[localShiftNum - 1]

                            shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts[shiftInd] = newMergedShift

                            shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts.splice(shiftInd + 1, 1)

                            shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts.pop()

                        }

                    }

                    for (let shiftInd = 0; shiftInd < shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts.length - 1; shiftInd++) {

                        console.log(shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts);

                        let firstShift = shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts[shiftInd]
                        let secondShift = shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts[shiftInd + 1]

                        if (firstShift.shiftStart + firstShift.shiftLength === secondShift.shiftStart && firstShift.workerId === secondShift.workerId) {

                            shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts.push({ workerId: firstShift.workerId, shiftStart: firstShift.shiftStart, shiftLength: firstShift.shiftLength + secondShift.shiftLength, shiftId: `d${tgtDay}p${tgtPost}t${tgtPart}s${firstShift.shiftStart + tgtPartStart}w${firstShift.workerId}` })

                            let localShiftNum = shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts.length

                            let newMergedShift = shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts[localShiftNum - 1]

                            shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts[shiftInd] = newMergedShift

                            shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts.splice(shiftInd + 1, 1)

                            shiftDB[tgtDay].posts[tgtPost].parts[tgtPart].shifts.pop()

                        }

                    }

                }

            }







        }

        this.deleteMarker()


    }




    render() {
        return (
            <div className='dropAreaDiv'
                style={{
                    position: "absolute",
                    width: `${this.props.partObj.partLength}px`,
                    left: `${this.props.partObj.partStart}px`,
                    top: '1px',
                    display: 'flex',
                    height: '23px',
                    borderRadius: '6px',
                    backgroundColor: '#ffffff'
                }}
                onDragOver={this.allowDrop}
                onDrop={this.drop}
                onDragLeave={this.deleteMarker}

            >
                {this.placeMarker()}

                {this.props.shiftSet[this.props.dayInd].posts[this.props.postInd].parts[this.props.partInd].shifts.map((o, i) => {
                    return (<Shift

                        key={i}

                        setResizeData={this.props.setResizeData}
                        rightClick={this.rightClick}

                        shiftSet={this.props.shiftSet}
                        workerDB={this.props.workerDB}
                        dayStart={this.props.dayStart}

                        dayInd={this.props.dayInd}
                        postInd={this.props.postInd}
                        partInd={this.props.partInd}
                        shiftInd={i}

                        partObj={this.props.partObj}
                        shiftData={o}

                    //markerWorkerID4={this.props.markerWorkerID3}
                    //partObj={this.props.partObj}
                    />)
                })}
            </div>
        )
    }
}
