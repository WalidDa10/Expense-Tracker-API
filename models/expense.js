const mongoose = require( 'mongoose');
const { Schema } = mongoose;

const expenseSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      name: { type: String , require: true },
      category:{type : String , require:false },
      descrition :{ type: String, require : false },
      createdAt :{type: Date , default: Date.now }
})

module.exports = mongoose.model('Expense',expenseSchema)