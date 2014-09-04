Cars = new Meteor.Collection('cars');
Requests = new Meteor.Collection('requests');
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
	}

}));

Requests.attachSchema(new SimpleSchema({
	userId: {
		type: String,
		label: 'Requester Id'
	},
	type: {
		type: String,
		label: 'Request Type',
		allowedValues: ['recurring', 'single'],
		autoform: {
			options: [
				{label: 'Recurring', value: 'recurring'},
				{label: 'One Time', value: 'single'}
			],
			firstOption: 'Select...'
		}

	},
	date: {
		type: String,
		optional: true
	},
	notes: {
		type: String,
		optional: true,
		autoform: {
			rows: 6
		}
	}
}));

Meteor.users.attachSchema(new SimpleSchema({
	profile: {
		type: Schema.profile
	},
	services: {
		type: Object,
		blackbox: true
	}
}));

Groups.helpers({
	leaderDocs: function(){
		return Meteor.users.find({_id: {$in: this.leaders}});
	}
});