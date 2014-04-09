QUnit.moduleStart(function( details ) {
	//$( '#' + details.name ).show();
});

QUnit.moduleDone(function( details ) {
	//$( '#' + details.name ).hide();
});


var testConfig = {

	// run all tests
	runAll: false,
	
	// run individual tests
	run: {
	
		core: false,
		
		hider: false,
		
		shower: false,
		
		toggler: {
			all: false,
			general: false,
			formelements: false,
			effects: false,
			moving: false,
			delay: false,
			parents: false
		},
		
		grouptoggler: false,
		
		switcher: false,
		
		sizer: false,
		
		styler: true,
		
		morpher: true
	}
}