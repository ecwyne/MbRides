var subs = new SubsManager({
	cacheLimit: 100,
	expireIn: 4000
});

Router.configure({
	layoutTemplate: 'layoutTemplate',
	loadingTemplate: 'loadingTemplate',
	notFoundTemplate: 'notFoundTemplate'
});
Router.onBeforeAction('loading');
Router.onBeforeAction('dataNotFound');
Router.onBeforeAction(Filter.mustBeUser, {except: ['splash']});
Router.onBeforeAction(Filter.adminOnly, {only: ['viewUsers', 'viewGroups']});

Router.map(function(){
	this.route('splash', {
		path: '/',
		global: true
	});

	this.route('updateProfile', {
		path: '/about-me',
		waitOn: function(){
			subs.subscribe('users');
		},
		data: function(){
			return Meteor.user();
		}
	});

	this.route('insertGroup', {
		path: '/small-group/new/:leaderId',
		onBeforeAction: function(pause){
			var leader = Meteor.users.findOne({_id: this.params.leaderId});
			if (!leader){
				this.render('notFoundTemplate');
				pause();
			}
		},
		data: function(){
			var self = this;
			var leader = Meteor.users.findOne({_id: self.params.leaderId});
			if (leader){
				return {
					leaders: [self.params.leaderId],
					leader: leader.profile.name
				};
			}
		},
		waitOn: function(){
			return subs.subscribe('users');
		}
	});

	this.route('viewUsers', {
		path: '/user/view/all',
		waitOn: function(){
			return subs.subscribe('users');
		},
		data: function(){
			return {
				users: Meteor.users.find()
			}
		}
	});

	this.route('viewUser', {
		path: 'user/view/:_id',
		waitOn: function(){
			return [
				subs.subscribe('users', {_id: this.params._id}), 
				subs.subscribe('groups', {$or: [{leaders: this.params._id}, {members: this.params._id}]})
			];
		},
		data: function(){
			return Meteor.users.findOne({_id: this.params._id});
		}
	})

	this.route('viewGroups', {
		path: 'group/view/all',
		waitOn: function(){
			return [subs.subscribe('users'), subs.subscribe('groups')];
		},
		data: function(){
			return {groups: Groups.find()}
		}
	});

	this.route('viewGroup', {
		path: 'group/view/:_id',
		waitOn: function(){
			return [
				subs.subscribe('groups', {_id: this.params._id}),
				subs.subscribe('users')
			]
		},
		data: function(){
			return Groups.findOne({_id: this.params._id});
		}
	});
});