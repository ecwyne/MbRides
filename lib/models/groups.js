Groups = new Meteor.Collection('groups');

Groups.attachSchema(new SimpleSchema({
	type: {
		type: String,
		allowedValues: ['car', 'small-group', 'community-group'],
		label: 'Group Type',
		autoform: {
			options: [
				{label: 'Car', value: 'car'},
				{label: 'Small Group', value: 'small-group'},
				{label: 'Community Group', value: 'community-group'}
			],
			firstOption: 'Select...'
		}
	},
	title: {
		type: String,
		label: 'Group Name/Title',
		unique: true
	},
	live: {
		type: Boolean,
		label: 'Group is live'
	},
	description: {
		type: String,
		label: 'Decription of group',
		autoform: {
			rows: 6
		},
		optional: true
	},
	location: {
		type: String,
		label: 'Location for group',
		optional: true,
		autoform: {
			rows: 6
		}
	},
	city: {
		type: String,
		label: 'City',
		optional: true
	},
	leaders: {
		type: [String],
		label: 'Group Leaders'
	},
	members: {
		type: [String],
		label: 'Group Members',
		optional: true
	},
	requests: {
		type: [String],
		label: 'Group membership requests',
		optional: true
	},
	maxSize: {
		type: Number,
		label: 'Maximum number of group members',
		optional: true,
		min: 1
	},
	schedule: {
		type: Object,
		label: 'Group Schedule',
		optional: true,
		blackbox: true
	}

}));

Groups.helpers({
	leaderDocs: function(){
		var cursor = Meteor.users.find({_id: {$in: this.leaders}});
		return cursor;
	},
	memberDocs: function(){
		var cursor = Meteor.users.find({_id: {$in: this.members}});
		return cursor;
	},
	requestDocs: function(){
		var cursor = Meteor.users.find({_id: {$in: this.requests}});
		return cursor;
	},
	size: function(){
		var out = 0;
		out += this.members.length || 0;
		out += this.leaders.length || 0;
		return out;
	},
	vacancies: function(){
		return this.maxSize - this.size();
	},
	inGroup: function(user){
		var id = user._id || user;
		return _.contains(this.members, id) || _.contains(this.leaders, id);
	},
	hasRequested: function(user){
		var id = user._id || user;
		return _.contains(this.requests, id);
	}
});
