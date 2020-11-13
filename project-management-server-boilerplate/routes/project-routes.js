const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Project = require("../models/project");
const Task = require("../models/task");

// GET route => para obtener todos los projects
router.get('/projects', (req, res, next) => {
    Project.find().populate('tasks')
      .then(allTheProjects => {
        res.json(allTheProjects);
      })
      .catch(err => {
        res.json(err);
      })
  });
    //  1ro - utilizamos la referencia a nuestro modelo de projects;
    
    
    //  2do - usamos el método find() para recuperar TODOS los projects y populamos el campo 'tasks'
    
    
    //  3ro - utilizamos una promesa de Javascript (o async/await) para obtener una respuesta de nuestra BDD y la recuperamos como un objecto json.
    
    
    //  4to - atrapamos, si los hay, los errores con un catch en forma de json.
    
 



  


// POST route => to create a new project

// POST route => para crear un nuevo project
router.post("/projects", (req, res, next) => {
    // utilizamos el método create de mongoose y pasamos los parámetros del body para crear nuestro nuevo 'project' y guardarlo en BDD.
    
    Project.create({
      // datos provenientes del body
        title: req.body.title,
        description: req.body.description,
        task: []

    })
    // devolvemos la respuesta en forma de json
      .then(response => {
          res.json(response)
      })
      

      // atrapamos el error y lo devolvemos en forma de json
      .catch(err => {
          res.json(err)
      });
      
      
  });


// GET route => to get a specific project/detailed view
router.get('/projects/:id', (req, res, next)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }


    // our projects have array of tasks' ids and
  // we can use .populate() method to get the whole task objects

  Project.findById(req.params.id).populate('tasks')
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.json(err);
  })
})
// PUT route => to update a specific project
router.put('/projects/:id', (req, res, next)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Project.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.json({ message: `Project with ${req.params.id} is updated successfully.` });
      })
      .catch(err => {
        res.json(err);
      })
  })

// DELETE route => to delete a specific project

router.delete('/projects/:id', (req, res, next)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Project.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ message: `Project with ${req.params.id} is removed successfully.` });
      })
      .catch( err => {
        res.json(err);
      })
  })

module.exports = router;
