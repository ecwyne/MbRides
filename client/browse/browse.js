Template.browse.users = function(){
	var obj = {};
	//obj['profile.userProfile.userType'] = Meteor.user().profile.userProfile.userType == 'Driver' ? 'Passenger' : 'Driver';
	if (Session.get('studentFilter') != 'any')
		obj['profile.userProfile.student'] = Session.get('studentFilter');
	if (Session.get('serviceFilter') != 'any')
		obj['profile.userProfile.service'] = Session.get('serviceFilter');
	if (Session.get('genderFilter') != 'any')
		obj['profile.userProfile.gender'] = Session.get('genderFilter');

	return Meteor.users.find(obj).map(function(e){return e.profile.userProfile});

}

Template.browse.potentialWhat = function(){
	return Meteor.user().profile.userProfile.userType == 'Driver' ? 'Passengers' : 'Drivers';
}

Template.browse.events({
	'click .sendRequest': function(e){
		var _id = Meteor.users.findOne({'profile.userProfile.id': this.id})._id;
		Meteor.users.update(_id, {$addToSet: {'profile.userProfile.requests': Meteor.user().profile.userProfile.id}});
	}
});