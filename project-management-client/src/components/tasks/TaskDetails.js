// importamos React, React.Component y axios
import React, { Component } from 'react';
import axios from 'axios';

// definimos nuestro componente TaskDetails, su constructor y super (opcional), los cuales recibiran 'props' desde su componente padre
class TaskDetails extends Component {
    constructor(props) {
      super(props);
      // definimos nuestro state por el momento como un objeto vacío.
      this.state = {};
    }
  
    // 1ro - nos aseguramos que se ejecute el método que obtiene la task individual tan pronto como se monte el componente
    componentDidMount(){
        this.getTheTask();
    }
  
    // 2do - definimos el método que obtiene la task individual
    getTheTask = () => {
      // 2.1 - definimos 'params' a partir del objeto 'match' que tramos por props.
      const { params } = this.props.match;
      // 2.2 - realizamos una llamada axios GET a nuestra ruta del backend creada para traer la información de una task individual
      axios.get(`http://localhost:4000/api/tasks/${params.taskID}`)
      // 2.3 - 'then', con la respuesta, seteamos el valor de nuestro state con el objeto que recibimos como respuesta.
      .then(responseFromApi => {
          const theTask = responseFromaApi.data;
          this.setState(theTask)
      })
      // 3ro - en caso de que hubiese un error, lo atrapamos y mostramos por consola.
      .catch((err) =>{
          console.log(err)
      })
    };
  
    render() {
  
      // por último, retornamos en el render el detalle del task, con tu title, description, y un button que nos permita regresar a la página anterior, utilizando el objeto 'history' que recibimos por props (pista, utilizar el 'onClick' para ejecutar el método 'goBack' de history.)
      return (
        <div>
          <h3>TASK DETAILS</h3>
          <h2>{this.state.title}</h2>
          <p>{this.state.description}</p>
          {/* To go back we can use react-router-dom method `history.goBack()` available on `props` object */}
          <button onClick={this.props.histoy.goBack}>Go back</button>
        </div>
      );
    }
  }
  
  export default TaskDetails;