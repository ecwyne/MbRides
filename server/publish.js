Meteor.publish('users', function (glob){
	var options = {fields: {profile: 1}};
	if (glob)
		return Meteor.users.find(glob, options);
	return Meteor.users.find({}, options);
});

Meteor.publish('cars', function(){
	return Cars.find();
});

Meteor.publish('requests', function (glob){
	if (glob)
		return Requests.find(glob)
	return Requests.find({});
});

Meteor.publish('groups', function (glob){
	if (glob)
		return Groups.find(glob)
	return Groups.find({});
});

Meteor.publish('groupRel', function (glob) {
	Meteor.publishWithRelations({
		handle: this,
		collection: Groups,
		filter: glob,
		mappings: [{key: 'members',	collection: Meteor.users}]
	});
});