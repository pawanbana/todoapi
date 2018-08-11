//const MongoClient=require('mongodb').MongoClient;

const {MongoClient, ObjectID} =require('mongodb');




MongoClient.connect('mongodb://127.0.0.1:27017/todoapp', (err,db)=>{

if(err){
	 return console.log("unable to connect to databse");

}

console.log("connected to mongodb server");

db.collection('new-users').insertOne({

	name:'Pawan bana',age:25,completed:false
},(err,result)=>{
if(err){
return console.log("unable to do insert todo",err);

}

console.log(result.ops[0]);
})
db.close();

});

