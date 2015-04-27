QUnit.module( "Tabber" );

if ( testConfig.runAll || testConfig.run.tabber ) {
    
    QUnit.test( "Target by ID", function( assert ) {
		var testId = 'tabber-id';
		
		$( '#' + testId + ' a#tabber-id-tab2' ).click();
		
		assert.ok( ! $( '#tabs #tab1' ).is( ':visible' ) );
        assert.ok( $( '#tabs #tab2' ).is( ':visible' ) );
        assert.ok( ! $( '#tabs #tab3' ).is( ':visible' ) );
           
        $( '#' + testId + ' a#tabber-id-tab1' ).click();
		
		assert.ok( $( '#tabs #tab1' ).is( ':visible' ) );
        assert.ok( ! $( '#tabs #tab2' ).is( ':visible' ) );
        assert.ok( ! $( '#tabs #tab3' ).is( ':visible' ) );
	});
    
    QUnit.test( "Target by class", function( assert ) {
		var testId = 'tabber-class';
		
		$( '#' + testId + ' a#tabber-class-tab3' ).click();
		
		assert.ok( ! $( '#tabs #tab1' ).is( ':visible' ) );
        assert.ok( ! $( '#tabs #tab2' ).is( ':visible' ) );
        assert.ok( $( '#tabs #tab3' ).is( ':visible' ) );
           
        $( '#' + testId + ' a#tabber-class-tab1' ).click();
		
		assert.ok( $( '#tabs #tab1' ).is( ':visible' ) );
        assert.ok( ! $( '#tabs #tab2' ).is( ':visible' ) );
        assert.ok( ! $( '#tabs #tab3' ).is( ':visible' ) );
	});
        
    QUnit.test( "Target by class parameter", function( assert ) {
		var testId = 'tabber-class-param';
		
		$( '#' + testId + ' a#tabber-class-param-tab3' ).click();
		
		assert.ok( ! $( '#tabs #tab1' ).is( ':visible' ) );
        assert.ok( ! $( '#tabs #tab2' ).is( ':visible' ) );
        assert.ok( $( '#tabs #tab3' ).is( ':visible' ) );
           
        $( '#' + testId + ' a#tabber-class-param-tab1' ).click();
		
		assert.ok( $( '#tabs #tab1' ).is( ':visible' ) );
        assert.ok( ! $( '#tabs #tab2' ).is( ':visible' ) );
        assert.ok( ! $( '#tabs #tab3' ).is( ':visible' ) );
	});
	
	QUnit.test( "Target by select", function( assert ) {
		var testId = 'tabber-select';
		
		$( '#' + testId + ' #tabber-select-list' ).val( '2' ).change();
		
		assert.ok( ! $( '#tabs #tab1' ).is( ':visible' ) );
        assert.ok( $( '#tabs #tab2' ).is( ':visible' ) );
        assert.ok( ! $( '#tabs #tab3' ).is( ':visible' ) );
           
        $( '#' + testId + ' #tabber-select-list' ).val( '3' ).change();
		
		assert.ok( ! $( '#tabs #tab1' ).is( ':visible' ) );
        assert.ok( ! $( '#tabs #tab2' ).is( ':visible' ) );
        assert.ok( $( '#tabs #tab3' ).is( ':visible' ) );
	});
	
	QUnit.test( "Target by radio button", function( assert ) {
		var testId = 'tabber-radio';
		
		$( '#' + testId + ' #tabber-radio-tab2' ).click();
		
		assert.ok( ! $( '#tabs #tab1' ).is( ':visible' ) );
        assert.ok( $( '#tabs #tab2' ).is( ':visible' ) );
        assert.ok( ! $( '#tabs #tab3' ).is( ':visible' ) );
           
        $( '#' + testId + ' #tabber-radio-tab1' ).click();
		
		assert.ok( $( '#tabs #tab1' ).is( ':visible' ) );
        assert.ok( ! $( '#tabs #tab2' ).is( ':visible' ) );
        assert.ok( ! $( '#tabs #tab3' ).is( ':visible' ) );
	});
}