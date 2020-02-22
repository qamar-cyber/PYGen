import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BoxLoading } from "react-loadingg";
import Videoplayer from './Videoplayer';

import {
  BrowserRouter as Route,
  Switch,
  Link,
  withRouter
} from "react-router-dom";




class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      isLoaded: false,
      visible: 5,
    };
    this.loadmore = this.loadmore.bind(this);
  }

  componentDidMount(props) {
    const { folderid } = this.props.match.params;
    fetch(`http://127.0.0.1:133/video/${folderid}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          datas: json
        });
      });
  }

  loadmore() {
    this.setState(old => {
      return { visible: old.visible + 5 };
    });
  }


  render() {
    let { isLoaded, datas } = this.state;

    if (!isLoaded) {
      return <BoxLoading />;
    } else {
      return (
        <div>
          {datas.slice(0, this.state.visible).map(data => (
            <div key={data.VideoID} className="col-lg">
              <Card style={{ marginTop: 10 }}>
                <div class="text-left">
                  <Card.Header as="h5" style={{}}>
                    {data.FolderID}
                  </Card.Header>
                </div>
                <Card.Body>
                  <Card.Title>{data.VideoName}</Card.Title>
                  <Card.Text>{data.FolderName}</Card.Text>
                  <div class="text-right">
                  <Link to={`/videoplay/${data.VideoID}`} ><Button variant="primary">Watch Me!</Button></Link>
                 <Route path='/videoplay/:folderid' exact render={props => <Videoplayer {...props} />}/>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
          <Button variant="info" style={{ margin: 10 }} onClick={this.loadmore}>
            Load More!
          </Button>
        </div>
      );
    }
  }
}

export default withRouter(Video);
