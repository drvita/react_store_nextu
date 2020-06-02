import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Inicio extends Component {
    constructor(){
        super()
        this.state = {
            items: [],
            car: [],
            show: []
        }
    }
    componentDidMount(){
        let car = JSON.parse(localStorage.getItem('car')), 
            carCont=0,
            items = JSON.parse(localStorage.getItem('items')),
            itemsCount=0;
        
        if(typeof car === 'object' && car) carCont =  Object.keys(car).length;
        else car = [];
        if(typeof items === 'object' && items) itemsCount =  Object.keys(items).length;
        else items = [];
        
        if(!itemsCount){
            fetch("/db/items.json",{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('items', JSON.stringify(data.items));
                this.setState({
                    items: data.items,
                    show: data.items,
                    car: car
                });
            });
        } else {
            this.setState({
                items: items,
                show: items,
                car: car
            });
        }
    }

    render() {
        return (
            <div className="jumbotron bg-light mt-4 p-2">
                <div className="row">
                    <div className="col-lg-8">
                        <h2>Catálogo de productos</h2>
                        
                    </div>
                    <div className="col">
                        <h6>¿Que esta buscando?</h6>
                        <input type="text" name="search" 
                            placeholder="Buscar producto" 
                            onChange={this.searchItem.bind(this)} />
                    </div>
                </div>
                <div className="row pt-4">
                    { this.state.show.map(item => {
                        let img = "img/"+ item.name +".jpg";
                        let btnto = "/item/"+ item.name;
                        return (
                            <div className="col-lg-3 pt-2" key={item.name}>
                                <div className="card">
                                    <img className="card-img-top" src={img} alt={item.name} />
                                    <div className="card-body">
                                        <p className="card-text">
                                            <strong>{item.name}</strong><br/>
                                            <span>Precio:</span> {item.price} {item.und}<br/>
                                            <span>Unidades disponibles:</span> {item.stock}<br/>
                                        </p>
                                        <Link to={btnto} className="btn btn-primary btn-sm" > Ver mas... </Link>
                                        <div className="btn-group ml-2" role="group">
                                            <form onSubmit={this.addCar.bind(this)}>
                                                <button className="btn btn-warning btn-sm">
                                                Añadir</button>
                                                <input type="number" name={item.name} size="2" style={{width:40}} />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    searchItem(e){
        let item = e.target.value,
            re = new RegExp(item),
            car = this.state.items,
            newShow = [];

        if(item.length > 2){
            for(let i of car){
                if(i.name.match(re)) newShow.push(i);
            }
            this.setState({
                show: newShow
            });
            console.log('item:', item,'re', re,'newShow',newShow);
        } else if(item.length == 0){
            this.setState({
                show: car
            });
        }
    }
    addCar(e){
        e.preventDefault();
        let x=0, carCont=0;
        for (let ele of e.target.elements ){
            if(ele.name != ''){
                let car = this.state.car,
                    item = {},
                    items = this.state.items,
                    p = items.find(i => i.name == ele.name);
                
                if(typeof car === 'object' && car) carCont =  Object.keys(car).length;
                
                if(carCont){
                    item = car.find(i => i.name == ele.name);
                    if(typeof item === 'undefined') item = {};
                    if(Object.keys(item).length){
                        let n=0;
                        for(let i of car){
                            if(i.name == item.name){
                                car[n].value = (i.value * 1) + (ele.value * 1);
                            }
                            n++;
                        }
                    } else car.push({
                            name:ele.name,
                            value: ele.value*1,
                            price:p.price*1
                        });
                } else {
                    car = [{
                        name:ele.name,
                        value: ele.value*1,
                        price:p.price*1
                    }]
                }
                
                localStorage.setItem('car', JSON.stringify(car));
                this.setState({
                    car
                });
                e.target.elements[x].value="";
            }
            x++;
        }
        this.props.iFreload();
    }
}

export default Inicio;