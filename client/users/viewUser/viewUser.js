AutoForm.addHooks(['modalBioUpdate', 'modalContactUpdate'], {
	onSuccess: function(operator, result, template){
		FlashMessages.sendSuccess('Saved!');
	},
	onError: function(operator, error, template){
		FlashMessages.sendSuccess('Error: ' + error);
	}
});