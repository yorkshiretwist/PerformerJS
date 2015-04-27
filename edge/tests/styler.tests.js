QUnit.module( "Styler" );

if ( testConfig.runAll || testConfig.run.styler ) {

	QUnit.test( "Target by ID", function( assert ) {
		var testId = 'styler-id';
		
		$( '#' + testId + ' a.styler' ).click();
		
		assert.ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	QUnit.test( "Target by class", function( assert ) {
		var testId = 'styler-class';
		
		$( '#' + testId + ' a.styler' ).click();
		
		assert.ok( $( '.' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	QUnit.test( "Target by class parameter", function( assert ) {
		var testId = 'styler-class-param';
		
		$( '#' + testId + ' a.styler' ).click();
		
		assert.ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	QUnit.test( "Target by ID with delay", function( assert ) {
		var testId = 'styler-id-delay';
		
		$( '#' + testId + ' a.styler' ).click();
		stop();
		
		setTimeout(function(){
			assert.ok( ! $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Toggle target does not have class after 1000ms');
			start();
			stop();
			setTimeout(function(){
				assert.ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Toggle target has class after 2500ms');
				start();
			}, 1500);
		}, 1000);
	});
	
	QUnit.test( "Target by class parameter with delay", function( assert ) {
		var testId = 'styler-class-param-delay';
		
		var done1 = assert.async();
		var done2 = assert.async();
		
		doit();
		
		function doit() {
			console.log(testId + ' - doit()');
			$( '#' + testId + ' a.styler' ).click();
			
			setTimeout(function(){
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( ! $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Toggle target does not have class after 1000ms');
				done1();
				setTimeout(function(){
					assert.ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Toggle target has class after 2500ms');
					done2();
				}, 1500);
			}, 1000);
		}
	});
	
	QUnit.test( "Style by button[button]", function( assert ) {
		var testId = 'styler-button';
		
		$( '#' + testId + ' button.styler' ).click();
		
		assert.ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	QUnit.test( "Style by button[submit]", function( assert ) {
		var testId = 'styler-submit';
		
		$( '#' + testId + ' button.styler' ).click();
		
		assert.ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	QUnit.test( "Style by input[button]", function( assert ) {
		var testId = 'styler-input';
		
		$( '#' + testId + ' input.styler' ).click();
		
		assert.ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	QUnit.test( "Style by input[submit]", function( assert ) {
		var testId = 'styler-input-submit';
		
		$( '#' + testId + ' input.styler' ).click();
		
		assert.ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
	});
	
	QUnit.test( "Style by checkbox", function( assert ) {
		var testId = 'styler-checkbox';
		
		$( '#' + testId + ' input.styler' ).click();
			
		assert.ok( $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has class' );
		
		$( '#' + testId + ' input.styler' ).click();
			
		assert.ok( ! $( '#' + testId + '-target' ).hasClass( 'highlight' ), 'Target has had class removed' );
	});
    
    QUnit.test( "Style by radio option", function( assert ) {
        var testId = 'styler-radio';
        
        $( '#' + testId + '-option1' ).click();
        
        assert.ok( $( '#' + testId + '-target1' ).hasClass( 'highlight' ), 'Target 1 has class' );
        
        $( '#' + testId + '-option2' ).click();
        
        assert.ok( ! $( '#' + testId + '-target1' ).hasClass( 'highlight' ), 'Target 1 has had class removed' );
        assert.ok( $( '#' + testId + '-target2' ).hasClass( 'highlight' ), 'Target 2 has class' );
    });
}