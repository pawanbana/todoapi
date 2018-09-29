const{SHA256}=require('crypto-js');


const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


var password='123abc!';

/*bcrypt.genSalt(10,(err,salt)=>{
	bcrypt.hash(password,salt,(err,hash)=>{
         console.log(hash);
	});
});*/
var hashedpassword='$2a$10$yLpV.iREeEvnKiBOy5SM4ezpiCd7bmrfgCs7VOWQ1hr5lryBQcsjO';
bcrypt.compare('1233',hashedpassword,(err,res)=>{
	console.log(res);
});

/*var data={
	id:10
};

var token = jwt.sign(data,"123abc");
console.log(token);

var decoded=jwt.verify(token,'123abc');
console.log('decoded',decoded);*/


/*var message=" i am user  no 3";

var hash=SHA256(message).toString();


console.log(`message is" ${message}`);
console.log(`hash for message is :${hash}`);

var data={
	id: 4
	
};

var token ={
	data,
	hash:SHA256(JSON.stringify(data)+'somesecret').toString()
}

					  //token.data.id=5;
					  //token.hash=SHA256(JSON.stringify(token.data)).toString();

var resulthash=SHA256(JSON.stringify(token.data)+'somesecret').toString();

if(resulthash===token.hash){
	console.log('data was not changed');
}
else{
	console.log('data was changed');
}*/