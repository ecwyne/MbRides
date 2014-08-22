Session.setDefault('studentFilter', 'any');
Session.setDefault('serviceFilter', 'any');
Session.setDefault('genderFilter', 'any');

Template.filter.btnOption = function(val, test){
	return Session.get(val) == test ? 'active' : '';
}

Template.filter.events({
	'click .filterBtn': function(e){
		Session.set(e.target.dataset.filter, e.target.textContent.toLowerCase());
	}
});