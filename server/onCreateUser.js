Accounts.onCreateUser(function (options, user){
	user.profile = options.profile;
	user.profile = _.extend({
		name: options.profile.name,
		email: user.services.facebook.email,
		gender: user.services.facebook.gender,
		facebookPic: 'http://graph.facebook.com/' + user.services.facebook.id + '/picture?height=200&width=200',
		facebookUrl: 'https://facebook.com/' + user.services.facebook.id,
		id: user.services.facebook.id,
		requests: []
	})
	return user;
});