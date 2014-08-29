module( "Focusser" );
if ( testConfig.runAll || testConfig.run.focusser ) {

	test( "Focusser", function() {
	
		ok( $( '#Focusser input' ).is( ":focus" ), 'Element focussed' );
		
	});
}