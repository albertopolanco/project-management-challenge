// importamos React, React.Component y axios
import React, { Component } from "react";
import axios from "axios";

// declaramos nuestra clase 'EditProject'
class EditProject extends Component {
// definimos constructor y super para utilizar los props que recibirá este componente (opcional)
constructor(props) {
    super(props);
// definimos nuestro state con las keys del project que estaremos editando (title y description)
    this.state = {
// ya que preveemos que recibiremos por props una variable con el project a editar, nos adelantaremos y lo llamaremos 'theProject'
    title: this.props.theProject.title,
    description: this.props.theProject.description
    };
}

// definimos un método que se encargue del submit de nuestro form de edición
handleForSubmit = event => {
// 1ro -  declaramos dos variables con los valores de nuestras keys del state (title y descripcion)
const title = this.state.title;
const description = this.state.description;

// 2do - evitamos el comportamiento default al hacer el submit de un formulario.
event.preventDefault();

// 3ro - realizamos una llamada axios a nuestra ruta PUT del back encargada de actualizar nuestros projects, y le pasamos nuestras variables antes definidas para poder actualizar.

axios
    .put(`http://localhost:4000/api/projects/${this.props.theProject._id}`, {
        title,
        description
    })
    .then(() => {
// 4to - 'then', ejecutaremos el método 'getSingleProject' declarado en el componente padre de EditProject (es decir, ProjectDetails) que nos llega a través de props como 'getTheProject'...
        this.props.getTheProject();
// ... y luego redirigimos a nuestra ruta '/projects'
        this.props.history.push("/projects");
    })
// 5to - en caso de haber un error, lo atrapamos y mostramos en consola
        .catch(error => console.log(error));
  };


// declaramos un método que se encargue de los cambios en el input de title y actualice su homónimo en el state

handleChangeTitle = event => {
    this.setState({
        title: event.target.value
    });
};

// declaramos un método que se encargue de los cambios en el input de description y actualice su homónimo en el state

handleChangeDesc = event => {
    this.setState({
        description: event.target.value
    });
};

render() {
// retornamos en el render un form que ejecute, al hacer submit, la función que se encarga de ello y que, para cada input ejecute, ante algún cambio, las funciones antes declaradas que de ello se encargan (recordar que el componente debiera ser controlado, lo que hará que el value de cada input 'venga' del valor correspondiente del state).

// por último, agregamos un input de tipo 'submit'

    return (
        <div>
            <hr />
            <h3>Edit Form</h3>
            <form onSubmit={this.handleFormSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={e => this.handleChangeTitle(e)}
                />
                <label>Description:</label>
                <textarea
                    name="description"
                    value={this.state.description}
                    onChange={e => this.handleChangeDesc(e)}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
  }
}

export default EditProject;



