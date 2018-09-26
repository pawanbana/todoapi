
//==========================
//mongoose setting
//==========================



var mongoose=require('mongoose');

mongoose.Promise=global.Promise;

mongoose.connect('mongodb://pawan:1908199p@ds261342.mlab.com:61342/nodetodoapidata',{ useNewUrlParser: true });
//mongoose.connect('mongodb://127.0.0.1:27017/TodoApp',{ useNewUrlParser: true });



module.exports={
	mongoose
};