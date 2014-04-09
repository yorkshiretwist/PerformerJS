module( "Morpher" );

if ( testConfig.runAll || testConfig.run.morpher ) {

	test( "Target by ID", function() {
		var testId = 'morpher-id';
		
		$( '#' + testId + ' a.morpher' ).click();
		
		ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	test( "Target by class", function() {
		var testId = 'morpher-class';
		
		$( '#' + testId + ' a.morpher' ).click();
		
		ok( $( '.' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	test( "Target by class parameter", function() {
		var testId = 'morpher-class-param';
		
		$( '#' + testId + ' a.morpher' ).click();
		
		ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
}