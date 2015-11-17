QUnit.module( "Limiter" );

if ( testConfig.runAll || testConfig.run.limiter ) {

	QUnit.test( "Input", function( assert ) {
		var testId = 'limiter';
		
		var notification = $( '#' + testId + '-input-notification' );
		var input = $( '#' + testId + '-input' );
		input.focus();
		
		var e = $.Event( 'keydown', { keyCode: 49 } );
		input.trigger( e );
		assert.equal( notification.html(), '4 characters left' );
		
		var e = $.Event( 'keydown', { keyCode: 50 } );
		input.trigger( e );
		assert.equal( notification.html(), '3 characters left' );
		
		var e = $.Event( 'keydown', { keyCode: 51 } );
		input.trigger( e );
		assert.equal( notification.html(), '2 characters left' );
		
		var e = $.Event( 'keydown', { keyCode: 52 } );
		input.trigger( e );
		assert.equal( notification.html(), '1 characters left' );
		
		var e = $.Event( 'keydown', { keyCode: 53 } );
		input.trigger( e );
		assert.equal( notification.html(), 'Limit reached' );
	});
	
	
}