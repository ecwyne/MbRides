process.env.MAIL_URL = 'smtp://mountainbrookconnect@gmail.com:t0mmyb0y@smtp.gmail.com:587/';

Meteor.methods({
	testEmail: function(text){
		Email.send({
			to: 'ecwyne@gmail.com',
			from: 'Mb Connect <mbconnect@gmail.com>',
			subject: 'meteor test',
			html: text
		});
	},
	sendEmail: function(obj){
		obj.from = 'Mb Connect <mbconnect@gmail.com>';
		Email.send(obj);
	}
});
