import React, { Component } from 'react'
import Post from './Post'
//import { Post } from './Post'


export default class Day extends Component {

    render() {
        return (
            <div>

                <div className='dayBodyDiv'  style={{backgroundColor: '#dddddd'}}>

                    <div className='dayNameDiv'>
                        {this.props.shiftSet[this.props.dayInd].name}
                    </div>

                    <div>
                        {this.props.shiftSet[this.props.dayInd].posts.map((e, postInd) => {
                            return (
                                <Post
                                    deleteMarker={this.props.deleteMarker}

                                    setResizeData={this.props.setResizeData}

                                    key={postInd}
                                    shiftSet={this.props.shiftSet}
                                    workerDB={this.props.workerDB}
                                    dayStart={this.props.dayStart}

                                    dayInd={this.props.dayInd}
                                    postInd={postInd}
                                
                                    markerWorkerID3={this.props.markerWorkerID2}
                                />
                            )
                        })}
                    </div>

                </div>

            </div>
        )
    }
}
