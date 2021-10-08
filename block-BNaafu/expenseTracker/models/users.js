var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcyrpt=require('bcrypt')

var userSchema= new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String,min:5,required:true},
    age:{type:Number, required:true},
    phone:{type:String,required:true},
    country:{type:String,}
},{timestamps:true})

userSchema.pre('save',function(next){
    if(this.password && this.isModified('password')){
      bcrypt.hash(this.password,10,(err,hashed)=>{
          if(err) return next(err);
          this.password=hashed;
          return next();
      })
    }
    else{
        next()
    }
    
})

userSchema.methods.verifyPassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,result)=>{
        return cb(err,result)
    })
}

var User=mongoose.model('User',userSchema);

module.exports=User;

