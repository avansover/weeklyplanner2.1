import React, { Component } from 'react'
import WorkersBox from './WorkersBox'
import Day from './Day';
import ContextProvider from '../../Context/Context'
import PlannerStats from './PlannerStats';

export default class Planner extends Component {


    bringWorkerID5 = (workerID) => {

        this.props.bringWorkerID6(workerID)

        //console.log(workerID);

    }

    drop = (ev) => {

        let srcClass = ev.dataTransfer.getData("srcClass");

        if (srcClass === 'shiftDiv' && ev.target.className !== 'shiftDiv' && ev.target.className !== 'dropAreaDiv') {

            let srcDay = ev.dataTransfer.getData("srcDay");
            let srcPost = ev.dataTransfer.getData("srcPost");
            let srcPart = ev.dataTransfer.getData("srcPart");
            let srcId = ev.dataTransfer.getData("srcId");
            let srcPartStart = ev.dataTransfer.getData("srcPartStart");

            console.log(srcClass);
            console.log(ev.target.className);

            let srcShiftStart = parseInt(srcId.slice(srcId.indexOf('s') + 1, srcId.indexOf('w')))

            console.log(srcShiftStart);

            let shiftDB = this.props.shiftSet

            let shiftsNearSrc = shiftDB[srcDay].posts[srcPost].parts[srcPart].shifts

            for (let shiftInd = 0; shiftInd < shiftsNearSrc.length; shiftInd++) {

                if (shiftsNearSrc.filter((o) => (o.shiftStart + parseInt(srcPartStart) === srcShiftStart))[0].shiftStart === shiftsNearSrc[shiftInd].shiftStart) {

                    console.log(shiftsNearSrc[shiftInd]);

                    var shiftToRemoveInd = shiftInd

                }

            }

            shiftsNearSrc.splice(shiftToRemoveInd, 1)

            console.log(shiftDB);

            this.props.deleteShift(shiftDB)

        }



    }

    allowDrop = (ev) => {

        ev.preventDefault();

    }

    render() {
        return (
            <div
                onDrop={this.drop}
                onDragOver={this.allowDrop}
            >

                <div id='plnWrkBox'>

                    <div>
                        <ContextProvider>
                            <WorkersBox
                                bringWorkerID4={this.bringWorkerID5}


                                workerDB2={this.props.workerDB}

                            />
                        </ContextProvider>
                    </div>


                    <div id='plannerDiv'>
                        {this.props.shiftSet.map((e, dayInd) => {
                            return (
                                <Day
                                    deleteMarker={this.props.deleteMarker}

                                    setResizeData={this.props.setResizeData}

                                    key={dayInd}
                                    shiftSet={this.props.shiftSet}
                                    workerDB={this.props.workerDB}
                                    dayStart={this.props.dayStart}
                                    dayInd={dayInd}

                                    markerWorkerID2={this.props.markerWorkerID1}

                                />
                            )
                        })}

                    </div>

                    <div>
                        <PlannerStats
                        deleteAllShift={this.props.deleteAllShift}
                        />
                        
                    </div>

                </div>

            </div>
        )
    }
}
