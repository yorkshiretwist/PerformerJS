QUnit.module( "Hooker" );

if ( testConfig.runAll || testConfig.run.hooker ) {

	QUnit.test( "Hooker click", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-click' );
		el.click();
		assert.equal( 'Clicked', hookerTarget.html() );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker click (class param)", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-click-class-param' );
		el.click();
		assert.equal( 'Clicked', hookerTarget.html() );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker keypress", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-keypress' );
		var e = jQuery.Event( 'keydown' );
		e.which = 50;
		e.keyCode = 50;
		el.trigger( e );
		assert.equal( 'Keypress', hookerTarget.html() );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker keypress (class param)", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-keypress-class-param' );
		var e = jQuery.Event( 'keydown' );
		e.which = 50;
		e.keyCode = 50;
		el.trigger( e );
		assert.equal( 'Keypress', hookerTarget.html() );
		hookerTarget.html( 'Target' );
		
	});
}