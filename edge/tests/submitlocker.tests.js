module( "SubmitLocker" );
if ( testConfig.runAll || testConfig.run.submitlocker ) {

	test( "SubmitLocker", function() {
	
		$( '#SubmitLocker form' ).on ('submit', function(e) {
			e.preventDefault();
			return false;
		});
	
		$( '#SubmitLocker #submit1' ).click();
	
		ok( $( '#SubmitLocker #submit1' ).is( ":disabled" ), '#submit1 disabled' );
		ok( $( '#SubmitLocker #submit2' ).is( ":disabled" ), '#submit2 disabled' );
		
	});
}