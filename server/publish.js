Meteor.publish('users', function (glob){
	glob = glob || {};
	return Meteor.users.find(glob);
});

Meteor.publish('groups', function (glob) {
	glob = glob || {};
	return Groups.find(glob);
});