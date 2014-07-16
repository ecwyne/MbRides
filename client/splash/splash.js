Template.splash.userCount = function(){
	return Meteor.users.find().count();
}

Template.splash.events({
	'mouseenter .driverSignup': function(){
		console.log('sign up as a driver');
	},
	'mouseenter .passengerSignup': function(){
		console.log('signup as a passenger');
	}
})