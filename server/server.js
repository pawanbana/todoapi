var express= require('express');
var bodyparser=require('body-parser');
const {ObjectID}=require('mongodb');


var {mongoose}=require("./db/mongoose.js");

var {Todo}=require("./models/todo.js");

var {user}=require("./models/user.js");

var app =express();
const port =process.env.PORT||3000

app.use(bodyparser.json());

app.post('/todos',(req,res)=>{
 
   var todo=new Todo({
   	text:req.body.text,
   	completed:req.body.completed
   });

   todo.save().then((doc)=>{
     res.send(doc);
   },
   (e)=>{
   res.status(400).send(e);
   });

});


app.get('/todos',(req,res)=>{
   
   Todo.find().then((todos)=>{
         res.send({todos});
   },(e)=>{
      console.log("there might be an error");
      
   });
   

});

app.get('/todos/:id',(req,res)=>{
   
   var id=req.params.id;
   if(!ObjectID.isValid(id)){

   return res.status(404).send("id is not valid");

   }
 
  Todo.findById(id).then((todo)=>{
  	if(!todo){
      return res.status(404).send("data is not present");
  	}
        res.send(todo);
  
  }).catch((e)=>{
  	res.status(400).send(e);
  });

});


app.listen(port,()=>{
	console.log("started up at",port);
});


module.exports={app};



