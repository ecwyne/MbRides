//Noone can delete Group
Groups.deny({
	remove: function(userId, doc){
		return true;
	}
});

//Groups MUST have a leader
Groups.deny({
	insert: function(userId, doc){
		return doc.leaders.length == 0
	}
});
//Non-Admin cannot create small-group
Groups.deny({
	insert: function (userId, doc){
		if (doc.type == 'small-group')
			return !Meteor.roles.isAdmin(userId);
	}
});

//Members/Leaders cannot submit request
Groups.deny({
	update: function(userId, doc, fieldNames, modifier){
		return _.contains(doc.members, userId) || _.contains(doc.leaders, userId) && _.isEqual(_.pick(modifier, '$addToSet'), {$addToSet: {requests: userId}})
	}
});

//Leader can update own Group
Groups.allow({
	update: function(userId, doc, fieldNames, modifier){
		if (_.contains(doc.leaders, userId))
			return true;
	}
});

//Admin can insert/update any group
Groups.allow({
	insert: function(userId, doc){
		return Meteor.roles.isAdmin(userId);
	},
	update: function(userId, doc, fieldNames, modifier){
		return Meteor.roles.isAdmin(userId);
	}
});

//Users can insert a community-group
Groups.allow({
	insert: function (userId, doc){
		return userId && doc.type == 'community-group';
	}
});

//Users can add/remove requests for groups
Groups.allow({
	update: function (userId, doc, fieldNames, modifier){
		return _.isEqual(modifier, {$addToSet: {requests: userId}}) || _.isEqual(modifier, {$pull: {requests: userId}});
	}
});