Template.myVehicle.hasVehicle = function(){
	return Cars.find({ownerId: Meteor.userId()}).count();
}

AutoForm.addHooks(['insertCarsForm', 'updateCarsForm'],{
	before: {
		insert: function (doc, modifier){
			doc.ownerId = Meteor.userId();
			return doc;
		}
	},
	onSuccess: function(operator, result, template){
		FlashMessages.sendSuccess('Your vehicle information has been saved. Please continue');
	},
	onError: function(operator, error, template){
		console.log(operator);
		FlashMessages.sendError('The following error occured: ' + error);
	}
});