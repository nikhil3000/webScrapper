var request = require('request');
var cheerio = require('cheerio');
var resString = 'Revised Result(2K16/CEEE/124, 2K15/CECE/45) and semester Result(2K17/CEEE/54)';
var nodemailer = require('nodemailer');
var express  = require('express');
var fs = require('fs');
var app = express();


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
	text: 'Kisi ka result aa gaya'
};




app.get('/',function(req,res){

		fs.readFile('index.html',null,function(error,data){
		if(error)
		{
			console.log('error');
			
		}
		else {
			console.log('no error in loading index.html');
			res.write(data);
		}
	});
		
		setInterval(function(){
		console.log('inside while ');
				request('http://exam.dtu.ac.in/result.htm',function(err,response,html){
					if(!err && response.statusCode == 200)
					{
						console.log('inside if');
						var $ = cheerio.load(html);
						$('#AutoNumber1').filter(function(){
							var data = $(this);
							var title = data.children().children().eq(2).children().next().children().text();
							console.log(title);
							if(!title.includes(resString))
							{
								console.log("declared");
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

							}
							
							else
							console.log("not declared");

							resString = title;				
						});
					}
					else
					{
						console.log('else');
					}
				});
			},5000);


});

var port = process.env.PORT || 5000;

app.listen(port,function()
{
	console.log('server started at port '+port);
});
