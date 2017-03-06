var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	mongo = require('mongodb').MongoClient,
	url = 'mongodb://localhost:27017/users';
	
server.listen(3000);
console.log("\t\t*****************************")
console.log("\t\tServer listening on port 3000")
console.log("\t\t*****************************")

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendfile('/index.html');
});


mongo.connect(url, function(err, db){
	
	if(err) throw err;
	
	io.sockets.on('connection', function(socket){
		
		var col = db.collection('username');

		socket.on('send message', function(data){
			var name = data.name,
			email = data.email,
			pass = data.pass;
			
		col.findOne({email: data.email }, function(err, incol) {
			if (err){ console.log('error');}
            if (incol) {
				io.sockets.emit('new message', "Already Exist");
				console.log(' Email ALready exist');                 
                    }
			else{		
		console.log('Someone has connected');
		console.log(data.name + " " + data.email);
		
			
		col.insert({name: name, email:email, password:pass}, function(){
			console.log('Inserted');
		})
		
		io.sockets.emit('new message', "successfully registered");
			}
	});
	
});
		socket.on('login message', function(data){			
			var email = data.email,
			pass = data.pass;
			
			col.findOne({email: data.email }, function(err, present) { 
			 			 
			 if (err){ console.log('error');}
            if (present) {
				
				if(present.password === data.pass){
				io.sockets.emit('is successful login', "proceed");
				console.log(' Hoorray User exists in DB!!!'); 
				}
				else{
					io.sockets.emit('is successful login', "password incorrect");
				console.log(' Incorrect Password'); 
				}
                    }
			else{
				io.sockets.emit('is successful login', "not registered");
				console.log(' Need to register!!!'); 
			}
			});
		});
});
});