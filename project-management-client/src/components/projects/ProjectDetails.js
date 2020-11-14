// importamos React, React.Component, axios, y traemos de react-router-dom a 'Link'.
import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
//importamos nuestro nuevo componente 'EditProject'
import EditProject from './EditProject';
// importamos el componente AddTask
import AddTask from '../tasks/AddTask';


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

    // agregamos método para renderizar formulario de edit
    renderEditForm = () => {
        if(!this.state.title){
    // validamos que, si no existe key 'title' en nuestro state, deberiamos ejecutar el método que solicita los detalles del project individual
            this.getSingleProject();
        } else {
    // retornamos el componente EditProject y le pasamos por props el project a editar (theProject), a getTheProject(ver componente EditProject) y al resto de props del componente ProjectDetails
            return<EditProject theProject={this.state} getTheProject={this.getSingleProject} {...this.props} />
        }
    }

    // declaramos método de borrado de proyecto
    deleteProject = () => {
    // traemos valor de params del objeto que llega por props llamado 'match'
        const { params } = this.props.match;
    // realizamos una llamada axios a la ruta de nuestro backend encargada de borrar un project puntual
        axios.delete(`http://localhost:4000/api/projects/${params.id}`)
    // 'then', redirigimos haciendo un push al objeto 'history' que llega por props con la ruta '/projects'
        .then( () => {
            this.props.history.push('/projects');    {/* <<<< this line */}
        })
    // en caso de haber error, lo atrapamos y mostramos en consola
        .catch((err) => {
            console.log(err)
        })
    }

      // defino método para renderizar el formulario de addTask
  renderAddTaskForm = () => {
    if(!this.state.title){
        // si no existe this.state.title, llamo al método encargado de 'traer' el project individual
        this.getSingleProject();
      } else {
        // pasamos el project y el método getSingleProject() como props al componente AddTask.
        return <AddTask theProject={this.state} getTheProject={this.getSingleProject} />
      }
  }


render(){
    // retornamos en el render al title y description que tenemos en nuestro state (actualizado por nuestro método getSingleProject) y usamos al componente 'Link' para ir hacía nuestra ruta '/projects'
    return (
    // agregamos al return a nuestro 'renderEditForm' dentro de un <div>
        <div>
          <h1>{this.state.title}</h1>
          <p>{this.state.description}</p>
          {/* mostramos el heading de task sólo si hay tasks */}
            { this.state.tasks && this.state.tasks.length > 0 && <h3>Tasks</h3> }
            {/* mapeamos el array de tasks y...*/}
            { this.state.tasks && this.state.tasks.map((task, index) => {
            return(
                <div key={ index }>
                {/* ... hacemos que cada titulo sea un link a la página de detalle de dicha task */}
                    <Link to={`/tasks/${task._id}`}>
                        { task.title }
                    </Link>
                </div>
            )

        }) }
          <div>{this.renderEditForm()}</div>    {/* <<<< this line */}
          {/* ---> agregamos botón que, onClick, llame a la función que borra el project  <--- */}
          <button onClick={() => this.deleteProject()}>Delete project</button> {/* <<<< this line */}
          <br/>
          <div>
          {/* llamamos al método renderAddTaskForm*/}
          {this.renderAddTaskForm()} 
          <br/><br/><br/><br/><br/>
          </div>
          <Link to={"/projects"}>Back to projects</Link>
        </div>
      );
    }
  }
  
  export default ProjectDetails;