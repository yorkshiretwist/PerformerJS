QUnit.module( "Toggler" );

if ( testConfig.runAll || testConfig.run.toggler.all || testConfig.run.toggler.general ) {

	QUnit.test( "Target by ID", function( assert ) {
		var testId = 'toggler-id';
		var done1 = assert.async();
		var done2 = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				assert.ok( el.hasClass( 'toggleropen' ), 'Toggle target has open class');
				done1();
				hide();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
		
		function hide() {
			console.log(testId + ' - hide()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( ! el.is( ':visible' ), 'Toggle target hidden');
				assert.ok( ! el.hasClass( 'toggleropen' ), 'Toggle target does not have open class');
				assert.ok( el.hasClass( 'togglerclosed' ), 'Toggle target has closed class');
				done2();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
	});

	QUnit.test( "Target by class", function( assert ) {
		var testId = 'toggler-class';
		var done1 = assert.async();
		var done2 = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			
			var els = $( '#' + testId + ' .' + testId + '-target' );
			var elsCount = els.length;
			
			Performer.callback = function(){
				// only fire the callback when the last element has been shown
				if ( --elsCount > 0 ) {
					return;
				}
				Performer.resetCallback();
				assert.ok( els.is( ':visible' ), 'Toggle target visible');
				assert.ok( els.hasClass( 'toggleropen' ), 'Toggle target has open class');
				done1();
				hide();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
		
		function hide() {
			console.log(testId + ' - hide()');
			
			var els = $( '#' + testId + ' .' + testId + '-target' );
			var elsCount = els.length;
			
			Performer.callback = function(){
				// only fire the callback when the last element has been hidden
				if ( --elsCount > 0 ) {
					return;
				}
				Performer.resetCallback();
				assert.ok( ! els.is( ':visible' ), 'Toggle target hidden');
				assert.ok( ! els.hasClass( 'toggleropen' ), 'Toggle target does not have open class');
				assert.ok( els.hasClass( 'togglerclosed' ), 'Toggle target has closed class');
				done2();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
	});

	QUnit.test( "Target by class parameter", function( assert ) {

		var testId = 'toggler-class-param';
		var done1 = assert.async();
		var done2 = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				assert.ok( el.hasClass( 'toggleropen' ), 'Toggle target has open class');
				done1();
				hide();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
		
		function hide() {
			console.log(testId + ' - hide()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( ! el.is( ':visible' ), 'Toggle target hidden');
				assert.ok( ! el.hasClass( 'toggleropen' ), 'Toggle target does not have open class');
				assert.ok( el.hasClass( 'togglerclosed' ), 'Toggle target has closed class');
				done2();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
	});
}

if ( testConfig.runAll || testConfig.run.toggler.all || testConfig.run.toggler.formelements ) {

	QUnit.test( "Toggle by button", function( assert ) {
		var testId = 'toggler-button';
		var done1 = assert.async();
		var done2 = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				done1();
				hide();
			};
			$( '#' + testId + ' button.toggler' ).click();
		}
		
		function hide() {
			console.log(testId + ' - hide()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( ! el.is( ':visible' ), 'Toggle target hidden');
				done2();
			};
			$( '#' + testId + ' button.toggler' ).click();
		}
	});
	
	QUnit.test( "Toggle by input[button]", function( assert ) {
		var testId = 'toggler-input-button';
		var done1 = assert.async();
		var done2 = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				done1();
				hide();
			};
			$( '#' + testId + ' input.toggler' ).click();
		}
		
		function hide() {
			console.log(testId + ' - hide()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( ! el.is( ':visible' ), 'Toggle target hidden');
				done2();
			};
			$( '#' + testId + ' input.toggler' ).click();
		}
	});
	
	QUnit.test( "Toggle by input[submit]", function( assert ) {
		var testId = 'toggler-input-submit';
		var done1 = assert.async();
		var done2 = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				done1();
				hide();
			};
			$( '#' + testId + ' input.toggler' ).click();
		}
		
		function hide() {
			console.log(testId + ' - hide()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( ! el.is( ':visible' ), 'Toggle target hidden');
				done2();
			};
			$( '#' + testId + ' input.toggler' ).click();
		}
	});

	QUnit.test( "Toggle by checkbox", function( assert ) {
		var testId = 'toggler-checkbox';
		var done1 = assert.async();
		var done2 = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				done1();
				hide();
			};
			$( '#' + testId + ' input.toggler' ).click();
		}
		
		function hide() {
			console.log(testId + ' - hide()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( ! el.is( ':visible' ), 'Toggle target hidden');
				done2();
			};
			$( '#' + testId + ' input.toggler' ).click();
		}
	});
	
	QUnit.test( "Toggle by checkbox (checked)", function( assert ) {
		var testId = 'toggler-checkbox-checked';
		var done1 = assert.async();
		var done2 = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' )
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				done1();
				hide();
			};
			$( '#' + testId + ' input.toggler' ).click();
		}
		
		function hide() {
			console.log(testId + ' - hide()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( ! el.is( ':visible' ), 'Toggle target hidden');
				done2();
			};
			$( '#' + testId + ' input.toggler' ).click();
		}
	});
	
	QUnit.test( "Toggle by select list option", function( assert ) {
		var testId = 'toggler-select';
		var done1 = assert.async();
		var done2 = assert.async();
		var done3 = assert.async();
		option1();
		
		function option1() {
			console.log(testId + ' - option1()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el1 = $( '#' + testId + ' #' + testId + '-target1' );
				var el2 = $( '#' + testId + ' #' + testId + '-target2' );
				var el3 = $( '#' + testId + ' #' + testId + '-target3' );
				assert.ok( el1.is( ':visible' ), 'Option 1 target visible');
				assert.ok( ! el2.is( ':visible' ), 'Option 2 target hidden');
				assert.ok( ! el3.is( ':visible' ), 'Option 3 target hidden');
				done1();
				option2();
			};
			$( '#' + testId + ' select.toggler' ).val( 'Option 1' ).trigger( 'change' );
		}
		
		function option2() {
			console.log(testId + ' - option2()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el1 = $( '#' + testId + ' #' + testId + '-target1' );
				var el2 = $( '#' + testId + ' #' + testId + '-target2' );
				var el3 = $( '#' + testId + ' #' + testId + '-target3' );
				assert.ok( ! el1.is( ':visible' ), 'Option 1 target hidden');
				assert.ok( el2.is( ':visible' ), 'Option 2 target visible');
				assert.ok( ! el3.is( ':visible' ), 'Option 3 target hidden');
				done2();
				option3();
			};
			$( '#' + testId + ' select.toggler' ).val( 'Option 2' ).trigger( 'change' );
		}
		
		function option3() {
			console.log(testId + ' - option3()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el1 = $( '#' + testId + ' #' + testId + '-target1' );
				var el2 = $( '#' + testId + ' #' + testId + '-target2' );
				var el3 = $( '#' + testId + ' #' + testId + '-target3' );
				assert.ok( ! el1.is( ':visible' ), 'Option 1 target hidden');
				assert.ok( ! el2.is( ':visible' ), 'Option 2 target hidden');
				assert.ok( el3.is( ':visible' ), 'Option 3 target visible');
				done3();
			};
			$( '#' + testId + ' select.toggler' ).val( 'Option 3' ).trigger( 'change' );
		}
	});
	
	QUnit.test( "Toggle by radio option", function( assert ) {
		var testId = 'toggler-radio';
		var done1 = assert.async();
		var done2 = assert.async();
		option1();
		
		function option1() {
			console.log(testId + ' - option1()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el1 = $( '#' + testId + ' #' + testId + '-target1' );
				var el2 = $( '#' + testId + ' #' + testId + '-target2' );
				assert.ok( el1.is( ':visible' ), 'Option 1 target visible');
				assert.ok( ! el2.is( ':visible' ), 'Option 2 target hidden');
				done1();
				option2();
			};
			$( '#' + testId + ' #' + testId + '-option1' ).click();
		}
		
		function option2() {
			console.log(testId + ' - option2()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el1 = $( '#' + testId + ' #' + testId + '-target1' );
				var el2 = $( '#' + testId + ' #' + testId + '-target2' );
				assert.ok( ! el1.is( ':visible' ), 'Option 1 target hidden');
				assert.ok( el2.is( ':visible' ), 'Option 2 target visible');
				done2();
			};
			$( '#' + testId + ' #' + testId + '-option2' ).click();
		}
	});
}

if ( testConfig.runAll || testConfig.run.toggler.all || testConfig.run.toggler.effects ) {

	QUnit.test( "Target by ID with show effect", function( assert ) {
		var testId = 'toggler-id-showeffect';
		var done = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				done();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
	});

	QUnit.test( "Target by class parameter with show effect", function( assert ) {
		var testId = 'toggler-class-param-showeffect';
		var done = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				done();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
	});

	QUnit.test( "Target by ID with hide effect", function( assert ) {
		var testId = 'toggler-id-hideeffect';
		var done = assert.async();
		hide();
		
		function hide() {
			console.log(testId + ' - hide()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( ! el.is( ':visible' ), 'Toggle target hidden');
				done();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
	});

	QUnit.test( "Target by class parameter with hide effect", function( assert ) {
		var testId = 'toggler-class-param-hideeffect';
		var done = assert.async();
		hide();
		
		function hide() {
			console.log(testId + ' - hide()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( ! el.is( ':visible' ), 'Toggle target hidden');
				done();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
	});
}

if ( testConfig.runAll || testConfig.run.toggler.all || testConfig.run.toggler.moving ) {

	QUnit.test( "Target by ID and allow moving", function( assert ) {
		var testId = 'toggler-id-move';
		var done = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				assert.ok( window.location.hash === '#' + testId, 'Window is at correct anchor' );
				done();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
	});

	QUnit.test( "Target by ID and allow moving with absolute URL", function( assert ) {
		var testId = 'toggler-id-move-absolute';
		var done = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				assert.ok( window.location.hash === '#' + testId, 'Window is at correct anchor' );
				done();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
	});

	QUnit.test( "Target by class parameter and allow moving", function( assert ) {
		var testId = 'toggler-class-param-move';
		var done = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				assert.ok( window.location.hash === '#' + testId, 'Window is at correct anchor' );
				done();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
	});

	QUnit.test( "Target by class parameter and allow moving with absolute URL", function( assert ) {
		var testId = 'toggler-class-param-move-absolute';
		var done = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				assert.ok( window.location.hash === '#' + testId, 'Window is at correct anchor' );
				done();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
	});
}

if ( testConfig.runAll || testConfig.run.toggler.all || testConfig.run.toggler.parents ) {

	QUnit.test( "Target by ID showing hidden parent elements", function( assert ) {
		var testId = 'toggler-id-show-parents';
		var done = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				var parent = $( '#' + testId + ' #' + testId + '-target-parent' );
				assert.ok( parent.is( ':visible' ), 'Toggle target parent visible');
				done();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
	});

	QUnit.test( "Target by class parameter showing hidden parent elements", function( assert ) {
		var testId = 'toggler-class-param-show-parents';
		var done = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			Performer.callback = function(){
				Performer.resetCallback();
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( el.is( ':visible' ), 'Toggle target visible');
				var parent = $( '#' + testId + ' #' + testId + '-target-parent' );
				assert.ok( parent.is( ':visible' ), 'Toggle target parent visible');
				done();
			};
			$( '#' + testId + ' a.toggler' ).click();
		}
	});
}

if ( testConfig.runAll || testConfig.run.toggler.all || testConfig.run.toggler.delay ) {

	QUnit.test( "Target by ID with delay", function( assert ) {
		var testId = 'toggler-id-delay';
		var done1 = assert.async();
		var done2 = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			$( '#' + testId + ' a.toggler' ).click();
			
			setTimeout(function(){
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( ! el.is( ':visible' ), 'Toggle target hidden after 1000ms');
				done1();
				setTimeout(function(){
					assert.ok( el.is( ':visible' ), 'Toggle target visible after 2500ms');
					done2();
				}, 1500);
			}, 1000);
		}
	});

	QUnit.test( "Target by class parameter with delay", function( assert ) {
		var testId = 'toggler-class-param-delay';
		var done1 = assert.async();
		var done2 = assert.async();
		show();
		
		function show() {
			console.log(testId + ' - show()');
			$( '#' + testId + ' a.toggler' ).click();
			
			setTimeout(function(){
				var el = $( '#' + testId + ' #' + testId + '-target' );
				assert.ok( ! el.is( ':visible' ), 'Toggle target hidden after 1000ms');
				done1();
				setTimeout(function(){
					assert.ok( el.is( ':visible' ), 'Toggle target visible after 2500ms');
					done2();
				}, 1500);
			}, 1000);
		}
	});
}