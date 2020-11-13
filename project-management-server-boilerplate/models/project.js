// requerimos el paquete mongoose y a su 'Schema'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// declaramos un nuevo Schema en la constante 'projectSchema'
const projectSchema = new Schema({
    title: String,
    description: String,
    task: [{type: Schema.Types.ObjectId, ref:"Task" }]
  });


  // utilizamos 'mongoose.model' para crear el modelo con el schema que acabamos de definir...
  const Project = mongoose.model('Project', projectSchema);

  // ... y exportamos dicho modelo
  module.exports = Project;