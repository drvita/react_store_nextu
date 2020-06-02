import React, {Component, Fragment} from 'react';
import {render} from 'react-dom';
import Login from './componets/login.jsx';
import Home from './componets/home.jsx';

class App extends Component {
    constructor(){
        super();
        this.state = {
            isLoging: false
        }
    }
    static getDerivedStateFromProps(props,state){
        let ls = JSON.parse(localStorage.getItem('store'));
		if(ls){
            console.log('LocalStorage', ls.isLoging,'State',state.isLoging);
           return {
               isLoging: ls.isLoging
           };
            
		} else {
			console.log('La variable Storege, no esta configurada para la tienda');
            localStorage.setItem('store', JSON.stringify(state));
            return null;
		}
    }

    render(){
        return (
            <div className={this.getClasss()}>
                <div className="container">
                    { !this.state.isLoging 
                    ? <Login Login={this.setLogin.bind(this)} />
                    : <Home Login={this.setLogin.bind(this)} /> }
                </div>
            </div>
        );
    }

    setLogin(v){
        localStorage.setItem('store', JSON.stringify({"isLoging":v}));
        this.setState({
            isLoging: v
        });
    }
    getClasss(){
        return this.state.isLoging ? 'fondoMain' : 'fondoLoging';
    }
}

render(<App/>, document.getElementById('root'));
