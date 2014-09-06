AutoForm.addHooks(['insertSmallGroupForm'],{
	before: {
		insert: function(doc, template){
			doc.type = 'small-group';
			doc.members = [];
			doc.requests = [];
			doc.schedule = {};
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

AutoForm.addHooks(['insertCommunityGroupForm'],{
	before: {
		insert: function(doc, template){
			doc.type = 'community-group';
			doc.members = [];
			doc.requests = [];
			doc.schedule = {};
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