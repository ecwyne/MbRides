Meteor.roles = {
	isAdmin: function(userId){
		userId = userId || Meteor.userId();
		return _.intersection(Meteor.users.findOne({_id: userId}).profile.roles, ['church-admin', 'dev']).length > 0;
	},
	isLeader: function(group, userId){
		userId = userId || Meteor.userId();
		if (typeof group == 'string')
			group = Groups.findOne({_id: group});
		return _.contains(group.leaders, userId);
	},
	isSelf: function(userId){
		return userId.toString() == Meteor.userId();
	}
}