module( "Tabber" );

if ( testConfig.runAll || testConfig.run.tabber ) {
    
    test( "Target by ID", function() {
		var testId = 'tabber-id';
		
		$( '#' + testId + ' a#tabber-id-tab2' ).click();
		
		ok( ! $( '#' + testId + ' #tab1' ).is( ':visible' ) );
        ok( $( '#' + testId + ' #tab2' ).is( ':visible' ) );
        ok( ! $( '#' + testId + ' #tab3' ).is( ':visible' ) );
           
        $( '#' + testId + ' a#tabber-id-tab1' ).click();
		
		ok( $( '#' + testId + ' #tab1' ).is( ':visible' ) );
        ok( ! $( '#' + testId + ' #tab2' ).is( ':visible' ) );
        ok( ! $( '#' + testId + ' #tab3' ).is( ':visible' ) );
	});
    
    test( "Target by class", function() {
		var testId = 'tabber-class';
		
		$( '#' + testId + ' a#tabber-id-tab3' ).click();
		
		ok( ! $( '#' + testId + ' #tab1' ).is( ':visible' ) );
        ok( ! $( '#' + testId + ' #tab2' ).is( ':visible' ) );
        ok( $( '#' + testId + ' #tab3' ).is( ':visible' ) );
           
        $( '#' + testId + ' a#tabber-id-tab1' ).click();
		
		ok( $( '#' + testId + ' #tab1' ).is( ':visible' ) );
        ok( ! $( '#' + testId + ' #tab2' ).is( ':visible' ) );
        ok( ! $( '#' + testId + ' #tab3' ).is( ':visible' ) );
	});
        
    test( "Target by class parameter", function() {
		var testId = 'tabber-class-param';
		
		$( '#' + testId + ' a#tabber-class-param-tab3' ).click();
		
		ok( ! $( '#' + testId + ' #tab1' ).is( ':visible' ) );
        ok( ! $( '#' + testId + ' #tab2' ).is( ':visible' ) );
        ok( $( '#' + testId + ' #tab3' ).is( ':visible' ) );
           
        $( '#' + testId + ' a#tabber-iclass-param-tab1' ).click();
		
		ok( $( '#' + testId + ' #tab1' ).is( ':visible' ) );
        ok( ! $( '#' + testId + ' #tab2' ).is( ':visible' ) );
        ok( ! $( '#' + testId + ' #tab3' ).is( ':visible' ) );
	});
}