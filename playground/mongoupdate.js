//const MongoClient=require('mongodb').MongoClient;

const {MongoClient, ObjectID} =require('mongodb');




MongoClient.connect('mongodb://127.0.0.1:27017/todoapp', (err,db)=>{

if(err){
	 return console.log("unable to connect to databse");

}

console.log("connected to mongodb server");


db.collection('new-users').findOneAndUpdate({
    _id: new ObjectID('5b71eefd19b3b11fbcc03236')
},{
	$set: {
		name:"hello"
		
	},$inc: {
		age:1
	}
},{
	returnOriginal:false

}).then((docs)=>{
	console.log(docs);
});

db.close();

});

