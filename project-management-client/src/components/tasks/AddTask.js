// importamos React, React.Component y axios
import React, { Component } from 'react';
import axios from 'axios';

// declaramos nuestro componente AddTask, con su constructor y super (opcional), que recibirán props del componente padre
class AddTask extends Component {
    constructor(props) {
      super(props);
      // definimos el state con el title y la description como strings vacíos, y un valor 'isShowing' que nos será util para mostrar/ocultar el form
      this.state = { title: "", description: "", isShowing: false}   // will help us to toggle addtask form
    }
  
    // definimos el método que se encarga de gestionar lo que sucede ante el submit del form
    handleFormSubmit = (event) => {
      // prevenimos el comportamiento predefinido del evento submit
      event.preventDefault();
      // definimos tres variables: title y description a partir de la información que viene del state, y projectID como el id del project al cual perteneceran las task por crear, el cual llegará por props. (es importante saber que los nombres de las variables son importantes ya que deben coincidir con las definidas en la ruta del backend)
      const title = this.state.title;
      const description = this.state.description;
      const projectId = this.props.theProject._id;   // <== we need to know to which project the created task belong, so we need to get its 'id' // it has to be the'id' because we are referencing project by its id in the task  model on the server side ( project: {type: Schema.Types.ObjectId, ref: 'Project'})
  
      // realizamos la llamada axios a la ruta POST del backend encargada de crear nuevas task, y pasamos las anteriores tres variables 
      // { title, description, projectID } => this is'req.body' that will be received on the server side in this route, so the names have to match
      axios.post("http://localshost:4000/api/tasks", {title, description, projectID})

      // 'then' llamamos al método 'getTheProject' que recibimos desde props a través de nuestro componente padre
        .then( () => {
      // after submitting the form, retrieve project one more time so the new task is displayed as well
            this.props.getTheProject(),

      // reiniciamos los valores de state a strings vacíos para volver al comienzo
            this.setState({title: "", description: ""});
        })
      // en caso de haber error, lo atrapamos y mostramos por consola.
        .catch( error => console.log(error) )
    };
  
  
    //definimos un método que se encargue de controlar los cambios en los inputs y actualizar los valores en el state
    handleChange = (event) => {
        const {name, value} =event.target;
        this.setState({[name]: value});
    };
  
  
    // creamos un método que se encargue de alternar el valor del booleano que definimos en nuestro state, el cual usaremos para mostrar/ocultar el form
    toggleForm = () => {
        if(!this.state.isShowing){
            this.setState({isShowing: true});
        } else {
            this.setState({isShowing: flase});
        }
    };
  
    // definimos un método que controle lo que se mostrará cuando el valor this.state.isShowing sea verdadero (es decir, el formulario de Add Task)
  
    showAddTaskForm = () => {
  
      // en caso de que el valor de isShowing sea verdadero, mostramos el formulario, que tendra:
      // en cada input, un onChange que invoque a la función asignada a controlar el valor de dicho input y con él actualizar el valor del state; y un value, que se condiga con su homónimo del state.
  
      if (this.state.isShowing) {
        return (
          <div>
            <h3>Add Task</h3>
            <form onSubmit={this.handleFormSubmit}>
            <label>Title:</label>
            <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
            <label>Description:</label>
            <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
            <input type="submit" value="Submit" />  
            </form>
          </div>
        );
      }
    };
  
    render() {
      // renderizamos un button que, onClick, oculta o muestra el form, y llamamos a nuestro método 'showAddTaskForm'
      return (
        <div>
            <hr />
            <button onClick={() => this.toggleForm()}> Add task </button>
            { this.showAddTaskForm() }
        </div>
      );
    }
  }
  
  export default AddTask;