var mongoose=require('mongoose'),
var Schema=mongoose.Schema

var incomeSchema=new Schema({
    category:[String],
    amount:{type:Number, default:0},
    date:{type:date},
    userId:{type:Schema.Types.ObjectId, ref:'User'}
},{timestamps:true})






var Income=mongoose.model('Income',incomeSchema);

module.exports=Income;