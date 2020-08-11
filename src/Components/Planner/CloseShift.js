import React from 'react'

export default function CloseShift() {
    return (
        <div className='CLoseShiftDiv'>
            style={{
                    position: "absolute",
                    width: `${this.props.localShifts[this.props.shiftInd1].shiftLength}px`,
                    left: `${this.props.localShifts[this.props.shiftInd1].shiftStart}px`,
                    top: '-1px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: '#666666',
                    height: '23px',
                    borderRadius: '3px',
                    zIndex: 1,
                }}
        </div>
    )
}
