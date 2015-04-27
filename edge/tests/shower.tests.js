QUnit.module( "Shower" );

if ( testConfig.runAll || testConfig.run.shower ) {

	QUnit.test( "Show", function( assert ) {
		var testId = 'show';
		var el = $( '#' + testId + ' #' + testId + '-target' );
		assert.ok( el.is( ':visible' ), 'Shower target visible');
		assert.ok( el.hasClass( 'shown' ), 'Shower target has shown class' );
	});
	
}