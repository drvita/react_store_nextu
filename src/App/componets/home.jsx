import React, {Component} from 'react';
import Inicio from './inicio.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Item from './item.jsx';
import Car from './car.jsx';

class Home extends Component {
        
    render() {
        let car = JSON.parse(localStorage.getItem('car')), carCont=0;
        
        if(typeof car === 'object' && car){
            carCont =  Object.keys(car).length;
        } else {
            car = [];
            localStorage.setItem('car', JSON.stringify(car));
        }
        
        return (
            <Router>
                <nav className="nav bg-light justify-content-end mb-4">
                    <Link className="nav-link" to="/"><span className="fa fa-home" /></Link>
                    <Link className="nav-link" to="/carrito">
                        <span className="fa fa-shopping-cart" />
                        {carCont > 0 ? <span className="badge badge-pill badge-primary"> {carCont} </span> : ''}
                    </Link>
                    <a className="nav-link" href="#" onClick={() => this.props.Login(false)}><span className="fa fa-power-off" /></a>
                </nav>
                <Switch>
                   <Route path="/carrito" component={Car} />
                   <Route path="/item/:id?" component={Item} />
                   <Route extric path="/" render={(props) => <Inicio {...props} iFreload={this.reloadPage.bind(this)} />} />
                </Switch>
            </Router>
        )
    }
    reloadPage(){
        this.forceUpdate();
    }
}

export default Home;