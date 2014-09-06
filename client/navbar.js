Template.navbar.events({
	'click .nav a': function(){
		if ($('#bs-example-navbar-collapse-1').hasClass('in')){
			$(".navbar-toggle").click();
		}
	}
})