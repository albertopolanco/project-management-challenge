import React, { Component } from "react";
import './App.css';
// importamos Switch y Route de 'react-router-dom
import { Switch, Route } from "react-router-dom";
// importamos nuestros componentes ProjectList, Navbar y ProjectDetails
import ProjectList from "./components/projects/ProjectList";
import Navbar from "./components/navbar/NavBar";
import ProjectDetails from "./components/projects/ProjectDetails"

//import AddProject from "./components/projects/AddProject";

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* renderizaremos nuestro componente 'Navbar' */}
        <Navbar />
        <Switch>
        {/* 1) uno irá a la ruta del back que muestra todos los projects (path), y utilizará al componente correspondiente a ello (component) */}
          <Route exact path="/projects" component={ProjectList} />
          {/* 2) el otro irá a la ruta que muestra el detalle de un project puntual (path), y utilizará el componente correspondiente a ello (component) */}
          <Route exact path="/projects/:id" component={ProjectDetails} />
        </Switch>
      </div>
    );
  }
}


export default App;
