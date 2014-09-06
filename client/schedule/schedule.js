Template.schedule.rendered = function(){
	if (Router.current().route.name == 'viewUser'){
		renderedUser();
	}
	if (Router.current().route.name == 'viewGroup'){
		renderedGroup();
	}
}

Template.schedule.hours = function(){
	var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
	function hours(start){
		var text = getHour(start) + '-' + getHour(start + 1);
		return {text: text, days: _.map(days, function (e){return e + start})}
	}
	function getHour(val){
		return (val % 12) > 0 ? (val % 12) + ':00' : '12:00';
	}
	return [
		new hours(6),
		new hours(7),
		new hours(8),
		new hours(9),
		new hours(10),
		new hours(11),
		new hours(12),
		new hours(13),
		new hours(14),
		new hours(15),
		new hours(16),
		new hours(17),
		new hours(18),
		new hours(19),
		new hours(20),
		new hours(21)
	]
}
Template.schedule.isAvailable = function(time){
	var data = Router.current().data();
	if (Router.current().route.name == 'viewUser'){
		if (data.profile.schedule && data.profile.schedule[time])
			return 'success';
	}
	if (Router.current().route.name == 'viewGroup'){
		if (data.schedule && data.schedule[time])
			return 'warning';
	}
}

Template.schedule.busyName = function (time){
	if (Router.current().route.name == 'viewUser'){
		if (_.findWhere(Router.current().data().busy(), {time: time}))
			return _.findWhere(Router.current().data().busy(), {time: time}).title;
	}
}

function renderedUser(){
	var clicking = false;
	var addClass = true;
	
	$('.scheduleTable > tr > td').mousedown(function(){
		var userId = Router.current().data()._id
		clicking = true;
		addClass = !$(this).hasClass('success');
		var obj = {};
		obj['profile.schedule.' + this.dataset.time] = addClass;
		Meteor.users.update(userId, {$set: obj})
	});

	$(document).mouseup(function(){
		clicking = false;
	})

	$('.scheduleTable > tr > td').mouseenter(function(){
		if(clicking == false) return;
		var userId = Router.current().data()._id
		var obj = {};
		obj['profile.schedule.' + this.dataset.time] = addClass;
		Meteor.users.update(userId, {$set: obj})
	});
}

function renderedGroup(){
	var clicking = false;
	var addClass = true;
	
	$('.scheduleTable > tr > td').mousedown(function(){
		var groupId = Router.current().data()._id
		clicking = true;
		addClass = !$(this).hasClass('warning');
		var obj = {};
		obj['schedule.' + this.dataset.time] = addClass;
		Groups.update(groupId, {$set: obj})
	});

	$(document).mouseup(function(){
		clicking = false;
	})

	$('.scheduleTable > tr > td').mouseenter(function(){
		if(clicking == false) return;
		var groupId = Router.current().data()._id
		var obj = {};
		obj['schedule.' + this.dataset.time] = addClass;
		Groups.update(groupId, {$set: obj})
	});
}