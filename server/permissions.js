Meteor.users.allow({
	update: function (userId, doc, fieldNames, modifier){
		if (!userId)
			return false;
		if (modifier.$addToSet || modifier.$pull)
			return true;
	}
});
Cars.allow({
	insert: function(userId, doc){
		return doc.ownerId == userId;
	},
	update: function(userId, doc, fieldNames, modifier){
		return doc.ownerId == userId;
	}
});
Requests.allow({
	insert: function(userId, doc){
		if (doc.type == 'single' && !doc.date){
			throw new Meteor.Error(403, 'Date is required for one-time requests');
			return false;
		}
		return doc.userId == userId;
	},
	update: function(userId, doc, fieldNames, modifier){
		if (modifier.$set.type == 'single' && modifier.$unset && modifier.$unset.date == ''){
			throw new Meteor.Error(403, 'Date is required for one-time requests');
			return false;
		}
		return true;
	}
})