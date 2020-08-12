import React, { Component } from 'react'

export default class ShiftMarker extends Component {

    markerData = () => {

        var markerLength = 0;
        var markerStart = 0;

        var dropAreaLeft = document.getElementsByClassName('dropAreaDiv')[0].parentNode.offsetLeft;

        let partStart = this.props.partObj.partStart
        let endOfPart = this.props.partObj.partLength

        let dropAreaAxisX = this.props.axisX - partStart - dropAreaLeft

        // this if is to prvent shift drop on the border

        if (dropAreaAxisX > -1 && dropAreaAxisX < endOfPart - 2) {

            //console.log(dropAreaAxisX);

            var shiftsStrArr = this.props.partObj.shifts.map((o) => { return o.shiftStart })

            shiftsStrArr.push(endOfPart - 2)
            shiftsStrArr.push(dropAreaAxisX)

            for (let j = 0; j < shiftsStrArr.length - 1; j++) {

                for (let i = 0; i < shiftsStrArr.length - 1 - j; i++) {

                    if (shiftsStrArr[i] > shiftsStrArr[i + 1]) {

                        let tempI = shiftsStrArr[i]
                        shiftsStrArr[i] = shiftsStrArr[i + 1]
                        shiftsStrArr[i + 1] = tempI

                    }

                }

            }

            markerStart = dropAreaAxisX

            // console.log(shiftsStrArr);

            for (let i = 0; i < shiftsStrArr.length; i++) {

                if (shiftsStrArr[i] === dropAreaAxisX) {
                    var mouseIndStr = i
                }

            }

            // console.log(mouseIndStr);

            var endLimit = shiftsStrArr[mouseIndStr + 1]

            //console.log(endLimit);

            // --------------------------------------------------- //

            var shiftendArr = this.props.partObj.shifts.map((o) => { return o.shiftLength + o.shiftStart })

            shiftendArr.push(0)
            shiftendArr.push(dropAreaAxisX)

            for (let j = 0; j < shiftendArr.length - 1; j++) {

                for (let i = 0; i < shiftendArr.length - 1 - j; i++) {

                    if (shiftendArr[i] > shiftendArr[i + 1]) {

                        let tempI = shiftendArr[i]
                        shiftendArr[i] = shiftendArr[i + 1]
                        shiftendArr[i + 1] = tempI

                    }

                }

            }

            for (let i = 0; i < shiftendArr.length; i++) {

                if (shiftendArr[i] === dropAreaAxisX) {
                    var mouseIndEnd = i
                }

            }

            //console.log(shiftendArr);

            var strLimit = shiftendArr[mouseIndEnd - 1]

            //console.log(strLimit);

            // --------------------------------------------------- //

            if (dropAreaAxisX < strLimit + 120) {

                markerStart = strLimit

                markerLength = 240

                let gap = endLimit - strLimit

                if (gap < 240) {

                    markerStart = strLimit

                    markerLength = endLimit - strLimit

                }

            } else if (dropAreaAxisX > endLimit - 120) {

                let gap = endLimit - strLimit

                //console.log(gap);

                if (gap >= 240) {

                    markerStart = endLimit - 240

                    markerLength = 240

                } else if (gap < 240) {

                    markerStart = strLimit

                    markerLength = endLimit - strLimit

                }

            } else {

                markerStart = dropAreaAxisX - 120

                markerLength = 240

                markerStart = (Math.floor((markerStart + 1) / 5)) * 5

            }


        }


        return { mrkStr: markerStart, mrkLnth: markerLength }



    }

    markerColor = () => {

        // since the this.props.axisX1 is undefined for the first few moment,
        // we get NaN warning on depeneded variables,
        // and the marker apears on the left of the drop area

        // if (this.markerData().mrkLnth === 0) {

        //     return '#ffffff'

        // } else {

        //     return '#aaaaaa'

        // }

        return '#ffaaff'

    }

    markerDataColor = () => {

        // since the this.props.axisX1 is undefined for the first few moment,
        // we get NaN warning on depeneded variables,
        // and the marker apears on the left of the drop area

        if (this.markerData().mrkLnth === 0) {

            return '#ffffff'

        } else {

            return '#000000'

        }

    }

    addShift = () => {

        console.log('addShift');


    }

    stopMarking = () => {

       
        
    }



    render() {

        

        return (
            <div id='markerDiv'
           
                style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '21px',
                    width: `${this.markerData().mrkLnth}px`,
                    left: `${this.markerData().mrkStr}px`,
                    backgroundColor: `${this.markerColor()}`,
                    pointerEvents: 'none'
                }}
            >
                <div
                    style={{
                        color: `${this.markerDataColor()}`,
                        fontSize: '12px'
                    }}
                >
                    {this.markerData().mrkStr + this.props.partObj.partStart}
                </div>

                <div
                    style={{
                        color: `${this.markerDataColor()}`,
                        fontSize: '12px'
                    }}
                >
                    {this.markerData().mrkStr + this.markerData().mrkLnth + this.props.partObj.partStart}
                </div>

            </div>
        )
    }
}
