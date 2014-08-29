module( "Truncator" );

if ( testConfig.runAll || testConfig.run.truncator ) {

	test( "Truncator", function() {
	
		equal( $( '#truncator-1' ).find( 'span' ).length, 2, '2 spans created');
		ok( $( '#truncator-1_truncated' ).length, 'Truncated span created' );
		ok( $( '#truncator-1_full' ).length, 'Full span created' );
		ok( $( '#truncator-1_truncated' ).is( ':visible' ), 'Truncated span is shown' );
		ok( ! $( '#truncator-1_truncated' ).hasClass( 'hider' ), 'Truncated span does not have hider class' );
		ok( ! $( '#truncator-1_full' ).is( ':visible' ), 'Full span is hidden' );
		ok( $( '#truncator-1_full' ).hasClass( 'hider' ), 'Full span has hider class' );
		
		var truncatedElement = $( '#truncator-1_truncated' ).clone();
		truncatedElement.children().remove();
		ok( truncatedElement.html().trim().length <= 50 , 'Truncated text is less than 50 characters' );
		
		var fullElement = $( '#truncator-1_full' ).clone();
		fullElement.children().remove();
		ok( fullElement.html().trim().length > 50 , 'Full text is more than 50 characters' );
		
		$( '#truncator-1_truncated a.switcher' ).click();
		
		ok( ! $( '#truncator-1_truncated' ).is( ':visible' ), 'Truncated span is hidden' );
		ok( $( '#truncator-1_truncated' ).hasClass( 'hider' ), 'Truncated span has hider class' );
		ok( $( '#truncator-1_full' ).is( ':visible' ), 'Full span is hidden' );
		ok( ! $( '#truncator-1_full' ).hasClass( 'hider' ), 'Full span does not have hider class' );
		
		$( '#truncator-1_full a.switcher' ).click();
		
		ok( $( '#truncator-1_truncated' ).is( ':visible' ), 'Truncated span is shown' );
		ok( ! $( '#truncator-1_truncated' ).hasClass( 'hider' ), 'Truncated span does not have hider class' );
		ok( ! $( '#truncator-1_full' ).is( ':visible' ), 'Full span is hidden' );
		ok( $( '#truncator-1_full' ).hasClass( 'hider' ), 'Full span has hider class' );
		
	});

	test( "Truncator with limit", function() {
		
		var truncatedElement = $( '#truncator-2_truncated' ).clone();
		truncatedElement.children().remove();
		ok( truncatedElement.html().trim().length <= 20 , 'Truncated text is less than 20 characters' );
		
		var fullElement = $( '#truncator-2_full' ).clone();
		fullElement.children().remove();
		ok( fullElement.html().trim().length > 20 , 'Full text is more than 20 characters' );
		
	});

	test( "Truncator with defined text", function() {
		
		equal( $( '#truncator-3_truncated a.switcher' ).text(), 'Read more', 'Read more is set' );
		
		equal( $( '#truncator-3_full a.switcher' ).text(), 'Read less', 'Read less text is set' );
		
	});
}