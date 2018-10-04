const {ObjectID}=require('mongodb');
const {Todo}=require('./../../models/todo');
const {User}=require('./../../models/user');
const jwt=require('jsonwebtoken');

const useroneid=new ObjectID();
const usertwoid=new ObjectID();



const users=[{
	_id:useroneid,
	email:'andrew123@gmail.com',
	password:'sadsfdfddef',
	tokens:[{
		access:'auth',
		token:jwt.sign({_id:useroneid,access:'auth'},'abc123').toString()
	}]
},{
	_id:usertwoid,
	email:'andr123@gmail.com',
	password:'sadsfdfddef',
	tokens:[{
		access:'auth',
		token:jwt.sign({_id:usertwoid,access:'auth'},'abc123').toString()
	}]
}];



const todos =[{
	_id: new ObjectID(),
	text:'first test todo'
},{ 
	_id: new ObjectID(),
	text:'second test todo'
}];





const populatetodos =(done)=>{
	
	Todo.remove({}).then(()=>{
		return Todo.insertMany(todos);
	}).then(()=>done());
    
};


const populateusers=(done)=>{
	User.remove({}).then(()=>{
		var userone=new User(users[0]).save();
		var usertwo=new User(users[1]).save();

		return Promise.all([userone,usertwo])
	}).then(()=>done());
};

module.exports={
	todos,populatetodos,users,populateusers
}