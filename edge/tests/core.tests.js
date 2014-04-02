module( "Core" );

if ( testConfig.runAll || testConfig.run.core ) {
	test( "Performer loaded", function() {
		ok( window.Performer, "Performer is loaded" );
	});
}

if ( testConfig.runAll || testConfig.run.core ) {
	test( "Performer initialised", function() {
		ok( window.Performer.isInitialised, "Performer is initialised" );
	});
}

if ( testConfig.runAll || testConfig.run.core ) {
	test( "Initialisation error", function() {
		strictEqual( window.Performer.initialisationError, window.Performer.enums.initialisationError.None, "Initialisation error: " + window.Performer.initialisationError );
	});
}

if ( testConfig.runAll || testConfig.run.core ) {
asyncTest( "CSS styles loaded", function() {
		setTimeout(function(){
			ok( ( $('#performerstyles').length ), "CSS styles loaded" );
			start();
		}, 200);
	});
}