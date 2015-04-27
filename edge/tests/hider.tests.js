QUnit.module( "Hider" );

if ( testConfig.runAll || testConfig.run.hider ) {

	QUnit.test( "Hide", function( assert ) {
		var testId = 'hide';
		var el = $( '#' + testId + ' #' + testId + '-target' );
		assert.ok( ! el.is( ':visible' ), 'Hider target hidden');
		assert.ok( el.hasClass( 'hidden' ), 'Hider target has hidden class' );
	});
	
}