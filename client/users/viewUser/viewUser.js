Template.viewUser.ownerGroups = function(){
	return Groups.find({leaders: this._id});
}