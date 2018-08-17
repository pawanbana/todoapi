var mongoose=require('mongoose');
var user =mongoose.model('user',{

	Email:{
		type:String,
		required:true,
		trim:true,
		minlength:2

	},
	password:{
		type:Number,
		required:true,
		minlength:3
	}


});




module.exports={user};