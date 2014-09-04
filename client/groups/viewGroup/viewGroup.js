Template.viewGroup.userName = function(_id){
	return Meteor.users.findOne({_id: _id}).profile.name;
}

Template.viewGroup.isLeader = function(){
	return Meteor.roles.isAdmin() || Meteor.roles.isLeader(Router.current().data());
}

Template.viewGroup.isSelf = function(){
	return Meteor.roles.isSelf(this);
}

Template.viewGroup.group = function(){
	return Router.current().data();
}

AutoForm.addHooks(['modalDescriptionUpdate', 'modalLocationUpdate'], {
	onSuccess: function(operator, result, template){
		FlashMessages.sendSuccess('Saved!');
	},
	onError: function(operator, error, template){
		FlashMessages.sendSuccess('Error: ' + error);
	}
});

Template.viewGroup.events({
	'click .incSize': function(){
		Groups.update(this._id, {$inc: {maxSize: 1}});
	},
	'click .decSize': function(){
		Groups.update(this._id, {$inc: {maxSize: -1}});
	},
	'click .groupLive': function(){
		Groups.update(this._id, {$set: {live: !this.live}});
	}
});