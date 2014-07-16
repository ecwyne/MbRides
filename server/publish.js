Meteor.publish('users', function(){
	return Meteor.users.find({}, {fields: {
		profile: 1, 
		"services.facebook.email": 1, 
		"services.facebook.gender": 1,
		"services.facebook.id": 1
		}
	});
});