UI.registerHelper('formatPhone', function (phone){
	if (phone) return phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
});

UI.registerHelper('activePage', function (page){
	return page == Router.current().route.name ? 'active' : '';
});

UI.registerHelper('isAdmin', function(){
	return Meteor.roles.isAdmin();
});

UI.registerHelper('getUser', function (id, attr){
	if (typeof attr == 'string')
		return Meteor.users.findOne({_id: id.toString()})[attr];
	return Meteor.users.findOne({_id: id.toString()});
});