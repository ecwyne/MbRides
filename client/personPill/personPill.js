Template.personPill.hasSentRequest = function(){
	return _.contains(this.requests, Meteor.user().profile.userProfile.id);
}

Template.personPill.isMe = function(){
	return this.id == Meteor.user().profile.userProfile.id;
}

Template.personPill.events({
	'click .deleteInbox': function(){
		if (confirm('This will remove the request from your inbox.')){
			console.log('deleted');
		}
	}
});