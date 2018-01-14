var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');
var sleep = require('sleep');
var title = null;


 
var port = process.env.PORT || 5000;

var transporter1 = nodemailer.createTransport({
	service:'gmail',

	auth:
	{
		user:'automated.nikhilyadav3000@gmail.com',
		passs: 'nodemailerPassword'
	}
});

var transporter = nodemailer.createTransport(
'smtps://automated.nikhilyadav3000%40gmail.com:nodemailerPassword@smtp.gmail.com');

var mailOptions ={
	from: 'automated.nikhilyadav3000@gmail.com',
	to: 'nikhilyadav3000@gmail.com',
	subject : 'Sending email using nodejs',
	text: 'That was easy i guess'
};


app.get('/mail',function(req,res){
	transporter.sendMail(mailOptions,function(error,info){
	if(error)
	{
		console.log(error);
	}
	else
	{
		console.log('Email sent: '+ info.response);
	}
	});

	res.send('done');
});

app.get('/scrape',function(req,res){


	var url1 = 'https://stormy-meadow-30464.herokuapp.com/';
	var url = 'http://exam.dtu.ac.in/result.htm';
	var title = null;
	console.log('get');

	fs.readFile('index.html',null,function(error,data){
		if(error)
		{
			console.log('error');
			res.send(error);
		}
		else {
			console.log('no error in loading index.html');
			res.write(data);
		}
	});

	while(true)
		{		
			request('http://exam.dtu.ac.in/result.htm',function(err,response,html){
				if(!err && response.statusCode == 200)
				{
					
					var $ = cheerio.load(html);
					$('#AutoNumber1').filter(function(){
						var data = $(this);
						title = data.children().children().eq(2).children().next().children().text();
						console.log(title);
						if(!title.includes('Revised Result(2K16/CEEE/124, 2K15/CECE/45) and semester Result(2K17/CEEE/54)'))
						console.log("not found");
						else
						console.log("found");				
					});
				}
			});

		}

	

	request(url,function(error,response,html){
		if(error)
			{
				console.log('url not loaded');
				console.log(error);		
			}
		
		else
		{
			
			var $ = cheerio.load(html,function(error)
				{
					console.log('error');
					console.log(error);

				});
			$('#AutoNumber').filter(function(error){

				if(error)
					console.log(error);
	        var data = $(this);
	        title = data.children().children().ef(2).text();
	        	console.log('callback');	
	        
	        
	        
	        if(title.includes('North India’s Largest Student based development Organisation\n\n'))
	        {
	        	console.log('if condition is true');
	        	console.log(title);	
	        }
	        else
	        {
	        	console.log('if condition false');
	        	console.log(title);
	        }

	        });
		}

		console.log('its all done');
	
	});
});




app.listen(port,function(){
	console.log('server started at port '+port);
});



