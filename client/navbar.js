Template.navbar.events({
	'click .profileTab': function(e){
		e.preventDefault();
		Session.set('page', 'profile');
	},
	'click .browseTab': function(e){
		e.preventDefault();
		Session.set('page', 'browse');
	}
});