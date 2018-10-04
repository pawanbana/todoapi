const expect=require('expect');
const request=require('supertest');
const {ObjectID}=require('mongodb');
const {app}=require('./../server');

const {Todo}=require('./../models/todo');
const {todos,populatetodos,users,populateusers}=require('./seed/seed');


beforeEach(populateusers);

beforeEach(populatetodos);

describe('POST/Todos',()=>{
  it('should create a new todo',(done)=>{
       var text='text todo text';


       request(app)
       .post('/todos')
       .send({text})
       .expect(200)
       .expect((res)=>{
       	expect(res.body.text).toBe(text);
       })
       .end((err,res)=>{
       	if(err){
       		return done(err);
       	}
       	Todo.find({text}).then((todos)=>{
       		expect(todos.length).toBe(1);
       		expect(todos[0].text).toBe(text);
       		done();
       	}).catch((e)=>{
       		done(e);
       	});
       })
  });


});


describe('GET/Todos',()=>{

	it('should get all todos',(done)=>{
       request(app)
       .get('/todos')
       .expect(200)
       .expect((res)=>{
       	expect(res.body.todos.length).toBe(2);
       })
       .end(done);
	});
});


describe('GET/Todos/:ID',()=>{
    it('should get todo by id',(done)=>{
      request(app)
       .get(`/todos/${todos[0]._id.toHexString()}`)
       .expect(200)
       .expect((res)=>{
       	expect(res.body.text).toBe(todos[0].text);
        
       })
       .end(done);

});
});


describe('Delete/todos/:id',()=>{
	it('should delete todo by id',(done)=>{
		var hexId=todos[1]._id.toHexString();
		request(app)
		.delete(`/todos/${hexId}`)
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo._id).toBe(hexId);
		})
		.end((err,res)=>{
			if(err){
				return done(err);
			}
			Todo.findById(hexId).then((todo)=>{
				expect(todo).toNotExist();
				done();
			}).catch((e)=>done(e));
		});
		});
});


describe('GET/user/me',()=>{
     
     it('should return user if authenticated',(done)=>{
         request(app)
         .get('/users/me')
         .set('x-auth',users[0].tokens[0].token)
         .expect(200)
         .expect((res)=>{
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
         })
         .end(done);


     });




     it('should return 401 if not authenticated',(done)=>{

      request(app)
      .get('/users/me')
      .expect(401)
      .expect((res)=>{
            expect(res.body).toEqual({});
      })
      .end(done);

     });




});


describe('POST/users',()=>{
   
   it('should create user',(done)=>{
      var email='exampple@gmail.com';
      var password="fdfsdgdfsd";

      request(app)
      .post('/users')
      .send({email,password})
      .expect(200)
      .expect((res)=>{
            expect(res.headers['x-auth']).toExist();
            expect(res.body._id).toExist();
            expect(res.body.email).toBe(email);


      })
      .end(done);

   });



   it('should not create user if email is in used',(done)=>{
        var email='andrew123@gmail.com';
                  var password="fdfsdgdfsd";

                  request(app)
                  .post('/users')
                  .send({email,password})
                  .expect(400)
                  .end(done);
   });
  

});