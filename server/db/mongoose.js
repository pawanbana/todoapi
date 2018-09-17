var mongoose=require('mongoose');

mongoose.Promise=global.Promise;

mongoose.connect('mongodb://pawan:1908199p@ds261342.mlab.com:61342/nodetodoapidata',{ useNewUrlParser: true });



module.exports={
	mongoose
};