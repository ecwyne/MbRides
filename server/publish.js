Meteor.publish('users', function(){
	return Meteor.users.find({}, {
		fields: {
			profile: 1
			}
	});
});

Meteor.publish('cars', function(){
	return Cars.find();
});

Meteor.publish('requests', function (glob){
	if (glob)
		return Requests.find(glob)
	return Requests.find({});
});