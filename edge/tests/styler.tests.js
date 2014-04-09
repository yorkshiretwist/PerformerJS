module( "Styler" );

if ( testConfig.runAll || testConfig.run.styler ) {

	test( "Target by ID", function() {
		var testId = 'styler-id';
		
		$( '#' + testId + ' a.styler' ).click();
		
		ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	test( "Target by class", function() {
		var testId = 'styler-class';
		
		$( '#' + testId + ' a.styler' ).click();
		
		ok( $( '.' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	test( "Target by class parameter", function() {
		var testId = 'styler-class-param';
		
		$( '#' + testId + ' a.styler' ).click();
		
		ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	test( "Target by ID with delay", function() {
		var testId = 'styler-id-delay';
		
		$( '#' + testId + ' a.styler' ).click();
		stop();
		
		setTimeout(function(){
			ok( ! $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Toggle target does not have class after 1000ms');
			start();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Toggle target has class after 2500ms');
				start();
			}, 1500);
		}, 1000);
	});
	
	test( "Target by class parameter with delay", function() {
		var testId = 'styler-class-param-delay';
		
		$( '#' + testId + ' a.styler' ).click();
		stop();
		
		setTimeout(function(){
			ok( ! $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Toggle target does not have class after 1000ms');
			start();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Toggle target has class after 2500ms');
				start();
			}, 1500);
		}, 1000);
	});
	
	test( "Style by button[button]", function() {
		var testId = 'styler-button';
		
		$( '#' + testId + ' button.styler' ).click();
		
		ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	test( "Style by button[submit]", function() {
		var testId = 'styler-submit';
		
		$( '#' + testId + ' button.styler' ).click();
		
		ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	test( "Style by input[button]", function() {
		var testId = 'styler-input';
		
		$( '#' + testId + ' input.styler' ).click();
		
		ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	test( "Style by input[submit]", function() {
		var testId = 'styler-input-submit';
		
		$( '#' + testId + ' input.styler' ).click();
		
		ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	test( "Style by checkbox", function() {
		var testId = 'styler-checkbox';
		
		$( '#' + testId + ' input.styler' ).click();
			
		ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
		
		$( '#' + testId + ' input.styler' ).click();
			
		ok( ! $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has had class removed' );
	});
    
    test( "Style by radio option", function() {
        var testId = 'styler-radio';
        
        $( '#' + testId + '-option1' ).click();
        
        ok( $( '#' + testId + '-target1' ).hasClass( 'highlight' ), 'Target 1 has class' );
        
        $( '#' + testId + '-option2' ).click();
        
        ok( ! $( '#' + testId + '-target1' ).hasClass( 'highlight' ), 'Target 1 has had class removed' );
        ok( $( '#' + testId + '-target2' ).hasClass( 'highlight' ), 'Target 2 has class' );
    });
}