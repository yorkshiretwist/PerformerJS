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
	
		focusser: false,
		
		submitlocker: false,
	
		hider: false,
		
		shower: false,
		
		toggler: {
			all: true,
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
		
		styler: false,
		
		morpher: false,
        
        tabber: false,
		
		truncator: false,
		
		accordianer: false,
		
		looper: {
			all: false,
			standard: false,
			autoplay: false
		},
		
		pager: false
	}
}

if (!testConfig.runAll) {
	if (!testConfig.run.focusser) {
        $('.module.focus').hide();
    }
	if (!testConfig.run.submitlocker) {
        $('.module.submitlock').hide();
    }
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
    if (!testConfig.run.morpher) {
        $('.module.morpher').hide();
    }
	
	if (!testConfig.run.tabber) {
        $('.module.tabber').hide();
    }
	
	if (!testConfig.run.truncator) {
        $('.module.truncate').hide();
    }
	
	if (!testConfig.run.accordianer) {
        $('.module.accordianer').hide();
    }
	
	if (!testConfig.run.looper.all) {
        $('.module.loop').hide();
    }
	
	if (!testConfig.run.pager) {
        $('.module.page').hide();
    }
}