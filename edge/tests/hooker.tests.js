QUnit.module( "Hooker" );

if ( testConfig.runAll || testConfig.run.hooker ) {

	QUnit.test( "Hooker click", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-click' );
		el.click();
		assert.equal( hookerTarget.html(), 'Clicked, hooker-click', 'Element clicked' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker click (class param)", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-click-class-param' );
		el.click();
		assert.equal( hookerTarget.html(), 'Clicked, hooker-click-class-param', 'Element clicked' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker keypress", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-keypress' );
		el.focus();
		var e = $.Event( 'keypress', { keyCode: 50 } );
		el.trigger( e );
		assert.equal( hookerTarget.html(), 'Keypress, hooker-keypress, 50', 'Key pressed' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker keypress (class param)", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-keypress-class-param' );
		el.focus();
		var e = $.Event( 'keypress', { keyCode: 50 } );
		el.trigger( e );
		assert.equal( hookerTarget.html(), 'Keypress, hooker-keypress-class-param, 50', 'Key pressed' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker keydown", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-keydown' );
		el.focus();
		var e = $.Event( 'keydown', { keyCode: 27 } );
		el.trigger( e );
		assert.equal( hookerTarget.html(), 'Keydown, hooker-keydown, 27', 'Key downed' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker keydown (class param)", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-keydown-class-param' );
		el.focus();
		var e = $.Event( 'keydown', { keyCode: 27 } );
		el.trigger( e );
		assert.equal( hookerTarget.html(), 'Keydown, hooker-keydown-class-param, 27', 'Key downed' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker change (select)", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-change-select' );
		el.val( '3' ).change();
		assert.equal( hookerTarget.html(), 'Change, hooker-change-select', 'Select changed' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker change (select) (class param)", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-change-select-class-param' );
		el.val( '3' ).change();
		assert.equal( hookerTarget.html(), 'Change, hooker-change-select-class-param', 'Select changed' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker change (checkbox)", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-change-checkbox' );
		el.prop('checked', true).change();
		assert.equal( hookerTarget.html(), 'Change, hooker-change-checkbox', 'Checkbox changed' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker change (checkbox) (class param)", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-change-checkbox-class-param' );
		el.prop('checked', true).change();
		assert.equal( hookerTarget.html(), 'Change, hooker-change-checkbox-class-param', 'Checkbox changed' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker submit", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-submit button' );
		el.click();
		assert.equal( hookerTarget.html(), 'Submit, hooker-submit', 'Form submitted' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker submit (class param)", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-submit-class-param button' );
		el.click();
		assert.equal( hookerTarget.html(), 'Submit, hooker-submit-class-param', 'Form submitted' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker focus", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-focus' );
		el.focus();
		assert.equal( hookerTarget.html(), 'Focus, hooker-focus', 'Element  focussed' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker focus (class param)", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-focus-class-param' );
		el.focus();
		assert.equal( hookerTarget.html(), 'Focus, hooker-focus-class-param', 'Element  focussed' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker blur", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-blur' );
		el.focus();
		el.blur();
		assert.equal( hookerTarget.html(), 'Blur, hooker-blur', 'Element  blurred' );
		hookerTarget.html( 'Target' );
		
	});
	
	QUnit.test( "Hooker blur (class param)", function( assert ) {
	
		var hookerTarget = $( '#hooker-target' );
		
		var el = $( '#hooker-blur-class-param' );
		el.focus();
		el.blur();
		assert.equal( hookerTarget.html(), 'Blur, hooker-blur-class-param', 'Element  blurred' );
		hookerTarget.html( 'Target' );
		
	});
}