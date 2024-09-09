const mongoose = require('mongoose');

const categorySchema= new mongoose.Schema({
name:{
    type:String,
    require:true,
    minlength:4,
},
toys:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "toys"
}],
})
module.exports=mongoose.model('categories',categorySchema);
