QUnit.module( "Switcher" );

if ( testConfig.runAll || testConfig.run.switcher ) {

	QUnit.test( "Target by ID", function( assert ) {
		var testId = 'switcher-id';
		
		var done1 = assert.async();
		var done2 = assert.async();
		
		var el1 = $( '#' + testId + ' #' + testId + '-target1' );
		var el2 = $( '#' + testId + ' #' + testId + '-target2' );
		
		assert.ok( el1.is( ':visible' ), 'Target 1 visible on page load');
		assert.ok( ! el2.is( ':visible' ), 'Target 2 hidden on page load');
		
		do1();
		
		function do1() {
			console.log(testId + ' - do1()');
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( ! el1.is( ':visible' ), 'Target 1 hidden after first click');
				assert.ok( el2.is( ':visible' ), 'Target 2 visible after first click');
				done1();
				do2();
			};
			$( '#' + testId + ' a.switcher' ).click();
		};
		
		function do2() {
			console.log(testId + ' - do2()');
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( el1.is( ':visible' ), 'Target 1 visible after second click');
				assert.ok( ! el2.is( ':visible' ), 'Target 2 hidden after second click');
				done2();
			};
			$( '#' + testId + ' a.switcher' ).click();
		};
	});
	
	QUnit.test( "Target by class", function( assert ) {
		var testId = 'switcher-class';
		
		var done1 = assert.async();
		var done2 = assert.async();
		
		var el1 = $( '#' + testId + ' .' + testId + '-target1' );
		var el2 = $( '#' + testId + ' .' + testId + '-target2' );
		
		assert.ok( el1.is( ':visible' ), 'Target 1 visible on page load');
		assert.ok( ! el2.is( ':visible' ), 'Target 2 hidden on page load');
		
		do1();
		
		function do1() {
			console.log(testId + ' - do1()');
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( ! el1.is( ':visible' ), 'Target 1 hidden after first click');
				assert.ok( el2.is( ':visible' ), 'Target 2 visible after first click');
				done1();
				do2();
			};
			$( '#' + testId + ' a.switcher' ).click();
		};
		
		function do2() {
			console.log(testId + ' - do2()');
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( el1.is( ':visible' ), 'Target 1 visible after second click');
				assert.ok( ! el2.is( ':visible' ), 'Target 2 hidden after second click');
				done2();
			};
			$( '#' + testId + ' a.switcher' ).click();
		};
	});
	
	QUnit.test( "Target by class parameter", function( assert ) {
		var testId = 'switcher-class-param';
		
		var done1 = assert.async();
		var done2 = assert.async();
		
		var el1 = $( '#' + testId + ' #' + testId + '-target1' );
		var el2 = $( '#' + testId + ' #' + testId + '-target2' );
		
		assert.ok( el1.is( ':visible' ), 'Target 1 visible on page load');
		assert.ok( ! el2.is( ':visible' ), 'Target 2 hidden on page load');
		
		do1();
		
		function do1() {
			console.log(testId + ' - do1()');
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( ! el1.is( ':visible' ), 'Target 1 hidden after first click');
				assert.ok( el2.is( ':visible' ), 'Target 2 visible after first click');
				done1();
				do2();
			};
			$( '#' + testId + ' a.switcher' ).click();
		};
		
		function do2() {
			console.log(testId + ' - do2()');
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( el1.is( ':visible' ), 'Target 1 visible after second click');
				assert.ok( ! el2.is( ':visible' ), 'Target 2 hidden after second click');
				done2();
			};
			$( '#' + testId + ' a.switcher' ).click();
		};
	});
	
}