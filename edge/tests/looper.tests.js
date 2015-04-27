QUnit.module( "Looper" );

if ( testConfig.runAll || testConfig.run.looper.all || testConfig.run.looper.standard ) {

	QUnit.test( "Looper default", function( assert ) {
		assert.ok( ! $( '#looper1' ).is( ':visible' ) );
		assert.ok( ! $( '#looper2' ).is( ':visible' ) );
		assert.ok( $( '#looper3' ).is( ':visible' ) );
		assert.ok( ! $( '#looper4' ).is( ':visible' ) );
		assert.ok( ! $( '#looper5' ).is( ':visible' ) );
	});

	QUnit.test( "Target by ID", function( assert ) {
		var testId = 'looper-id';
		var looperforwarddone = assert.async();
		var looperbackdone = assert.async();
		var looperlastdone = assert.async();
		var looperfirstdone = assert.async();
		var looperbackfromfirstdone = assert.async();
		var looperforwardfromlastdone = assert.async();
		var looperitemdone = assert.async();
		
		looperforward();
		
		function looperforward() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 3 );
				looperforwarddone();
				looperback();
			};
			$( '#' + testId + ' .looperforward' ).click();
		}
           
		function looperback() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 2 );
				looperbackdone();
				looperlast();
			};
			$( '#' + testId + ' .looperback' ).click();
		}
		
		function looperlast() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 4 );
				looperlastdone();
				looperfirst();
			};
			$( '#' + testId + ' .looperlast' ).click();
		}
		
		function looperfirst() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 0 );
				looperfirstdone();
				looperbackfromfirst();
			};
			$( '#' + testId + ' .looperfirst' ).click();
		}
		
		function looperbackfromfirst() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 4 );
				looperbackfromfirstdone();
				looperforwardfromlast();
			};
			$( '#' + testId + ' .looperback' ).click();
		}
		
		function looperforwardfromlast() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 0 );
				looperforwardfromlastdone();
				looperitem();
			};
			$( '#' + testId + ' .looperforward' ).click();
		}
		
		function looperitem() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 2 );
				looperitemdone();
			};
			$( '#' + testId + ' .looperitem' ).click();
		}
	});
    
    QUnit.test( "Target by class", function( assert ) {
		var testId = 'looper-class';
		var looperforwarddone = assert.async();
		var looperbackdone = assert.async();
		var looperlastdone = assert.async();
		var looperfirstdone = assert.async();
		var looperbackfromfirstdone = assert.async();
		var looperforwardfromlastdone = assert.async();
		var looperitemdone = assert.async();
		
		looperforward();
		
		function looperforward() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 3 );
				looperforwarddone();
				looperback();
			};
			$( '#' + testId + ' .looperforward' ).click();
		}
           
		function looperback() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 2 );
				looperbackdone();
				looperlast();
			};
			$( '#' + testId + ' .looperback' ).click();
		}
		
		function looperlast() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 4 );
				looperlastdone();
				looperfirst();
			};
			$( '#' + testId + ' .looperlast' ).click();
		}
		
		function looperfirst() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 0 );
				looperfirstdone();
				looperbackfromfirst();
			};
			$( '#' + testId + ' .looperfirst' ).click();
		}
		
		function looperbackfromfirst() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 4 );
				looperbackfromfirstdone();
				looperforwardfromlast();
			};
			$( '#' + testId + ' .looperback' ).click();
		}
		
		function looperforwardfromlast() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 0 );
				looperforwardfromlastdone();
				looperitem();
			};
			$( '#' + testId + ' .looperforward' ).click();
		}
		
		function looperitem() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 2 );
				looperitemdone();
			};
			$( '#' + testId + ' .looperitem' ).click();
		}
	});
	
	QUnit.test( "Target by class parameter", function( assert ) {
		var testId = 'looper-class-param';
		var looperforwarddone = assert.async();
		var looperbackdone = assert.async();
		var looperlastdone = assert.async();
		var looperfirstdone = assert.async();
		var looperbackfromfirstdone = assert.async();
		var looperforwardfromlastdone = assert.async();
		var looperitemdone = assert.async();
		
		looperforward();
		
		function looperforward() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 3 );
				looperforwarddone();
				looperback();
			};
			$( '#' + testId + ' .looperforward' ).click();
		}
           
		function looperback() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 2 );
				looperbackdone();
				looperlast();
			};
			$( '#' + testId + ' .looperback' ).click();
		}
		
		function looperlast() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 4 );
				looperlastdone();
				looperfirst();
			};
			$( '#' + testId + ' .looperlast' ).click();
		}
		
		function looperfirst() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 0 );
				looperfirstdone();
				looperbackfromfirst();
			};
			$( '#' + testId + ' .looperfirst' ).click();
		}
		
		function looperbackfromfirst() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 4 );
				looperbackfromfirstdone();
				looperforwardfromlast();
			};
			$( '#' + testId + ' .looperback' ).click();
		}
		
		function looperforwardfromlast() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 0 );
				looperforwardfromlastdone();
				looperitem();
			};
			$( '#' + testId + ' .looperforward' ).click();
		}
		
		function looperitem() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperlist1 li:visible' ).length, 1 );
				assert.equal( $( '#looperlist1 li:visible' ).index(), 2 );
				looperitemdone();
			};
			$( '#' + testId + ' .looperitem' ).click();
		}
	});
       		
}

if ( testConfig.runAll || testConfig.run.looper.all || testConfig.run.looper.autoplay ) {
	
	QUnit.test( "Pause and play", function( assert ) {
		var testId = 'looper-controls';
		var looperpausedone = assert.async();
		var looperplaydone = assert.async();
		
		looperpause();
		
		function looperpause() {
			var currentIndex = $( '#looperautolist' ).children( ':visible' ).index();
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( $( '#looperautolist' ).children( ':visible' ).index(), currentIndex );
				window.setTimeout(function(){
					assert.equal( $( '#looperautolist' ).children( ':visible' ).index(), currentIndex );
					looperpausedone();
					looperplay();
				}, 3000);
			};
			$( '#' + testId + ' .looperpause' ).click();
		}
		
		function looperplay() {
			var currentIndex = $( '#looperautolist' ).children( ':visible' ).index();
			Performer.callback = function(){
				Performer.resetCallback();
				assert.notEqual( $( '#looperautolist' ).children( ':visible' ).index(), currentIndex );
				looperplaydone();
			};
			$( '#' + testId + ' .looperplay' ).click();
		}
	});
}