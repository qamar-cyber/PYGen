import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BoxLoading } from "react-loadingg";
import Iframe from 'react-iframe'

import {
  BrowserRouter as Route,
  Switch,
  Link,
  withRouter
} from "react-router-dom";
import ReactPlayer from "react-player";




class Videoplayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      isLoaded: false,
    };
  }

  componentDidMount(props) {
    const { folderid } = this.props.match.params;
    fetch(`http://127.0.0.1:133/videoplayer/${folderid}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          datas: json
        });
      });
  }


  render() {
    let { isLoaded, datas } = this.state;

    if (!isLoaded) {
      return <BoxLoading />;
    } else {
      return (
        <div>
        {datas.map(datas => (
        <Iframe src={"https://www.youtube.com/embed/Tqsz6fjvhZM"}
        width="90%"
        height="580px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allowFullScreen
        />
            ))}
        </div>
      );
    }
  }
}

export default withRouter(Videoplayer);
