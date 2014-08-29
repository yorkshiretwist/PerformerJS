module( "Looper" );

if ( testConfig.runAll || testConfig.run.looper.all || testConfig.run.looper.standard ) {

	test( "Looper default", function() {
		ok( ! $( '#looper1' ).is( ':visible' ) );
		ok( ! $( '#looper2' ).is( ':visible' ) );
		ok( $( '#looper3' ).is( ':visible' ) );
		ok( ! $( '#looper4' ).is( ':visible' ) );
		ok( ! $( '#looper5' ).is( ':visible' ) );
	});

	test( "Target by ID", function() {
		var testId = 'looper-id';
		
		function looperforward() {
			$( '#' + testId + ' .looperforward' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 3 );
				start();
				looperback();
			}, 1000);
		}
           
		function looperback() {
			$( '#' + testId + ' .looperback' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 2 );
				start();
				looperlast();
			}, 1000);
		}
		
		function looperlast() {
			$( '#' + testId + ' .looperlast' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 4 );
				start();
				looperfirst();
			}, 1000);
		}
		
		function looperfirst() {
			$( '#' + testId + ' .looperfirst' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 0 );
				start();
				looperbackfromfirst();
			}, 1000);
		}
		
		function looperbackfromfirst() {
			$( '#' + testId + ' .looperback' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 4 );
				start();
				looperforwardfromlast();
			}, 1000);
		}
		
		function looperforwardfromlast() {
			$( '#' + testId + ' .looperforward' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 0 );
				start();
				looperitem();
			}, 1000);
		}
		
		function looperitem() {
			$( '#' + testId + ' .looperitem' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 2 );
				start();
			}, 1000);
		}
		
		looperforward();
	});
    
    test( "Target by class", function() {
		var testId = 'looper-class';
		
		function looperforward() {
			$( '#' + testId + ' .looperforward' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 3 );
				start();
				looperback();
			}, 1000);
		}
           
		function looperback() {
			$( '#' + testId + ' .looperback' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 2 );
				start();
				looperlast();
			}, 1000);
		}
		
		function looperlast() {
			$( '#' + testId + ' .looperlast' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 4 );
				start();
				looperfirst();
			}, 1000);
		}
		
		function looperfirst() {
			$( '#' + testId + ' .looperfirst' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 0 );
				start();
				looperbackfromfirst();
			}, 1000);
		}
		
		function looperbackfromfirst() {
			$( '#' + testId + ' .looperback' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 4 );
				start();
				looperforwardfromlast();
			}, 1000);
		}
		
		function looperforwardfromlast() {
			$( '#' + testId + ' .looperforward' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 0 );
				start();
				looperitem();
			}, 1000);
		}
		
		function looperitem() {
			$( '#' + testId + ' .looperitem' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 2 );
				start();
			}, 1000);
		}
		
		looperforward();
	});
	
	test( "Target by class parameter", function() {
		var testId = 'looper-class-param';
		
		function looperforward() {
			$( '#' + testId + ' .looperforward' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 3 );
				start();
				looperback();
			}, 1000);
		}
           
		function looperback() {
			$( '#' + testId + ' .looperback' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 2 );
				start();
				looperlast();
			}, 1000);
		}
		
		function looperlast() {
			$( '#' + testId + ' .looperlast' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 4 );
				start();
				looperfirst();
			}, 1000);
		}
		
		function looperfirst() {
			$( '#' + testId + ' .looperfirst' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 0 );
				start();
				looperbackfromfirst();
			}, 1000);
		}
		
		function looperbackfromfirst() {
			$( '#' + testId + ' .looperback' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 4 );
				start();
				looperforwardfromlast();
			}, 1000);
		}
		
		function looperforwardfromlast() {
			$( '#' + testId + ' .looperforward' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 0 );
				start();
				looperitem();
			}, 1000);
		}
		
		function looperitem() {
			$( '#' + testId + ' .looperitem' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperlist1 li:visible' ).length, 1 );
				equal( $( '#looperlist1 li:visible' ).index(), 2 );
				start();
			}, 1000);
		}
		
		looperforward();
	});
       		
}

if ( testConfig.runAll || testConfig.run.looper.all || testConfig.run.looper.autoplay ) {

	test( "Auto-play looper default", function() {
		ok( $( '#autoplaylooper1' ).is( ':visible' ) );
		ok( ! $( '#autoplaylooper2' ).is( ':visible' ) );
		ok( ! $( '#autoplaylooper3' ).is( ':visible' ) );
		ok( ! $( '#autoplaylooper4' ).is( ':visible' ) );
		ok( ! $( '#autoplaylooper5' ).is( ':visible' ) );
	});
	
	test( "Pause and play", function() {
		var testId = 'looper-controls';
		
		function looperpause() {
			var currentIndex = $( '#looperautolist' ).children( ':visible' ).index();
			$( '#' + testId + ' .looperpause' ).click();
			stop();
			setTimeout(function(){
				equal( $( '#looperautolist' ).children( ':visible' ).index(), currentIndex );
				start();
				looperplay();
			}, 2000);
		}
		
		function looperplay() {
			var currentIndex = $( '#looperautolist' ).children( ':visible' ).index();
			$( '#' + testId + ' .looperplay' ).click();
			stop();
			setTimeout(function(){
				notEqual( $( '#looperautolist' ).children( ':visible' ).index(), currentIndex );
				start();
			}, 3000);
		}
		
		looperpause();
	});
}