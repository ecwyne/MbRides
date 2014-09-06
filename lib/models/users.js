var profile = new SimpleSchema({
	name: {
		type: String,
		label: 'Name'
	},
	email: {
		type: String,
		label: 'Email Address',
		regEx: SimpleSchema.RegEx.Email
	},
	gender: {
		type: String,
		label: 'Gender',
		allowedValues: ['male', 'female'],
		autoform: {
			options: [
				{label: 'Male', value: 'male'},
				{label: 'Female', value: 'female'}
			],
			firstOption: 'Select...'
		}
	},
	student: {
		type: String,
		label: 'Are you currently a student?',
		optional: true,
		allowedValues: ['yes', 'no'],
		autoform: {
			options: [
				{label: 'Yes', value: 'yes'},
				{label: 'No', value: 'no'}
			],
			firstOption: 'Select...'
		}
	},
	service: {
		type: String,
		label: 'What service do you attend?',
		allowedValues: ['9:00', '11:00'],
		autoform: {
			options: [
				{label: '9:00', value: '9:00'},
				{label: '11:00', value: '11:00'}
			],
			firstOption: 'Select...'
		},
		optional: true
	},
	id: {
		type: String,
		label: 'Facebook ID'
	},
	facebookPic: {
		type: String,
		label: 'Facebook Picture URL'
	},
	facebookUrl: {
		type: String,
		label: 'Facebook Link URL'
	},
	phone: {
		type: String,
		label: 'Primary Phone Number',
		optional: true
	},
	bio: {
		type: String,
		label: 'Bio: Tell us a bit about yourself',
		optional: true,
		autoform: {
			rows: 6
		}
	},
	groups: {
		type: String,
		label: 'List any other Mb groups you are interested in.',
		optional: true,
		autoform: {
			rows: 6
		}
	},
	location: {
		type: String,
		label: 'Describe your preferred pickup/dropoff location',
		optional: true,
		autoform: {
			rows: 6
		}
	},
	type: {
		type: String,
		label: 'User Type (choose one)',
		allowedValues: ['driver', 'passenger'],
		autoform: {
			options: [
				{label: 'Driver', value: 'driver'},
				{label: 'Passenger', value: 'passenger'}
			],
			firstOption: 'Select...'
		},
		optional: true
	},
	confirm: {
		type: String,
		label: 'I will use discernment when choosing who I ride to church with.',
		allowedValues: ['yes'],
		autoform: {
			options: [
				{label: 'Yes', value: 'yes'},
				{label: 'No', value: 'no'}
			],
			firstOption: 'Select...'
		},
		optional: true
	},
	roles: {
		type: [String],
		label: 'User Roles'
	},
	schedule: {
		type: Object,
		label: 'User Schedule',
		blackbox: true,
		optional: true
	}
})

Meteor.users.attachSchema(new SimpleSchema({
	profile: {
		type: profile
	},
	services: {
		type: Object,
		blackbox: true
	}
}));

Meteor.users.helpers({
	memberships: function(){
		var cursor = Groups.find({members: this._id});
		return cursor;
	},
	leaderships: function(){
		var cursor = Groups.find({leaders: this._id});
		return cursor;
	},
	requests: function(){
		var cursor = Groups.find({requests: this._id});
		return cursor;
	},
	busy: function(){
		function getBusy (e){
			var title = e.title;
			return _.pairs(e.schedule).filter(function (e){return e[1]}).map(function (e){return e[0]}).map(function (e){return {title: title, time: e}})
		}
		var m = this.memberships().map(getBusy);
		var l = this.leaderships().map(getBusy);
		return _.flatten([l,m]);
	}
});