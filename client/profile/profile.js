Template.profile.rendered = function(){
	var u = Meteor.user().profile.userProfile;
	for (i in u) {
		if (document.getElementById(i))
			document.getElementById(i).value = u[i];
	}
}

FlashMessages.configure({autoScroll: false});
function setProfile(e){
	var obj = {};
	obj['profile.userProfile.' + e.target.id] = e.target.value;
	Meteor.users.update(Meteor.userId(), {$set: obj});
	window.e = e;
	FlashMessages.clear();
	FlashMessages.sendSuccess('Profile Update Successful');
}

Template.profile.events({
	'change input': setProfile,
	'change textarea': setProfile,
	'click .userTypeBtn': function(e){Meteor.users.update(Meteor.userId(), {$set: {'profile.userProfile.userType': e.target.textContent}})},
	'click .studentBtn': function(e){Meteor.users.update(Meteor.userId(), {$set: {'profile.userProfile.student': e.target.textContent.toLowerCase()}})},
	'click .serviceBtn': function(e){Meteor.users.update(Meteor.userId(), {$set: {'profile.userProfile.service': e.target.textContent}})}
});

Template.profile.helpers({
	userTypeOption: function(type){
		return Meteor.user().profile.userProfile.userType == type ? 'active' : '';
	},
	studentOption: function(bool){
		if (typeof Meteor.user().profile.userProfile.student == 'undefined') return '';
		if (Meteor.user().profile.userProfile.student == bool) return 'active';
	},
	serviceOption: function(time){
		if (typeof Meteor.user().profile.userProfile.service == 'undefined') return '';
		if (Meteor.user().profile.userProfile.service == time) return 'active';
	}
});

Template.profile.me = function(){
	return Meteor.user().profile.userProfile;
}

Template.profile.inbox = function(){

}

Template.profile.outbox = function(){
	return Meteor.users.find({'profile.userProfile.requests': Meteor.user().profile.userProfile.id}).map(function(e){return e.profile.userProfile});
}