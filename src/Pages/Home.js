import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BoxLoading } from 'react-loadingg';
import { BrowserRouter as Route, Link, Switch, withRouter } from "react-router-dom";
import Folder from './Folders';
import Navbar from './NavBar'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            isLoaded: false,
            visible: 5,
        }
        this.loadmore = this.loadmore.bind(this);
    }

    componentDidMount() {
        fetch('http://127.0.0.1:133/')
        .then(res=> res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                datas: json
            })
        })
    }
    

    loadmore(){
        this.setState((old)=>{
            return {visible: old.visible + 5}
        })
    }
    
    render() { 
        let {isLoaded, datas} = this.state;

        if(!isLoaded){
            return(
                <BoxLoading />
            )
        }
        else{
        return ( 
            <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                            <Switch>
                                <Link to={'/'}><a className="nav-link">Home <span className="sr-only">(current)</span></a></Link>
                                <Route exact path="/" render={props => <Home {...props}/>} />
                                </Switch>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                    </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" >Action</a>
                                    <a className="dropdown-item" >Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" >Something else here</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" >Disabled</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                                </div>
                                </nav>
            {datas.slice(0,this.state.visible).map(data => (
            <div key={data.CourseID} className="col-lg">
                <Card style={{marginTop:10}}>
                <div class="text-left">
                <Card.Header as="h5" style={{}}>{data.Category}</Card.Header>
                </div>
                <Card.Body>
                <Card.Title>{data.CourseName}</Card.Title>
                <Card.Text>
                 {data.Category}
                 </Card.Text>
                 <div class="text-right">
                 <Switch>
                 <Link to={`/folder/${data.CourseID}`} ><Button variant="primary">Watch Me!</Button></Link>
                 <Route path='/folder/:courseid' exact render={props => <Folder {...props} />}/>
                 </Switch>
                 </div>
                 </Card.Body>
                 </Card>
            </div>
            ))}
            <Button variant="info" style={{margin: 10}} onClick={this.loadmore}>Load More!</Button>
            </div>
         );
        }
    }
}
 
export default withRouter(Home);