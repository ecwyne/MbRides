Template.checklist.style = function(step){
	if (step.complete)
		return 'background-color: lightgreen; padding: 10px; border-radius: 10px;';
	return 'background-color: lightgray; padding: 10px; border-radius: 10px;'

}

Template.checklist.steps = function(){
	return [
		{step: 1, text: 'Finish About Me', link: '/about-me', test: Template.checklist.tests.isAboutMeDone, get complete(){return this.test()}},
		{step: 2, text: 'Update Schedule', link: '/about-me', test: function(){return true}, get complete(){return this.test()}}
	]
}

Template.checklist.allDone = function(){
	var steps = Template.checklist.steps();
	return _.every(steps, function (e){return e.complete});
}

Template.checklist.tests = {
	isAboutMeDone: function(){
		if (Meteor.user()){
			var keys = _.keys(Meteor.user().profile);
			var required = ['name', 'email', 'phone', 'type', 'service', 'student', 'groups', 'bio', 'location', 'confirm'];
			return _.intersection(required, keys).length == required.length;
		}
	}
}