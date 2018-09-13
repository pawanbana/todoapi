const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {user}=require('./../server/models/user');


var id ='5b9433ddf2152131f49b6b72';
var uid='5b772a3d1ccc7511fc932e3c';


if(!ObjectID.isValid(id)){
	console.log("id not valid");

}

if(!ObjectID.isValid(uid)){
	console.log("user id is not correct ");

}

Todo.find({
	_id: id
}).then((todos)=>{
	if(todos.length==0){
		return console.log('item not there ');
	}
	console.log('Todos simple',todos);
});



Todo.findOne({
	_id: id
}).then((todo)=>{
	if(!todo){
		return console.log('its not present')
	}
	console.log('Todos find one',todo);
});


Todo.findById(id).then((todo)=>{
	if(!todo){
		return console.log('id not found');
	}
	console.log("todos by id",todo);
}).catch((e)=>{
	console.log('id is not correct');
});

console.log("====================");
console.log("====================");

user.find({
	_id: uid
}).then((users)=>{
	if(users.length==0){
		return console.log("user is not there ");
	}
	console.log("simple users is ",users);

});


user.findOne({
	_id:uid
}).then((user)=>{
	if(!user){
		return console.log("no user present");
	}
	console.log("the one user is ",user);
});

user.findById(uid).then((user)=>{
	if(!user){
		return console.log("no user is present");
	}

	console.log("user by id is ",user);
});