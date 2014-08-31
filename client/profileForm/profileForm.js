Template.updateProfile.rendered = function(){
	setTimeout(function(){formDep.changed()}, 500);
}

Template.updateProfile.users = function(){
	return Meteor.users;
}

var formDep = new Deps.Dependency;
Meteor.formDep = formDep;

AutoForm.addHooks(['insertProfileForm', 'updateProfileForm'],{
	before: {
		insert: function (doc, modifier){
			return doc;
		}
	},
	onSuccess: function(operator, result, template){
		FlashMessages.sendSuccess('Your request information has been saved.');
	},
	onError: function(operator, error, template){
		FlashMessages.sendError('Error: ' + error.reason);
	}
});

Template.updateProfile.btnGroupActive = function(name, value){
	formDep.depend();
	var val = $('[data-schema-key="' + name + '"]').val();
	return val == value ? 'active' : '';
}


Template.afBtnGroup.fieldVals = function(){
	return this.collection.simpleSchema()._schema[this.name].autoform.options;
}

Template.afBtnGroup.btnGroupActive = function(name, value){
	formDep.depend();
	var val = $('[data-schema-key="' + name + '"]').val();
	return val == value ? 'active' : '';
}

Template.afBtnGroup.events({
	'click .btnGroup': function(e, template){
		$('[data-schema-key="' + e.target.dataset.name + '"]').val(e.target.dataset.value);
		formDep.changed();
	}
});

Template.afBtnGroup.currentVal = function(){
	if (this.doc && this.doc.profile){
		console.log(this.doc);
		return this.doc.profile.service;
	}
}