Template.personPill.hasSentRequest = function(){
	return _.contains(this.requests, Meteor.user().profile.userProfile.id);
}