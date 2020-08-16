import React, { Component } from 'react';
import PostPart from './PostPart';
import ContextProvider from '../../Context/Context'

export default class Post extends Component {

    rightClick = () => {

        console.log('rightClick');

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
