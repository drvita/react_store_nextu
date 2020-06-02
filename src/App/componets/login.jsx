import React, {Component} from 'react';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <form className="mx-auto logingForm" onSubmit={this.sendForm.bind(this)} >
                <h2>Inicio de sesión</h2>
                <div className="form-group">
                    <label htmlFor="email">Correo electronico</label>
                    <input type="email" className="form-control" id="email" required 
                    name="email"
                    onChange={this.changeInput.bind(this)}
                    value={this.state.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" className="form-control" id="password" required
                    name="password"
                    onChange={this.changeInput.bind(this)}
                    value={this.state.password} />
                </div>
                <button type="submit" className="btn btn-success">Ingresar</button>
            </form>
        )
    }

    sendForm(e){
        e.preventDefault();
        
        fetch("/db/users.json",{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            let login = false;
            for(let user of data.users){
                if(user.email == this.state.email && user.password == this.state.password){
                    this.props.Login(true);
                    login = true;
                    break;
                }
            }
            if(!login){
                alert('Las credenciales no coinciden');
                this.setState({
                    email: '',
                    password: ''
                });
            }
        });
    }

    changeInput(e){
        const {name, value} = e.target; 
        this.setState({
            [name]: value
		});
    }
    
}

export default Login;