//Noone can remove a user
Meteor.users.deny({
	remove: function(userId, doc){
		return true;
	}
});

//Admin can update user
Meteor.users.allow({
	update: function(userId, doc, fieldNames, modifier){
		return Meteor.roles.isAdmin(userId);
	}
});

//Users can update their own profile
Meteor.users.allow({
	update: function(userId, doc, fieldNames, modifier){
		return doc._id == userId;
	}
});