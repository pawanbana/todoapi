const expect=require('expect');
const request=require('supertest');
const {ObjectID}=require('mongodb');
const {app}=require('./../server');

const {Todo}=require('./../models/todo');

const todos =[{
	_id: new ObjectID(),
	text:'first test todo'
},{ 
	_id: new ObjectID(),
	text:'second test todo'
}];

beforeEach((done)=>{
	
	Todo.remove({}).then(()=>{
		return Todo.insertMany(todos);
	}).then(()=>done());
    
});

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
