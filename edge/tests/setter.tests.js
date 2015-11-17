QUnit.module( "Setter" );

if ( testConfig.runAll || testConfig.run.setter ) {

	QUnit.test( "Select: Link", function( assert ) {
		var testId = 'setter';
		var target = $( '#setter-select' );
		var el = $( '#' + testId + '-select-link' );
		
		el[0].click();
		
		assert.equal( target.val(), '3' );
		
		target.val('1');
	});
	
	QUnit.test( "Select: Button", function( assert ) {
		var testId = 'setter';
		var target = $( '#setter-select' );
		var el = $( '#' + testId + '-select-button' );
		
		el[0].click();
		
		assert.equal( target.val(), '3' );
		target.val('1');
	});
	
	QUnit.test( "Select: Link (class parameter)", function( assert ) {
		var testId = 'setter';
		var target = $( '#setter-select-class-param' );
		var el = $( '#' + testId + '-select-class-param-link' );
		
		el[0].click();
		
		assert.equal( target.val(), '3' );
		
		target.val('1');
	});
	
	QUnit.test( "Select: Button (class parameter)", function( assert ) {
		var testId = 'setter';
		var target = $( '#setter-select-class-param' );
		var el = $( '#' + testId + '-select-class-param-button' );
		
		el[0].click();
		
		assert.equal( target.val(), '3' );
		target.val('1');
	});
	
	QUnit.test( "Input: Link", function( assert ) {
		var testId = 'setter';
		var target = $( '#setter-input' );
		var el = $( '#' + testId + '-input-link' );
		
		el[0].click();
		
		assert.equal( target.val(), '3' );
		
		target.val('1');
	});
	
	QUnit.test( "Input: Button", function( assert ) {
		var testId = 'setter';
		var target = $( '#setter-input' );
		var el = $( '#' + testId + '-input-button' );
		
		el[0].click();
		
		assert.equal( target.val(), '3' );
		target.val('1');
	});
	
	QUnit.test( "Input: Link (class parameter)", function( assert ) {
		var testId = 'setter';
		var target = $( '#setter-input-class-param' );
		var el = $( '#' + testId + '-input-class-param-link' );
		
		el[0].click();
		
		assert.equal( target.val(), '3' );
		
		target.val('1');
	});
	
	QUnit.test( "Input: Button (class parameter)", function( assert ) {
		var testId = 'setter';
		var target = $( '#setter-input-class-param' );
		var el = $( '#' + testId + '-input-class-param-button' );
		
		el[0].click();
		
		assert.equal( target.val(), '3' );
		target.val('1');
	});
	
}