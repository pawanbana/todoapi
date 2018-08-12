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


//delete many


/*db.collection('new-users').deleteMany({completed:false}).then((result)=>{
	console.log(result);
});*/
/*

//delete only one
db.collection('new-users').deleteOne({name:"ricky"}).then((result)=>{
	console.log(result);
});*/

// delete by id


db.collection('users').findOneAndDelete({
	_id:new ObjectID("5b6b41a2e5180918b06bc519")
}).then((docs)=>{
	console.log(docs);
});

db.close();

});

