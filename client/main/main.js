Session.setDefault('page', 'profile');

Template.main.page = function(page){
	return Session.get('page') == page;
}