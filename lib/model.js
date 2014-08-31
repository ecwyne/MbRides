Cars = new Meteor.Collection('cars');
Requests = new Meteor.Collection('requests');

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

Cars.attachSchema(new SimpleSchema({
	seats:{
		type: Number,
		min: 1,
		label: 'Number of open seats in car.'
	},
	ownerId: {
		type: String,
		label: 'Car Owner User ID'
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