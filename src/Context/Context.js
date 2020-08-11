import React, { createContext, Component } from 'react';


export const Context = createContext();

export default class ContextProvider extends Component {

    state = {

        // marker
        globalMarkDay: undefined,
        globalMarkPost: undefined,
        globalMarkPart: undefined,

        // resizing data
        shiftLeftFinal: undefined,
        shiftLengthFinal: undefined,
        workerId: undefined,
        dayInd: undefined,
        postInd: undefined,


    }

    setMarkerIndCon = (dayInd, postInd, partInd) => {

        // console.log('function inside context');
        // console.log(dayInd);
        // console.log(postInd);
        this.setState({ globalMarkDay: dayInd, globalMarkPost: postInd, globalMarkPart: partInd })

    }


    render() {

        return (

            <Context.Provider value={{
                ...this.state,
                setMarkerInd: this.setMarkerIndCon,
               
            }}>
                {this.props.children}
            </Context.Provider>

        )
    }
}
