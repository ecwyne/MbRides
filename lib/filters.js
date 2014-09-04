Filter = {};

Filter.adminOnly = function(pause){
	if (_.intersection(Meteor.user().profile.roles, ['church-admin', 'dev']).length == 0){
		this.render('notAdmin')
		pause();
	}
}

Filter.mustBeUser = function(pause){
	if (!Meteor.user() || !_.contains(Meteor.user().profile.roles, 'user')){
		this.render('login');
		pause();
	}
}