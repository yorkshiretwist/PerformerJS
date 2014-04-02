module( "Switcher" );

if ( testConfig.runAll || testConfig.run.switcher ) {

	test( "Target by ID", function() {
		var testId = 'switcher-id';
		
		ok( $( '#' + testId + ' #' + testId + '-target1' ).is( ':visible' ), 'Target 1 visible on page load');
		ok( ! $( '#' + testId + ' #' + testId + '-target2' ).is( ':visible' ), 'Target 2 hidden on page load');
		
		$( '#' + testId + ' a.switcher' ).click();
		
		ok( ! $( '#' + testId + ' #' + testId + '-target1' ).is( ':visible' ), 'Target 1 hidden after first click');
		ok( $( '#' + testId + ' #' + testId + '-target2' ).is( ':visible' ), 'Target 2 visible after first click');
		
		$( '#' + testId + ' a.switcher' ).click();
		
		ok( $( '#' + testId + ' #' + testId + '-target1' ).is( ':visible' ), 'Target 1 visible after second click');
		ok( ! $( '#' + testId + ' #' + testId + '-target2' ).is( ':visible' ), 'Target 2 hidden after second click');
	});
	
	test( "Target by class", function() {
		var testId = 'switcher-class';
		
		ok( $( '#' + testId + ' .' + testId + '-target1' ).is( ':visible' ), 'Target 1 visible on page load');
		ok( ! $( '#' + testId + ' .' + testId + '-target2' ).is( ':visible' ), 'Target 2 hidden on page load');
		
		$( '#' + testId + ' a.switcher' ).click();
		
		ok( ! $( '#' + testId + ' .' + testId + '-target1' ).is( ':visible' ), 'Target 1 hidden after first click');
		ok( $( '#' + testId + ' .' + testId + '-target2' ).is( ':visible' ), 'Target 2 visible after first click');
		
		$( '#' + testId + ' a.switcher' ).click();
		
		ok( $( '#' + testId + ' .' + testId + '-target1' ).is( ':visible' ), 'Target 1 visible after second click');
		ok( ! $( '#' + testId + ' .' + testId + '-target2' ).is( ':visible' ), 'Target 2 hidden after second click');
	});
	
	test( "Target by class parameter", function() {
		var testId = 'switcher-class-param';
		
		ok( $( '#' + testId + ' #' + testId + '-target1' ).is( ':visible' ), 'Target 1 visible on page load');
		ok( ! $( '#' + testId + ' #' + testId + '-target2' ).is( ':visible' ), 'Target 2 hidden on page load');
		
		$( '#' + testId + ' a.switcher' ).click();
		
		ok( ! $( '#' + testId + ' #' + testId + '-target1' ).is( ':visible' ), 'Target 1 hidden after first click');
		ok( $( '#' + testId + ' #' + testId + '-target2' ).is( ':visible' ), 'Target 2 visible after first click');
		
		$( '#' + testId + ' a.switcher' ).click();
		
		ok( $( '#' + testId + ' #' + testId + '-target1' ).is( ':visible' ), 'Target 1 visible after second click');
		ok( ! $( '#' + testId + ' #' + testId + '-target2' ).is( ':visible' ), 'Target 2 hidden after second click');
	});
}