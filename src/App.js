import React, { Component } from 'react';
import './App.css';
import Home from './Pages/Home'
import Navbar from './Pages/NavBar'
import Folder from './Pages/Folders'
import Video from './Pages/Videos'
import Videoplayer from './Pages/Videoplayer'
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";

class App extends Component {
  render(){
  return (
    <div style={{textAlign: 'center'}}>
    <Router>
    <Switch>
        <Route exact path="/" render={props => <Home {...props}/>} />
        <Route exact path='/folder/:courseid'  render={props => <Folder {...props}/>} />
        <Route exact path='/video/:folderid'  render={props => <Video {...props}/>} />
        <Route exact path='/videoplay/:folderid'  render={props => <Videoplayer {...props}/>} />
        </Switch>
        </Router>
    </div>
  );}
}

export default App;
