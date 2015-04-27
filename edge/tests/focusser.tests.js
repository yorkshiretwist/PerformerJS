module( "Focusser" );
if ( testConfig.runAll || testConfig.run.focusser ) {

	test( "Focusser", function() {
	
		var el = $( '#Focusser input' );
		ok( el.hasClass( 'focussed' ), 'Element has focussed class' );
		ok( el.is( ":focus" ), 'Element focussed' );
		
	});
}