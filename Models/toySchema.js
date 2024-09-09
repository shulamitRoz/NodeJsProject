const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  prodDate: {
    type: Date,
    default: Date.now
  },
  numberOfPlayers: {
    type: Number,
    min: 1
  },
  ageOfPlayers: {
    type: String,
  },
  price: {
    type: Number,
    min: 1,
    max: 3000
  },
  company: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z]{2,}\d*$/.test(v);
      },
      message: props => `${props.value} is not a valid company name!`
    }
  },
  goalsOfTheGame: {
    type: [String]
  },
  categoryId:{
    type: mongoose.Schema.Types.ObjectId, ref: "categories"
  }
});
module.exports=mongoose.model('toys',toySchema);

