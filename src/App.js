import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css';
import Planner from './Components/Planner/Planner.js'
import Personal from './Components/Personal/Personal.js'
import Gistory from './Components/History/Gistory.js'
import SetPlan from './Components/SetPlan/SetPlan.js'
import HomePage from './Components/HomePage.js';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Worker from './Components/Personal/Worker';
import { Button } from 'react-bootstrap';
//import ContextProvider from './Context/Context.js';
//import { Context } from './Context/Context';
// import ContextProvider, { Context } from './Context/Context.js';

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {

      shiftSet: [
        {
          name: 'Su', date: '', posts: [
            {
              name: 'post1', parts: [
                { partStart: 0, partLength: 722, shifts: [] }]
            },
            {
              name: 'post2', parts: [
                { partStart: 0, partLength: 242, shifts: [] }, { partStart: 480, partLength: 242, shifts: [] }]
            }
          ]
        },
        {
          name: 'Mo', posts: [
            {
              name: 'post1', parts: [
                { partStart: 0, partLength: 482, shifts: [] }]
            },
            {
              name: 'post2', parts:
                [{ partStart: 240, partLength: 482, shifts: [] }]
            }
          ]
        },
        {
          name: 'Tu', posts: [
            {
              name: 'post3', parts: [
                { partStart: 240, partLength: 242, shifts: [] }]
            },
            {
              name: 'post4', parts:
                [{ partStart: 0, partLength: 722, shifts: [] }]
            }
          ]
        },
        {
          name: 'We', posts: [
            {
              name: 'post3', parts: [
                { partStart: 0, partLength: 722, shifts: [] }]
            },
            {
              name: 'post5', parts:
                [{ partStart: 0, partLength: 242, shifts: [] }, { partStart: 480, partLength: 242, shifts: [] }]
            },
            {
              name: 'post6', parts:
                [{ partStart: 0, partLength: 722, shifts: [] }]
            },
          ]
        },
        {
          name: 'Th', posts: [
            {
              name: 'post1', parts: [
                { partStart: 0, partLength: 722, shifts: [] }]
            },
            {
              name: 'post4', parts:
                [{ partStart: 240, partLength: 242, shifts: [] }]
            }
          ]
        },
        {
          name: 'Fr', posts: [
            {
              name: 'post2', parts: [
                { partStart: 0, partLength: 722, shifts: [] }]
            },
            {
              name: 'post4', parts:
                [{ partStart: 0, partLength: 722, shifts: [] }]
            }
          ]
        },
        {
          name: 'Sa', posts: [
            {
              name: 'post3', parts: [
                { partStart: 0, partLength: 722, shifts: [] }]
            },
            {
              name: 'post5', parts:
                [{ partStart: 0, partLength: 722, shifts: [] }]
            }
          ]
        },

      ],

      workerDB: [
        { id: '15', firstName: 'first', lastName: 'last', color: '#ff0000' },
        { id: '1', firstName: 'drag', lastName: 'last', color: '#00aa00' },
        { id: '2', firstName: 'draggable', lastName: 'last', color: '#6666ff' },
        { id: '3', firstName: 'worker 4', lastName: 'last', color: '#aaaa00' },
        { id: '4', firstName: 'worker 5', lastName: 'last', color: '#ff00ff' },
        { id: '124', firstName: 'worker 6', lastName: 'last', color: '#00ffff' },
      ],

      markerWorkerID: undefined,

      higherBarView: 'in',

      dayStart: 7

    }

  }

  deleteMarker = () => {

    //when dropping the shift or leaving the the drop area
    //the marker is deleted

    //this.setData()

    this.setState({ entanglement: undefined })

  }

  bringWorkerID7 = (workerID) => {

    //may use this function later
    //console.log(workerID);

    //this.setState({ markerWorkerID: workerID })

  }

  higherBarView = () => {

    if (this.state.higherBarView === 'in') {

      return (

        <div style={{ display: 'flex', position: "relative" }}>

          <div className='logInOutMenuBtDiv'>
            <Link to='/login'>
              <Button variant="outline-primary">log in</Button>
            </Link>
          </div>

          <div className='logInOutMenuBtDiv'>
            <Link to='/signup'>
              <Button variant="outline-primary">signup</Button>
            </Link>
          </div>

        </div>

      )

    } else if (this.state.higherBarView === 'out') {

      return (

        <div style={{ display: 'flex', position: "relative" }}>

          <div style={{ marginRight: '10px' }}>
            hello user
          </div>

          <div>
            <Link to='/'>
              <Button variant="outline-primary" onClick={() => this.setState({ higherBarView: 'in' })}>logout</Button>
            </Link>
          </div>

        </div>

      )

    }

  }

  lowerBarView = () => {

    if (this.state.higherBarView === 'in') {

      return (

        <div style={{ display: 'flex', position: "relative" }}>

        </div>

      )

    } else if (this.state.higherBarView === 'out') {

      return (

        <div style={{ display: 'flex', position: "relative" }}>

          <div className='mainMenuBtDiv'>
            <Link to='/planner' draggable={false}>
              <Button variant="primary">Planner</Button>
            </Link>
          </div>

          <div className='mainMenuBtDiv'>
            <Link to='/personal' draggable={false}>
              <Button variant="primary">Personal</Button>
            </Link>
          </div>

          <div className='mainMenuBtDiv'>
            <Link to='/setplanner' draggable={false}>
              <Button variant="primary">Set Planner</Button>
            </Link>
          </div>

          <div className='mainMenuBtDiv'>
            <Link to='/history' draggable={false}>
              <Button variant="primary">History</Button>
            </Link>
          </div>

        </div>

      )

    }

  }


  login = () => {

    // let data = localStorage.getItem('shiftDB')

    // data = JSON.parse(data)

    // this.setState({shiftSet: data})

    this.setState({ higherBarView: 'out' })

  }

  deleteShift = (shiftDB) => {

    //this.setData()

    this.setState({ shiftSet: shiftDB })

  }

  deleteAllShift = () => {

    console.log('deleteAllShift');

    let tempShiftDB = [...this.state.shiftSet]

    for (let dayInd = 0; dayInd < tempShiftDB.length; dayInd++) {

      for (let postInd = 0; postInd < tempShiftDB[dayInd].posts.length; postInd++) {

        for (let partInd = 0; partInd < tempShiftDB[dayInd].posts[postInd].parts.length; partInd++) {

          tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts = []

        }

      }

    }

    this.setState({ shiftSet: tempShiftDB })

    //this.setData()

  }

  setResizeData = (resizer, shiftOldLeft, ShiftOldWidth, shiftLeftFinal, shiftLengthFinal, workerId, dayInd, postInd, partInd) => {

    //console.log(resizer);


    //console.log(shiftOldLeft);


    var tempShiftDB = [...this.state.shiftSet]

    // console.log(tempShiftDB[dayInd].posts[postInd].shifts);

    // console.log(shiftLengthFinal);

    // if we just click the resizers, this one is undefined

    if (resizer === 'leftResizer' && shiftLeftFinal !== undefined) {

      //console.log(resizer);

      for (let shiftInd = 0; shiftInd < tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts.length; shiftInd++) {

        // console.log(tempShiftDB[dayInd].posts[postInd].parts[partInd].partStart);
        // console.log(tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftStart);
        // console.log(shiftOldLeft);

        let partStart = tempShiftDB[dayInd].posts[postInd].parts[partInd].partStart
        let shiftStart = tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftStart

        if (partStart + shiftStart === shiftOldLeft) {
          // the if here check what shift we resize activly

          tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftStart = shiftLeftFinal
          tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftLength = shiftLengthFinal
          tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftId = `d${dayInd}p${postInd}t${partInd}s${shiftLeftFinal + partStart}w${workerId}`

        } else if (tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftStart + partStart < shiftOldLeft) {
          // the if here check what shift we resize passivly

          // console.log(tempShiftDB[dayInd].posts[postInd].shifts[shiftInd].shiftStart);
          // console.log(tempShiftDB[dayInd].posts[postInd].shifts[shiftInd].shiftLength);

          let sideShiftStart = tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftStart
          let sideShiftLength = tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftLength

          if (shiftLeftFinal < sideShiftStart + sideShiftLength) {

            // console.log(tempShiftDB[dayInd].posts[postInd].shifts[shiftInd].shiftStart);
            // console.log(tempShiftDB[dayInd].posts[postInd].shifts[shiftInd].shiftLength);

            let newSideShiftLength = shiftLeftFinal - sideShiftStart

            if (newSideShiftLength > 0) {

              tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftLength = newSideShiftLength

            } else if (newSideShiftLength <= 0) {

              console.log(shiftInd);
              console.log(newSideShiftLength);

              tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts.splice(shiftInd, 1)

              shiftInd--

            }

          }

        }

      }

    } else if (resizer === 'rightResizer' && shiftLengthFinal !== undefined) {

      //console.log(resizer);

      //console.log(shiftLengthFinal);

      for (let shiftInd = 0; shiftInd < tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts.length; shiftInd++) {

        let partStart = tempShiftDB[dayInd].posts[postInd].parts[partInd].partStart
        let shiftStart = tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftStart

        //console.log(shiftStart);

        if (shiftStart + partStart === shiftOldLeft) {

          tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftLength = shiftLengthFinal
          tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftId = `d${dayInd}p${postInd}t${partInd}s${shiftOldLeft}w${workerId}`

          // the if here check what shift we resize passivly

        } else if (shiftStart + partStart > shiftOldLeft) {

          let sideShiftStart = tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftStart
          let sideShiftLength = tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftLength

          if (shiftOldLeft + shiftLengthFinal > sideShiftStart + partStart) {

            console.log(shiftOldLeft + shiftLengthFinal);
            console.log(sideShiftStart + partStart);

            let newSideShiftLength = sideShiftStart + sideShiftLength + partStart - shiftOldLeft - shiftLengthFinal
            let newSideShiftLeft = shiftOldLeft + shiftLengthFinal - partStart


            console.log(newSideShiftLeft);


            if (newSideShiftLength > 0) {

              let SideShiftWorkerId = tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].workerId;

              tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftStart = newSideShiftLeft
              tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftLength = newSideShiftLength
              tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd].shiftId = `d${dayInd}p${postInd}t${partInd}s${newSideShiftLeft + partStart}w${SideShiftWorkerId}`

            } else if (newSideShiftLength <= 0) {

              tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts.splice(shiftInd, 1)

              shiftInd--

            }


          }

        }

      }




    }

    //console.log(tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts);

    for (let shiftInd = 0; shiftInd < tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts.length - 1; shiftInd++) {

      let partStart = tempShiftDB[dayInd].posts[postInd].parts[partInd].partStart

      let firstShift = tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd]
      let secondShift = tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd + 1]

      // console.log(firstShift);
      // console.log(secondShift);

      if (firstShift.shiftStart + firstShift.shiftLength === secondShift.shiftStart && firstShift.workerId === secondShift.workerId) {

        tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts.push({ workerId: firstShift.workerId, shiftStart: firstShift.shiftStart, shiftLength: firstShift.shiftLength + secondShift.shiftLength, shiftId: `d${dayInd}p${postInd}t${partInd}s${firstShift.shiftStart + partStart}w${firstShift.workerId}` })

        let localShiftNum = tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts.length

        let newMergedShift = tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[localShiftNum - 1]

        tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts[shiftInd] = newMergedShift

        tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts.splice(shiftInd + 1, 1)

        tempShiftDB[dayInd].posts[postInd].parts[partInd].shifts.pop()

      }

    }


    //this.setData()

    this.setState({ shiftSet: tempShiftDB })

  }

  setData = () => {

    let obj = this.state.shiftSet
    localStorage.setItem('shiftDB', JSON.stringify(obj))

  }

  getData = () => {

    let data = localStorage.getItem('shiftDB')

    data = JSON.parse(data)

    console.log(data);

    this.setState({ shiftSet: data })

  }



  addWorker = (firstName, lastName, identification, phone, secondPhone, address, email) => {

    console.log(firstName);
    let newWorker = { id: Date.now().toString(), firstName, lastName, color: '#a55a5a' }
    console.log(newWorker);
    this.setState({ workerDB: [...this.state.workerDB, newWorker] })

  }

  render() {

    return (
      //<ContextProvider>
      <div>

        {/* <button onClick={() => this.setData()}>set Data</button>
        <button onClick={() => this.getData()}>get Data</button> */}

        <Router>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: "relative",

          }}>

            <div style={{ alignSelf: 'flex-end' }}>{this.higherBarView()}</div>



          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            position: "relative",

          }}>

            <div style={{ alignSelf: 'center' }}>{this.lowerBarView()}</div>

          </div>

          <Switch>

            <Route exact path='/planner' component={() => {
              return <Planner
                deleteMarker={this.deleteMarker}
                deleteShift={this.deleteShift}
                deleteAllShift={this.deleteAllShift}

                setResizeData={this.setResizeData}

                bringWorkerID6={this.bringWorkerID7}

                shiftSet={this.state.shiftSet}
                workerDB={this.state.workerDB}
                dayStart={this.state.dayStart}

                markerWorkerID1={this.state.markerWorkerID}


              />
            }} />

            <Route exact path='/personal' component={() => {
              return <Personal
                addWorker={this.addWorker}

                workerDB={this.state.workerDB}

              />
            }} />

            {this.state.workerDB.map((o, i) => {
              return (
                <Route exact path={`/worker${o.id}`} key={i} component={() => {
                  return <Worker
                    workerDB={this.state.workerDB}
                    workerID={o.id}
                    key={i}
                  />
                }} />
              )
            })}


            <Route exact path='/history' component={() => {
              return <Gistory

              />
            }} />

            <Route exact path='/setplanner' component={() => {
              return <SetPlan

              />
            }} />


            <Route exact path='/' component={() => {
              return <HomePage

              />
            }} />
            <Route exact path='/login' component={() => {
              return <Login
                login={this.login}
              />
            }} />
            <Route exact path='/signup' component={() => {
              return <SignUp

              />
            }} />



          </Switch>


        </Router>

      </div>
      //</ContextProvider>

    )
  }
}
