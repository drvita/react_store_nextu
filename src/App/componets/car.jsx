import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';

class Car extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let car = JSON.parse(localStorage.getItem('car')), total = 0;
        return(
            <div className="jumbotron bg-light mt-4 p-2">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="text-uppercase"> Carrito de compras </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <ul className="list-group">
                        {car.map(item => {
                            let img = "/img/"+ item.name +".jpg",
                                subtotal = item.value * item.price;
                                total += subtotal;
                            return (
                                <li className="list-group-item" key={item.name} >
                                    <div className="d-flex justify-content-between">
                                        <div className="mb-1">
                                        <img src={img} alt={item.name} className="img-thumbnail" style={{width:90}} />
                                        </div>
                                        <div className="mb-2">
                                            <strong>{item.name}</strong><br/>
                                            <span>Cantidad:</span> {item.value}
                                        </div>
                                    </div>
                                    <p className="mb-1">
                                        <strong>Subtotal:</strong> ${subtotal}
                                    </p>
                                </li>
                            );
                        })}
                        </ul>
                    </div>
                    <div className="col">
                        <p>
                            <span>Total: ${total} </span>
                        </p>
                        <p>
                            <button className="btn btn-danger" onClick={this.deleteCar} >
                                Eliminar carrito
                            </button>
                            <button className="btn btn-primary" onClick={this.payCar} >
                                Pagar
                            </button>
                        </p>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <Link to="/" className="btn btn-dark btn-sm">Regresar</Link>
                    </div>
                </div>
            </div>
        );
    }

    payCar(){
        let items = JSON.parse(localStorage.getItem('items')),
            itemsCount=0,
            car = JSON.parse(localStorage.getItem('car')),
            carCount=0, ix=0;

        if(typeof car === 'object' && car) carCount =  Object.keys(car).length;
        else car = [];
        if(typeof items === 'object' && items) itemsCount =  Object.keys(items).length;
        else items = [];

        if(carCount){
            for(let item of items){
                for(let c of car){
                    if(item.name == c.name){
                        items[ix].stock -= c.value;
                    }
                }
                ix++;
            }
            localStorage.setItem('items', JSON.stringify(items));
        }
        localStorage.removeItem("car");
        window.location.href = '/';
    }
    deleteCar(){
        localStorage.removeItem("car");
        window.location.href = '/';
    }
}

export default Car;