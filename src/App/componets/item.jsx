import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props){
        super(props)
        this.state = {
            img: '',
            name: '',
            price: '',
            und: 'KG',
            stock: 0
        }
    }
    static getDerivedStateFromProps(props,state){
        let items = JSON.parse(localStorage.getItem('items')),
            {id} = props.match.params;

        for(let item of items){
            if(item.name == id){
                return {
                    img: "/img/"+ id +".jpg",
                    name: id,
                    price: item.price,
                    und: item.und,
                    stock: item.stock * 1
                }
            }
        }
        return null;
    }

    render(){
        return(
            <div className="jumbotron bg-light mt-4 p-2">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="text-uppercase"> {this.state.name} </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <img src={this.state.img} alt={this.state.name} className="img-thumbnail" />
                    </div>
                    <div className="col">
                        <p>
                            <span>Precio:</span> {this.state.price} / {this.state.und} <br/>
                            <span>Unidades disponibles:</span> {this.state.stock}
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
}

export default Item;