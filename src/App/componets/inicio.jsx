import React, {Component} from 'react';

class Inicio extends Component {
    constructor(){
        super()
        this.state = {
            items: [],
            car: []
        }
    }
    componentDidMount(){
        fetch("/db/items.json",{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                items: data.items
            });
        });
    }

    render() {
        return (
            <div className="jumbotron bg-light mt-4 p-2">
                <div className="row">
                    <div className="col-lg-8">
                        <h2>Catálogo de productos</h2>
                        
                    </div>
                    <div className="col-lg-4">
                        <h6>¿Que esta buscando?</h6>
                        <input type="text" name="search" 
                            placeholder="Buscar producto" 
                            onChange={this.searchItem.bind(this)} />
                    </div>
                </div>
                <div className="row pt-4">
                    { this.state.items.map(item => {
                        let img = "img/"+ item.name +".jpg";
                        let btnto = "/item";
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
                                        <a href={btnto} className="btn btn-primary btn-sm" > Ver mas... </a>
                                        <div className="btn-group ml-2" role="group">
                                            <form onSubmit={this.addCar.bind(this)}>
                                                <button className="btn btn-warning btn-sm">
                                                Añadir</button>
                                                <input type="number" name={item.name} size="2" />
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
        let item = e.target.value;
        if(item.length > 2){
            let car = this.state.items,
                s = car.find(i => i.name == name);
            console.log('item:', item,'car:', car,'s:',s);
        }
    }
    addCar(e){
        e.preventDefault();
        let x=0;
        for (let ele of e.target.elements ){
            if(ele.name != ''){
                let car = this.state.car,
                    item = car.find(i => i.name == ele.name);
                if(item){
                    let n=0;
                    for(let i of car){
                        if(i.name == item.name){
                            car[n].value = (i.value * 1) + (ele.value * 1);
                        }
                        n++;
                    }
                } else car.push({name:ele.name,value: ele.value*1});
                localStorage.setItem('car', JSON.stringify(car));
                this.setState({
                    car
                });
                e.target.elements[x].value="";
            }
            x++;
        };
    }
}

export default Inicio;