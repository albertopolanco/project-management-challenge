// importamos React, React.Component, axios, y traemos de react-router-dom a 'Link'.
import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';


class ProjectDetails extends Component {
    // 1ro - definimos nuestra clase ProjectDetails
    // 2do - definimos su constructor con 'props' como argumento (ya que pasaremos los 'details' desde un componente padre). Esto es opcional.
    constructor(props){
    // 3ro - utilizamos el método 'super' para utilizar dichas 'props'
    super(props);
    // 4to - definimos el state en un ppio. como un objeto vacío.
    this.state = {};
}

// declaramos al método que nos garantice que nuestra función encargada de hacer la llamada a BDD (getSingleProject) se ejecute al montarse el componente
componentDidMount(){
    this.getSingleProject();
}

componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  getSingleProject = () => {
    // 1ro - desestructuramos params de nuestro objeto this.props.match
    const { params } = this.props.match;
    // 2do - hacemos una llamada axios a nuestra ruta del backend encargada de mostrar cada projecto individualmente
    axios
        .get(`http://localhost:4000/api/projects/${params.id}`)
    // 3ro - 'then', con la respuesta, actualizamos nuestro state
        .then(responseFromApi => {
            const theProject = responseFromApi.data;
            this.setState(theProject);
        })
    // 4to - atrapamos los errores, en caso de que hubiese, y los mostramos por consola.
        .cath(err => {
            console.log(err)
        });
  };

render(){
    // retornamos en el render al title y description que tenemos en nuestro state (actualizado por nuestro método getSingleProject) y usamos al componente 'Link' para ir hacía nuestra ruta '/projects'
    return (
        <div>
          <h1>{this.state.title}</h1>
          <p>{this.state.description}</p>
          <Link to={"/projects"}>Back to projects</Link>
        </div>
      );
    }
  }
  
  export default ProjectDetails;