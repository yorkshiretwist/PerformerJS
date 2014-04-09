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

if (!testConfig.runAll) {
    if (!testConfig.run.hider) {
        $('.module.hider').hide();
    }
    if (!testConfig.run.shower) {
        $('.module.shower').hide();
    }
    if (!testConfig.run.toggler.all) {
        $('.module.toggler').hide();
    }
    if (!testConfig.run.grouptoggler) {
        $('.module.grouptoggler').hide();
    }
    if (!testConfig.run.switcher) {
        $('.module.switcher').hide();
    }
    if (!testConfig.run.sizer) {
        $('.module.sizer').hide();
    }
    if (!testConfig.run.styler) {
        $('.module.styler').hide();
    }
}