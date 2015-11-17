QUnit.module( "Duplicator" );

if ( testConfig.runAll || testConfig.run.duplicator ) {

	QUnit.test( "Link", function( assert ) {
		var testId = 'duplicator';
		var target = $( '#duplicator-target' );
		var el = $( '#' + testId + '-link' );
		
		var childCount = 2;
		
		el[0].click();
		
		assert.equal( target.children().length, childCount );
		var child = $( target.children()[childCount-1] );
		assert.equal( child.html(), 'Item [' + childCount + '] item_' + childCount );
		assert.equal( child.attr('id'), 'item_' + childCount );
		assert.equal( child.attr('class'), 'item_' + childCount );
	});
	
	QUnit.test( "Button", function( assert ) {
		var testId = 'duplicator';
		var target = $( '#duplicator-target' );
		var el = $( '#' + testId + '-button' );
		
		var childCount = 3;
		
		el[0].click();
		
		assert.equal( target.children().length, childCount );
		var child = $( target.children()[childCount-1] );
		assert.equal( child.html(), 'Item [' + childCount + '] item_' + childCount );
		assert.equal( child.attr('id'), 'item_' + childCount );
		assert.equal( child.attr('class'), 'item_' + childCount );
	});
	
	QUnit.test( "Link (class parameter)", function( assert ) {
		var testId = 'duplicator';
		var target = $( '#duplicator-target' );
		var el = $( '#' + testId + '-link-class-param' );
		
		var childCount = 4;
		
		el[0].click();
		
		assert.equal( target.children().length, childCount );
		var child = $( target.children()[childCount-1] );
		assert.equal( child.html(), 'Item [' + childCount + '] item_' + childCount );
		assert.equal( child.attr('id'), 'item_' + childCount );
		assert.equal( child.attr('class'), 'item_' + childCount );
	});
	
	QUnit.test( "Button (class parameter)", function( assert ) {
		var testId = 'duplicator';
		var target = $( '#duplicator-target' );
		var el = $( '#' + testId + '-button-class-param' );
		
		var childCount = 5;
		
		el[0].click();
		
		assert.equal( target.children().length, childCount );
		var child = $( target.children()[childCount-1] );
		assert.equal( child.html(), 'Item [' + childCount + '] item_' + childCount );
		assert.equal( child.attr('id'), 'item_' + childCount );
		assert.equal( child.attr('class'), 'item_' + childCount );
	});
	
}