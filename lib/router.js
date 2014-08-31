var subs = new SubsManager({
	cacheLimit: 100,
	expireIn: 4000
});
subs.subscribe('users');

Router.configure({
	layoutTemplate: 'layoutTemplate',
	loadingTemplate: 'loadingTemplate',
	notFoundTemplate: 'notFoundTemplate'
});
Router.onBeforeAction('loading');

Router.map(function(){
	this.route('splash', {
		path: '/'
	});

	this.route('myVehicle', {
		path: '/my-vehicle',
		waitOn: function(){
			return subs.subscribe('cars');
		},
		data: function(){
			if (Cars.findOne({ownerId: Meteor.userId()}))
				return Cars.findOne({ownerId: Meteor.userId()});
			return {};
		}
	});

	this.route('insertRequest', {
		path: '/request/new'
	});

	this.route('updateRequest', {
		path: '/request/edit/:_id',
		waitOn: function(){
			return subs.subscribe('requests', {_id: this.params._id});
		},
		data: function(){
			return Requests.findOne(this.params._id)
		}
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
});