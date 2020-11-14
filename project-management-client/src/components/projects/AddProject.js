import React, { Component } from 'react';
import axios from 'axios';

class AddProject extends Component {
    //definimos nuestro constructor con props (no es necesario), y definimos un state con dos keys (title y description) con valor de String vacío.
    constructor(props){
        super(props);
        this.state = { title: "", description: "" };
    }
    // definimos la función 'handleFormSubmit' para manipular el submit del formulario:
    handleFormSubmit = (event) => {
        // 1ro - evitamos el comportamiento por default que genera el evento 'submit'
        event.preventDefault();
        // 2do - definimos las variables que necesitamos para obtener los valores del state (title y description)
        const title = this.state.title;
        const description = this.state.description;
        // 3ro - utilizamos axios, y su método "post" para conectar con nuestra ruta del backend que crea un nuevo project. Le pasamos un objeto con las dos variables antes creadas.
        axios
          .post("http://localhost:4000/api/projects", { title, description })
          .then(() => {
            this.props.getData()  
            // 4to - volvemos a setear nuestros valores en el state a valor inicial
            this.setState({title: "", description: "" });
          })
          // 5to - de haber errores, los atrapamos en un catch y mostramos el error en consola.
          .catch(err => console.log(err));
    };
    // definimos la función 'handleChange' para manipular los cambios en los inputs del formulario
    handleChange = (event) => {
        // 1ro - declaramos variables para los valores name y value del event.target
        const {name, value} = event.target;
        // 2do - seteamos para con cada uno de ellos, su homónimo en el state.
        this.setState( { [name]: value });
    };
    render() {
        // 1ro- devolvemos un form, y utilizamos la función para manipular el submit del form (handleFormSubmit)
        // 2do - agregamos al form inputs que estén vinculados con su homónimo en el state (pista: componente controlado), su 'value' y utilizamos el método para manipular los cambios (handleChange)
        // 3ro - agregamos finalmente un input de tipo 'submit' para enviar la información.
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Title:</label>
                    <input type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)}/>
                    <label>Description:</label>
                    <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}
export default AddProject;