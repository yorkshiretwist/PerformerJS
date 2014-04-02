module( "Shower" );

if ( testConfig.runAll || testConfig.run.shower ) {

	test( "Show", function() {
		var testId = 'show';
		ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Shower target visible');
	});
	
}