module( "Hider" );

if ( testConfig.runAll || testConfig.run.hider ) {

	test( "Hide", function() {
		var testId = 'hide';
		ok( ! $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Hider target hidden');
	});
	
}