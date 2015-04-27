QUnit.module( "Accordianer" );

if ( testConfig.runAll || testConfig.run.accordianer ) {

	QUnit.test( "Target by ID", function( assert ) {
		var testId = 'accordian-id';
		var done1 = assert.async();
		var done2 = assert.async();
		test1();
		
		function test1() {
			console.log(testId + ' - test1()');
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( ! $( '#accordian #accordian1' ).is( ':visible' ) );
				assert.ok( $( '#accordian #accordian2' ).is( ':visible' ) );
				assert.ok( ! $( '#accordian #accordian3' ).is( ':visible' ) );
				done1();
				test2();
			};
			$( '#' + testId + ' a#accordian-id-item2' ).click();
		}
		
		function test2() {
			console.log(testId + ' - test2()');
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( $( '#accordian #accordian1' ).is( ':visible' ) );
				assert.ok( ! $( '#accordian #accordian2' ).is( ':visible' ) );
				assert.ok( ! $( '#accordian #accordian3' ).is( ':visible' ) );
				done2();
			};
			$( '#' + testId + ' a#accordian-id-item1' ).click();
		}
	});
    
    QUnit.test( "Target by class", function( assert ) {
		var testId = 'accordian-class';
		var done1 = assert.async();
		var done2 = assert.async();
		test1();
		
		function test1() {
			Performer.callback = function(){
				console.log(testId + ' - test1()');
				Performer.resetCallback();
				assert.ok( ! $( '#accordian #accordian1' ).is( ':visible' ) );
				assert.ok( ! $( '#accordian #accordian2' ).is( ':visible' ) );
				assert.ok( $( '#accordian #accordian3' ).is( ':visible' ) );
				done1();
				test2();
			};
			$( '#' + testId + ' a#accordian-class-item3' ).click();
		}
           
		function test2() {
			Performer.callback = function(){
				console.log(testId + ' - test2()');
				Performer.resetCallback();
				assert.ok( $( '#accordian #accordian1' ).is( ':visible' ) );
				assert.ok( ! $( '#accordian #accordian2' ).is( ':visible' ) );
				assert.ok( ! $( '#accordian #accordian3' ).is( ':visible' ) );
				done2();
			};
			$( '#' + testId + ' a#accordian-class-item1' ).click();
		}
	});
        
    QUnit.test( "Target by class parameter", function( assert ) {
		var testId = 'accordian-class-param';
		var done1 = assert.async();
		var done2 = assert.async();
		test1();
		
		function test1() {
			Performer.callback = function(){
				console.log(testId + ' - test1()');
				Performer.resetCallback();
				assert.ok( ! $( '#accordian #accordian1' ).is( ':visible' ) );
				assert.ok( ! $( '#accordian #accordian2' ).is( ':visible' ) );
				assert.ok( $( '#accordian #accordian3' ).is( ':visible' ) );
				done1();
				test2();
			};
			$( '#' + testId + ' a#accordian-class-param-item3' ).click();
		}
           
		function test2() {
			Performer.callback = function(){
				console.log(testId + ' - test2()');
				Performer.resetCallback();
				assert.ok( $( '#accordian #accordian1' ).is( ':visible' ) );
				assert.ok( ! $( '#accordian #accordian2' ).is( ':visible' ) );
				assert.ok( ! $( '#accordian #accordian3' ).is( ':visible' ) );
				done2();
			};
			$( '#' + testId + ' a#accordian-class-param-item1' ).click();
		}
	});
	
	QUnit.test( "Target by select", function( assert ) {
		var testId = 'accordian-select';
		var done1 = assert.async();
		var done2 = assert.async();
		test1();
		
		function test1() {
			Performer.callback = function(){
				console.log(testId + ' - test1()');
				Performer.resetCallback();
				assert.ok( ! $( '#accordian #accordian1' ).is( ':visible' ) );
				assert.ok( $( '#accordian #accordian2' ).is( ':visible' ) );
				assert.ok( ! $( '#accordian #accordian3' ).is( ':visible' ) );
				done1();
				test2();
			};
			$( '#' + testId + ' #accordianer-select-list' ).prop( 'selectedIndex', 1 ).change();
		}
           
		function test2() {
			Performer.callback = function(){
				console.log(testId + ' - test2()');
				Performer.resetCallback();
				assert.ok( ! $( '#accordian #accordian1' ).is( ':visible' ) );
				assert.ok( ! $( '#accordian #accordian2' ).is( ':visible' ) );
				assert.ok( $( '#accordian #accordian3' ).is( ':visible' ) );
				done2();
			};
			$( '#' + testId + ' #accordianer-select-list' ).prop( 'selectedIndex', 2 ).change();
		}
	});
	
	QUnit.test( "Target by radio button", function( assert ) {
		var testId = 'accordian-radio';
		var done1 = assert.async();
		var done2 = assert.async();
		test1();
		
		function test1() {
			Performer.callback = function(){
				console.log(testId + ' - test1()');
				Performer.resetCallback();
				assert.ok( ! $( '#accordian #accordian1' ).is( ':visible' ) );
				assert.ok( $( '#accordian #accordian2' ).is( ':visible' ) );
				assert.ok( ! $( '#accordian #accordian3' ).is( ':visible' ) );
				done1();
				test2();
			};
			$( '#' + testId + ' #accordianer-radio-item2' ).click();
		}
           
		function test2() {
			Performer.callback = function(){
				console.log(testId + ' - test2()');
				Performer.resetCallback();
				assert.ok( $( '#accordian #accordian1' ).is( ':visible' ) );
				assert.ok( ! $( '#accordian #accordian2' ).is( ':visible' ) );
				assert.ok( ! $( '#accordian #accordian3' ).is( ':visible' ) );
				start();
			};
			$( '#' + testId + ' #accordianer-radio-item1' ).click();
		}
	});
}