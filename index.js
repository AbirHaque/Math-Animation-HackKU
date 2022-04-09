const express = require('express');

const app = express();

const React = require('react')
const ReactDOM = require('react-dom')
const path = require('path')

const { MongoClient } = require("mongodb");
const url = "mongodb+srv://math_animation:bzSsxbPMCntsYMSl@cluster0.2ielq.mongodb.net/Cluster0?retryWrites=true&w=majority";
const dbName = "Cluster0";
const client = new MongoClient(url);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('/public/html/index.html', {root: __dirname })
});

app.get('/student', (req,res) => {

  //res.sendFile("/views/student.html", {root: __dirname });
	//res.send('Student portal')
	const client = new MongoClient(url);
	// The database to use
 	const dbName = "Cluster0";

	client.connect(err => {
    console.log("Connected to MongoDB server...");
		const ids = client.db(dbName).collection("problems") // substitute your database and collection names
		ids.find({}).toArray(function(err, result) {
	        console.log("find query executed...")
	        console.log(result)
					res.json(result)
		});
	});
	
	client.close();		
});



app.get('/teacher', (req,res) => {
  res.sendFile(path.join());
});

app.get('/problem', (req,res) => {
    res.sendFile("/public/html/problem.html", {root: __dirname });		
});

app.get('/getproblems', (req,res) => {
	const ids = client.db(dbName).collection("problems") // substitute your database and collection names;
	ids.find({}).toArray(function(err, result) {
	console.log("find query executed...")    
	console.log(result)
	res.json(result)
	});
});

app.get('/getid', (req,res) => {
    const ids = client.db(dbName).collection("problems") // substitute your database and collection names;
	ids.find({"_id" : ObjectId()})
	res.json(result)
	});


app.listen(3000, () => {
	client.connect(err => {
		console.log('Mongo connected lmao');
	})
  console.log('server started');
});