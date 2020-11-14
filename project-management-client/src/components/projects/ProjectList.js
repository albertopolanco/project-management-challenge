// importamos React, React.Component, axios y el objeto 'Link' de react-router-dom
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// además, importamos a nuestro componente AddProject

import AddProjectList from "./AddProject";

// 1ro - definiremos nuestro componente como componente de clase. Definiremos constructor y super (opcional).

class ProjectList extends Component {
    constructor() {
        super();

        //2do - definiremos dentro del state una variable igual a un array vacío, que luego utilizaremos para nuestros projectos

        this.state = { listOfProjects: [] };
    }

    //3ro - definiremos un método que traiga todos nuestros projects:

    getAllProjects = () => {

        // 3.1 - hacemos una llamada axios a la ruta que creamos específicamente para esa tarea, que 'traiga' nuestros projects
        // 3.2 - 'then' utilizaremos la respuesta de dicha llamada para poblar la key que creamos en nuestro state.

        axios.get(`http://localhost:4000/api/projects`).then(responseFromApi => {
            this.setState({
                listOfProjects: responseFromApi.data
            });
        });
    };


    // 4to - utilizamos un lifecycle method para asegurarnos que el pedido de todos los projects se realice tan pronto como se monte el componente.

    componentDidMount() {
        this.getAllProjects();
    }

    render() {

        //5to - renderizamos un mapeo de nuestra lista de proyectos y, para cada uno de ellos, usamos 'Link' para dirigir al usuario a la página del detalle de cada project (utilizaremos aquí la ruta que creamos para dicho fin)
        //6to - Llamamos a nuestro componente 'AddProject' y le pasamos por props el método que definimos para traer todos nuestros projects.

        return (
            <div>
                <div>
                    {this.state.listOfProjects.map(project => {
                        return (
                            // usamos el '_id' de cada project como 'key'
                            <div key={project._id}>
                                <Link to={`/projects/${project._id}`}>
                                    <h3>{project.title}</h3>
                                    </Link>
                                    {/*  agregamos una visualización de las tareas que existen a través de un mapeo de las tasks de cada project, y lo retornamos dentro de un <ul> (no olvidar la 'key')   */}
                                    <ul>
                                        {project.tasks.map((task, index) => {
                                            return <li key={index}>{task.title}</li>
                                        })}
                                    </ul>
                                    <p style={{maxWidth: '400px'}} >{project.description} </p>
                            </div>
                        )})
                    }
                </div>
                <div>
                    <AddProject getData={() => this.getAllProjects()} /> {/* <== !!! */}
                </div>
            </div>
        );
    }
}

export default ProjectList;