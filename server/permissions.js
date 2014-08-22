Meteor.users.allow({
	update: function (userId, doc, fieldNames, modifier){
		if (modifier.$addToSet || modifier.$pull)
			return true;

	}
});