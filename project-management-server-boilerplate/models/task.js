// requerimos el paquete mongoose y a su 'Schema'
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// declaramos un nuevo Schema en la constante 'taskSchema'
const taskSchema = new Schema({
    title: String,
    description: String,
    project: {type: Schema.Types.ObjectId, ref:"Project" }
  });

// utilizamos 'mongoose.model' para crear el modelo con el schema que acabamos de definir...
  const Task = mongoose.model('Task', taskSchema)


// ... y exportamos dicho modelo
  module.exports = Task;