UI.registerHelper('formatPhone', function (phone){
	if (phone) return phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
});

UI.registerHelper('activePage', function (page){
	return Session.get('page') == page ? 'active' : '';
});