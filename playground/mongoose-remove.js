const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {user}=require('./../server/models/user');



/*
Todo.remove({}).then((results)=>{
   console.log(results);
});
*/

Todo.findByIdAndRemove('5ba3f5b0ec73281354a7026f').then((todo)=>{
 console.log(todo);
});


Todo.findOneAndRemove({}).then((todo)=>{
 console.log("todo is removed");
});
