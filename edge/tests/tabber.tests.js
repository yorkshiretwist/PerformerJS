module( "Tabber" );

if ( testConfig.runAll || testConfig.run.tabber ) {
    
    test( "Target by ID", function() {
		var testId = 'tabber-id';
		
		$( '#' + testId + ' a#tabber-id-tab2' ).click();
		
		ok( ! $( '#tabs #tab1' ).is( ':visible' ) );
        ok( $( '#tabs #tab2' ).is( ':visible' ) );
        ok( ! $( '#tabs #tab3' ).is( ':visible' ) );
           
        $( '#' + testId + ' a#tabber-id-tab1' ).click();
		
		ok( $( '#tabs #tab1' ).is( ':visible' ) );
        ok( ! $( '#tabs #tab2' ).is( ':visible' ) );
        ok( ! $( '#tabs #tab3' ).is( ':visible' ) );
	});
    
    test( "Target by class", function() {
		var testId = 'tabber-class';
		
		$( '#' + testId + ' a#tabber-class-tab3' ).click();
		
		ok( ! $( '#tabs #tab1' ).is( ':visible' ) );
        ok( ! $( '#tabs #tab2' ).is( ':visible' ) );
        ok( $( '#tabs #tab3' ).is( ':visible' ) );
           
        $( '#' + testId + ' a#tabber-class-tab1' ).click();
		
		ok( $( '#tabs #tab1' ).is( ':visible' ) );
        ok( ! $( '#tabs #tab2' ).is( ':visible' ) );
        ok( ! $( '#tabs #tab3' ).is( ':visible' ) );
	});
        
    test( "Target by class parameter", function() {
		var testId = 'tabber-class-param';
		
		$( '#' + testId + ' a#tabber-class-param-tab3' ).click();
		
		ok( ! $( '#tabs #tab1' ).is( ':visible' ) );
        ok( ! $( '#tabs #tab2' ).is( ':visible' ) );
        ok( $( '#tabs #tab3' ).is( ':visible' ) );
           
        $( '#' + testId + ' a#tabber-class-param-tab1' ).click();
		
		ok( $( '#tabs #tab1' ).is( ':visible' ) );
        ok( ! $( '#tabs #tab2' ).is( ':visible' ) );
        ok( ! $( '#tabs #tab3' ).is( ':visible' ) );
	});
	
	test( "Target by select", function() {
		var testId = 'tabber-select';
		
		$( '#' + testId + ' #tabber-select-list' ).val( '2' ).change();
		
		ok( ! $( '#tabs #tab1' ).is( ':visible' ) );
        ok( $( '#tabs #tab2' ).is( ':visible' ) );
        ok( ! $( '#tabs #tab3' ).is( ':visible' ) );
           
        $( '#' + testId + ' #tabber-select-list' ).val( '3' ).change();
		
		ok( ! $( '#tabs #tab1' ).is( ':visible' ) );
        ok( ! $( '#tabs #tab2' ).is( ':visible' ) );
        ok( $( '#tabs #tab3' ).is( ':visible' ) );
	});
	
	test( "Target by radio button", function() {
		var testId = 'tabber-radio';
		
		$( '#' + testId + ' #tabber-radio-tab2' ).click();
		
		ok( ! $( '#tabs #tab1' ).is( ':visible' ) );
        ok( $( '#tabs #tab2' ).is( ':visible' ) );
        ok( ! $( '#tabs #tab3' ).is( ':visible' ) );
           
        $( '#' + testId + ' #tabber-radio-tab1' ).click();
		
		ok( $( '#tabs #tab1' ).is( ':visible' ) );
        ok( ! $( '#tabs #tab2' ).is( ':visible' ) );
        ok( ! $( '#tabs #tab3' ).is( ':visible' ) );
	});
}