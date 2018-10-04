//===============================
//server start
//===============================

const _ =require('lodash');
var express= require('express');
var bodyparser=require('body-parser');
const {ObjectID}=require('mongodb');


var {mongoose}=require("./db/mongoose.js");

var {Todo}=require("./models/todo.js");

var {User}=require("./models/user.js");
var{authenticate}=require('./middleware/authenticate');



//================================

var app =express();
const port =process.env.PORT||3000

app.use(bodyparser.json());

//=================================

//Routes 

//===========================================
 //=========================================
    // Routes for Todos
     //Post route
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

     //Get Route
			app.get('/todos',(req,res)=>{
			   
			   Todo.find().then((todos)=>{
			         res.send({todos});
			   },(e)=>{
			      console.log("there might be an error");
			      
			   });
			   

			});
     //Get By id route
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

      //Delete route
			app.delete('/todos/:id',(req,res)=>{
				 var id=req.params.id;
				if(!ObjectID.isValid(id)){

			   return res.status(404).send("id is not valid");

			   }

			   Todo.findByIdAndRemove(id).then((todo)=>{
			      if(!todo){
			      	res.send("no item deleted");
			      	return console.log("no item is deleted");

			      }

			      res.send({todo});
			      console.log(todo);

			   }).catch((e)=>{
			  	res.status(400).send(e);
			  });

			});


       //update route
			app.patch('/todos/:id',(req,res)=>{
				var id =req.params.id;
				var body= _.pick(req.body, ['text','completed']);

				if(!ObjectID.isValid(id)){

			   return res.status(404).send("id is not valid");

			   }

			   if(_.isBoolean(body.completed)&& body.completed){
			        body.completedAt = new Date().getTime();
			   }else{
			       body.completed=false;
			       body.completedAt=null;
			   }


			Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{

				if(!todo){
					return res.status(404).send("no todo found with this id ");
				}

			res.send({todo});

			}).catch((e)=>{
				res.status(400).send();
			})


			});

//====================================================
//====================================================
    
    //routes for users
        //Post route 
           app.post('/users',(req,res)=>{
           	var body= _.pick(req.body, ['email','password']);
             var user=new User(body);



             user.save().then(()=>{
             	return user.generateAuthToken();

               
             }).then((token)=>{
             
             	res.header('x-auth', token).send(user);

             }).catch((e)=>{
             	res.status(400).send(e);
             });

           });

         //Get route by authentication 

           app.get('/users/me',authenticate,(req,res)=>{
              res.send(req.user);   
           });

		   // post route for login 

		   app.post('/users/login',(req,res)=>{
		       var body= _.pick(req.body, ['email','password']);
		       User.findByCredentials(body.email,body.password).then((user)=>{

                  user.generateAuthToken().then((token)=>{
                     res.header('x-auth', token).send(user);
                  });
		       }).catch((e)=>{
                  res.status(400).send();
		       })

		   });


//=============================================
//server start 

app.listen(port,()=>{
	console.log("started up at",port);
});


module.exports={app};



