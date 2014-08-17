Accounts.onCreateUser(function(options, user){
	user.profile = options.profile;
	user.profile.userProfile = {
		name: options.profile.name,
		email: user.services.facebook.email,
		gender: user.services.facebook.gender,
		facebookPic: 'http://graph.facebook.com/' + user.services.facebook.id + '/picture?height=80&width=80',
		facebookUrl: 'https://facebook.com/' + user.services.facebook.id
	}
	return user;
});