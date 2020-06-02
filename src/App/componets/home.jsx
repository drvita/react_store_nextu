import React, {Component} from 'react';
import Inicio from './inicio.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

class Home extends Component {
    
    render() {
        return (
            <Router>
                <nav className="nav bg-light justify-content-end mb-4">
                    <Link className="nav-link" to="/"><span className="fa fa-home" /></Link>
                    <Link className="nav-link" to="/carrito"><span className="fa fa-shopping-cart" /></Link>
                    <a className="nav-link" href="#" onClick={() => this.props.Login(false)}><span className="fa fa-power-off" /></a>
                </nav>
                <Switch>
                   <Route path="/carrito">
                       Este es el carrito
                   </Route>
                   <Route path="/item">
                       Este es el item
                   </Route>
                   <Route extric path="/">
                       <Inicio />
                   </Route>
                </Switch>
            </Router>
        )
    }
}

export default Home;