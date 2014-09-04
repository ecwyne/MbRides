Template.viewGroups.nameLookup = function(id){
	return Meteor.users.findOne({_id: id}).profile.name
}