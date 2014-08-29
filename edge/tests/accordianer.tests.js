module( "Accordianer" );

if ( testConfig.runAll || testConfig.run.accordianer ) {

	test( "Target by ID", function() {
		var testId = 'accordian-id';
		
		function test1() {
			$( '#' + testId + ' a#accordian-id-item2' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#accordian #accordian1' ).is( ':visible' ) );
				ok( $( '#accordian #accordian2' ).is( ':visible' ) );
				ok( ! $( '#accordian #accordian3' ).is( ':visible' ) );
				start();
				test2();
			}, 1000);
		}
		
		function test2() {
			$( '#' + testId + ' a#accordian-id-item1' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#accordian #accordian1' ).is( ':visible' ) );
				ok( ! $( '#accordian #accordian2' ).is( ':visible' ) );
				ok( ! $( '#accordian #accordian3' ).is( ':visible' ) );
				start();
			}, 1000);
		}
		
		test1();
	});
    
    test( "Target by class", function() {
		var testId = 'accordian-class';
		
		function test1() {
			$( '#' + testId + ' a#accordian-class-item3' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#accordian #accordian1' ).is( ':visible' ) );
				ok( ! $( '#accordian #accordian2' ).is( ':visible' ) );
				ok( $( '#accordian #accordian3' ).is( ':visible' ) );
				start();
				test2();
			}, 1000);
		}
           
		function test2() {
			$( '#' + testId + ' a#accordian-class-item1' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#accordian #accordian1' ).is( ':visible' ) );
				ok( ! $( '#accordian #accordian2' ).is( ':visible' ) );
				ok( ! $( '#accordian #accordian3' ).is( ':visible' ) );
				start();
			}, 1000);
		}
		
		test1();
	});
        
    test( "Target by class parameter", function() {
		var testId = 'accordian-class-param';
		
		function test1() {
			$( '#' + testId + ' a#accordian-class-param-item3' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#accordian #accordian1' ).is( ':visible' ) );
				ok( ! $( '#accordian #accordian2' ).is( ':visible' ) );
				ok( $( '#accordian #accordian3' ).is( ':visible' ) );
				start();
				test2();
			}, 1000);
		}
           
		function test2() {
			$( '#' + testId + ' a#accordian-class-param-item1' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#accordian #accordian1' ).is( ':visible' ) );
				ok( ! $( '#accordian #accordian2' ).is( ':visible' ) );
				ok( ! $( '#accordian #accordian3' ).is( ':visible' ) );
				start();
			}, 1000);
		}
		
		test1();
	});
	
	test( "Target by select", function() {
		var testId = 'accordian-select';
		
		function test1() {
			$( '#' + testId + ' #accordianer-select-list' ).prop( 'selectedIndex', 1 ).change();
			stop();
			setTimeout(function(){
				ok( ! $( '#accordian #accordian1' ).is( ':visible' ) );
				ok( $( '#accordian #accordian2' ).is( ':visible' ) );
				ok( ! $( '#accordian #accordian3' ).is( ':visible' ) );
				start();
				test2();
			}, 1000);
		}
           
		function test2() {
			$( '#' + testId + ' #accordianer-select-list' ).prop( 'selectedIndex', 2 ).change();
			stop();
			setTimeout(function(){
				ok( ! $( '#accordian #accordian1' ).is( ':visible' ) );
				ok( ! $( '#accordian #accordian2' ).is( ':visible' ) );
				ok( $( '#accordian #accordian3' ).is( ':visible' ) );
				start();
			}, 1000);
		}
		
		test1();
	});
	
	test( "Target by radio button", function() {
		var testId = 'accordian-radio';
		
		function test1() {
			$( '#' + testId + ' #accordianer-radio-item2' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#accordian #accordian1' ).is( ':visible' ) );
				ok( $( '#accordian #accordian2' ).is( ':visible' ) );
				ok( ! $( '#accordian #accordian3' ).is( ':visible' ) );
				start();
				test2();
			}, 1000);
		}
           
		function test2() {
			$( '#' + testId + ' #accordianer-radio-item1' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#accordian #accordian1' ).is( ':visible' ) );
				ok( ! $( '#accordian #accordian2' ).is( ':visible' ) );
				ok( ! $( '#accordian #accordian3' ).is( ':visible' ) );
				start();
			}, 1000);
		}
		
		test1();
	});
}