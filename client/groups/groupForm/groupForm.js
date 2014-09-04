AutoForm.addHooks(['insertSmallGroupForm', 'updateSmallGroupForm'],{
	before: {
		insert: function(doc, template){
			doc.type = 'small-group';
			doc.live = false;
			return doc;
		}
	},
	onSuccess: function(operator, result, template){
		FlashMessages.sendSuccess('Group ' + operator + ' was successful.');
	},
	onError: function(operator, error, template){
		console.log(error);
		FlashMessages.sendError('Error ' + operator + 'ing group. ' + error.message);
	}
});