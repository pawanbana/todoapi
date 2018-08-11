//const MongoClient=require('mongodb').MongoClient;

const {MongoClient, ObjectID} =require('mongodb');




MongoClient.connect('mongodb://127.0.0.1:27017/todoapp', (err,db)=>{

if(err){
	 return console.log("unable to connect to databse");

}

console.log("connected to mongodb server");
/*
db.collection('new-users').find({
	_id:new ObjectID("5b6ec70a051eba00e0dabc1c")
}).toArray().then((docs)=>{
 console.log('todos');
 console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
	console.log('unable to fetch',err);
});*/



db.collection('new-users').find().count().then((count)=>{
 console.log('todos count',count);
// console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
	console.log('unable to fetch',err);
});
db.close();

});

