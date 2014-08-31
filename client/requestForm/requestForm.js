AutoForm.addHooks(['insertRequestForm', 'updateRequestForm'],{
	before: {
		insert: function (doc, modifier){
			doc.userId = Meteor.userId();
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