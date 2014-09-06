Template.viewGroup.userName = function(_id){
	return Meteor.users.findOne({_id: _id}).profile.name;
}

Template.viewGroup.isLeader = function(){
	return Meteor.roles.isAdmin() || Meteor.roles.isLeader(Router.current().data());
}

Template.viewGroup.isSelf = function(){
	return Meteor.roles.isSelf(this);
}

Template.viewGroup.group = function(){
	return Router.current().data();
}

AutoForm.addHooks(['modalDescriptionUpdate', 'modalLocationUpdate'], {
	onSuccess: function(operator, result, template){
		FlashMessages.sendSuccess('Saved!');
	},
	onError: function(operator, error, template){
		FlashMessages.sendSuccess('Error: ' + error);
	}
});

Template.viewGroup.events({
	'click .incSize': function(){
		Groups.update(this._id, {$inc: {maxSize: 1}});
	},
	'click .decSize': function(){
		Groups.update(this._id, {$inc: {maxSize: -1}});
	},
	'click .groupLive': function(){
		Groups.update(this._id, {$set: {live: !this.live}});
	},
	'click .acceptRequest': function(){
		Groups.update(Router.current().data()._id, {$pull: {requests: this._id}, $addToSet: {members: this._id}})
	},
	'click .removeRequest': function(){
		if (confirm('This will remove this request from your group permenantly')){
			Groups.update(Router.current().data()._id, {$pull: {requests: this._id}});
		}
	},
	'click .removeMember': function(){
		if (confirm('This will remove the member from the group')){
			Groups.update(Router.current().data()._id, {$pull: {members: this._id}});
		}
	},
	'click .requestMembership': function(){
		Groups.update(Router.current().data()._id, {$addToSet: {requests: Meteor.userId()}});
		sendMembersEmail();
		sendLeadersEmail();
	}
});

function sendMembersEmail(){
	var group = Router.current().data();
	var href = location.host + Router.current().path;
	var elements = [
	{name: 'email-h1', data: {text: 'Request sent to ' + group.title}},
	{name: 'email-p', data: {text: 'Click the link below to view the group details and check membership status.', size: 14}},
	{name: 'email-button', data: {href: href, text: 'View ' + group.title}}
	]
	var html = Blaze.toHTMLWithData(Template.email2, {elements: elements});
	Meteor.call('sendEmail', {
		html: html,
		to: Meteor.user().profile.email,
		subject: 'Group Membership Request'
	});
}

function sendLeadersEmail(){
	var group = Router.current().data();
	var href = location.host + Router.current().path;
	var elements = [
	{name: 'email-h1', data: {text: group.title + ' has received a request'}},
	{name: 'email-p', data: {text: 'Click the link below to view/respond to group requests', size: 14}},
	{name: 'email-button', data: {href: href, text: 'Respond to Request'}}
	]
	var html = Blaze.toHTMLWithData(Template.email2, {elements: elements});
	Meteor.call('sendEmail', {
		html: html,
		to: group.leaderDocs().fetch().map(function (e){return e.profile.email}),
		subject: 'Group Membership Request'
	});
}