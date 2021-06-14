require('dotenv').config();

const express = require("express");
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/", (req,res)=>{
	res.sendFile(__dirname+ "/signup.html");
})

app.post("/success.html", (req,res)=>{

	const fname = req.body.fname;
	const lname = req.body.lname;
	const email = req.body.email;

	const data = {
		members: [
		{
		email_address : email,
		status : "subscribed",
		merge_fields : {
			FNAME : fname,
			LNAME : lname,
		}
		}
		]
	};

	const jsondata = JSON.stringify(data);
	const ID = process.env.LIST_ID;
	const url = "https://us6.api.mailchimp.com/3.0/lists/"+ID;

	const config = {
		method: "POST",
		auth: {
                username: 'syedabdullah',
     		password: process.env.API_KEY
		}     
	}

         axios.post(url,jsondata,config)
	.then(result => {
		if(result.status === 200){
			res.sendFile(__dirname+"/success.html");
		}
		else
			res.sendFile(__dirname+"/failure.html");
	})
	.catch(err => {
		console.error(err); 
	})
})

app.listen(PORT,()=>{
	console.log("Server Started");
})
