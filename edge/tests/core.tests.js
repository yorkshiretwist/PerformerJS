QUnit.module( "Core" );

if ( testConfig.runAll || testConfig.run.core ) {
	QUnit.test( "Performer loaded", function( assert ) {
		assert.ok( window.Performer, "Performer is loaded" );
	});
}

if ( testConfig.runAll || testConfig.run.core ) {
	QUnit.test( "Performer initialised", function( assert ) {
		assert.ok( window.Performer.isInitialised, "Performer is initialised" );
	});
}

if ( testConfig.runAll || testConfig.run.core ) {
	QUnit.test( "Initialisation error", function( assert ) {
		assert.strictEqual( window.Performer.initialisationError, window.Performer.enums.initialisationError.None, "Initialisation error: " + window.Performer.initialisationError );
	});
}

if ( testConfig.runAll || testConfig.run.core ) {
	QUnit.test( "CSS styles loaded", function( assert ) {
		var done = assert.async();
		setTimeout(function(){
			assert.ok( ( $('#performerstyles').length ), "CSS styles loaded" );
			done();
		}, 200);
	});
}

if (!window.console){
	window.console = {
		log: function(){}
	};
}