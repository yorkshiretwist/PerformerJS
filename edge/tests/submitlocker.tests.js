QUnit.module( "SubmitLocker" );

if ( testConfig.runAll || testConfig.run.submitlocker ) {

	QUnit.test( "SubmitLocker", function( assert ) {
	
		$( '#SubmitLocker form' ).on ('submit', function(e) {
			e.preventDefault();
			return false;
		});
	
		var btn1 = $( '#SubmitLocker #submit1' );
		var btn2 = $( '#SubmitLocker #submit2' );
	
		btn1.click();
	
		assert.ok( btn1.is( ":disabled" ), '#submit1 is disabled' );
		assert.ok( btn1.hasClass( 'disabled' ), '#submit1 has disabled class' );
		assert.ok( btn2.is( ":disabled" ), '#submit2 is disabled' );
		assert.ok( btn2.hasClass( 'disabled' ), '#submit2 has disabled class' );
		
	});
}