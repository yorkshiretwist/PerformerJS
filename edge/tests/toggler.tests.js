module( "Toggler" );

if ( testConfig.runAll || testConfig.run.toggler.all || testConfig.run.toggler.general ) {

	test( "Target by ID", function() {
		var testId = 'toggler-id';
		show();
		
		function show() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target visible');
				ok( $( '#' + testId + ' #' + testId + '-target' ).hasClass( 'toggleropen' ), 'Toggle target has open class');
				start();
				hide();
			}, 1000);
		}
		
		function hide() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target hidden');
				ok( ! $( '#' + testId + ' #' + testId + '-target' ).hasClass( 'toggleropen' ), 'Toggle target does not have open class');
				ok( $( '#' + testId + ' #' + testId + '-target' ).hasClass( 'togglerclosed' ), 'Toggle target has closed class');
				start();
			}, 1000);
		}
	});

	test( "Target by class", function() {
		var testId = 'toggler-class';
		show();
		
		function show() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' .' + testId + '-target' ).is( ':visible' ), 'Toggle target visible');
				ok( $( '#' + testId + ' .' + testId + '-target' ).hasClass( 'toggleropen' ), 'Toggle target has open class');
				start();
				hide();
			}, 1000);
		}
		
		function hide() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#' + testId + ' .' + testId + '-target' ).is( ':visible' ), 'Toggle target hidden');
				ok( ! $( '#' + testId + ' .' + testId + '-target' ).hasClass( 'toggleropen' ), 'Toggle target does not have open class');
				ok( $( '#' + testId + ' .' + testId + '-target' ).hasClass( 'togglerclosed' ), 'Toggle target has closed class');
				start();
			}, 1000);
		}
	});

	test( "Target by class parameter", function() {

		if ( ! testConfig.runAll && ! testConfig.run.toggler.general ) {
			return;
		}

		var testId = 'toggler-class-param';
		show();
		
		function show() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target visible');
				ok( $( '#' + testId + ' #' + testId + '-target' ).hasClass( 'toggleropen' ), 'Toggle target has open class');
				start();
				hide();
			}, 1000);
		}
		
		function hide() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target hidden');
				ok( ! $( '#' + testId + ' #' + testId + '-target' ).hasClass( 'toggleropen' ), 'Toggle target does not have open class');
				ok( $( '#' + testId + ' #' + testId + '-target' ).hasClass( 'togglerclosed' ), 'Toggle target has closed class');
				start();
			}, 1000);
		}
	});
}

if ( testConfig.runAll || testConfig.run.toggler.all || testConfig.run.toggler.formelements ) {

	test( "Toggle by checkbox", function() {
		var testId = 'toggler-checkbox';
		show();
		
		function show() {
			$( '#' + testId + ' input.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target visible');
				start();
				hide();
			}, 1000);
		}
		
		function hide() {
			$( '#' + testId + ' input.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target hidden');
				start();
			}, 1000);
		}
	});
	
	test( "Toggle by checkbox (checked)", function() {
		var testId = 'toggler-checkbox-checked';
		show();
		
		function show() {
			$( '#' + testId + ' input.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target visible');
				start();
				hide();
			}, 1000);
		}
		
		function hide() {
			$( '#' + testId + ' input.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target hidden');
				start();
			}, 1000);
		}
	});
	
	test( "Toggle by select list option", function() {
		var testId = 'toggler-select';
		option1();
		
		function option1() {
			$( '#' + testId + ' select.toggler' ).val( 'Option 1' ).trigger( 'change' );
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' #' + testId + '-target1' ).is( ':visible' ), 'Option 1 target visible');
				ok( ! $( '#' + testId + ' #' + testId + '-target2' ).is( ':visible' ), 'Option 2 target hidden');
				ok( ! $( '#' + testId + ' #' + testId + '-target3' ).is( ':visible' ), 'Option 3 target hidden');
				start();
				option2();
			}, 1000);
		}
		
		function option2() {
			$( '#' + testId + ' select.toggler' ).val( 'Option 2' ).trigger( 'change' );
			stop();
			setTimeout(function(){
				ok( ! $( '#' + testId + ' #' + testId + '-target1' ).is( ':visible' ), 'Option 1 target hidden');
				ok( $( '#' + testId + ' #' + testId + '-target2' ).is( ':visible' ), 'Option 2 target visible');
				ok( ! $( '#' + testId + ' #' + testId + '-target3' ).is( ':visible' ), 'Option 3 target hidden');
				start();
				option3();
			}, 1000);
		}
		
		function option3() {
			$( '#' + testId + ' select.toggler' ).val( 'Option 3' ).trigger( 'change' );
			stop();
			setTimeout(function(){
				ok( ! $( '#' + testId + ' #' + testId + '-target1' ).is( ':visible' ), 'Option 1 target hidden');
				ok( ! $( '#' + testId + ' #' + testId + '-target2' ).is( ':visible' ), 'Option 2 target hidden');
				ok( $( '#' + testId + ' #' + testId + '-target3' ).is( ':visible' ), 'Option 3 target visible');
				start();
			}, 1000);
		}
	});
	
	test( "Toggle by radio option", function() {
		var testId = 'toggler-radio';
		option1();
		
		function option1() {
			$( '#' + testId + ' #' + testId + '-option1' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' #' + testId + '-target1' ).is( ':visible' ), 'Option 1 target visible');
				ok( ! $( '#' + testId + ' #' + testId + '-target2' ).is( ':visible' ), 'Option 2 target hidden');
				start();
				option2();
			}, 1000);
		}
		
		function option2() {
			$( '#' + testId + ' #' + testId + '-option2' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#' + testId + ' #' + testId + '-target1' ).is( ':visible' ), 'Option 1 target hidden');
				ok( $( '#' + testId + ' #' + testId + '-target2' ).is( ':visible' ), 'Option 2 target visible');
				start();
			}, 1000);
		}
	});
}

if ( testConfig.runAll || testConfig.run.toggler.all || testConfig.run.toggler.effects ) {

	test( "Target by ID with show effect", function() {
		var testId = 'toggler-id-showeffect';
		show();
		
		function show() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target visible');
				start();
			}, 1000);
		}
	});

	test( "Target by class parameter with show effect", function() {
		var testId = 'toggler-class-param-showeffect';
		show();
		
		function show() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target visible');
				start();
			}, 1000);
		}
	});

	test( "Target by ID with hide effect", function() {
		var testId = 'toggler-id-hideeffect';
		hide();
		
		function hide() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target hidden');
				start();
			}, 1000);
		}
	});

	test( "Target by class parameter with hide effect", function() {
		var testId = 'toggler-class-param-hideeffect';
		hide();
		
		function hide() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target hidden');
				start();
			}, 1000);
		}
	});
}

if ( testConfig.runAll || testConfig.run.toggler.all || testConfig.run.toggler.moving ) {

	test( "Target by ID and allow moving", function() {
		var testId = 'toggler-id-move';
		show();
		
		function show() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target visible');
				ok( window.location.hash === '#' + testId, 'Window is at correct anchor' );
				start();
			}, 1000);
		}
	});

	test( "Target by ID and allow moving with absolute URL", function() {
		var testId = 'toggler-id-move-absolute';
		show();
		
		function show() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target visible');
				ok( window.location.hash === '#' + testId, 'Window is at correct anchor' );
				start();
			}, 1000);
		}
	});

	test( "Target by class parameter and allow moving", function() {
		var testId = 'toggler-class-param-move';
		show();
		
		function show() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target visible');
				ok( window.location.hash === '#' + testId, 'Window is at correct anchor' );
				start();
			}, 1000);
		}
	});

	test( "Target by class parameter and allow moving with absolute URL", function() {
		var testId = 'toggler-class-param-move-absolute';
		show();
		
		function show() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target visible');
				ok( window.location.hash === '#' + testId, 'Window is at correct anchor' );
				start();
			}, 1000);
		}
	});
}

if ( testConfig.runAll || testConfig.run.toggler.all || testConfig.run.toggler.parents ) {

	test( "Target by ID showing hidden parent elements", function() {
		var testId = 'toggler-id-show-parents';
		show();
		
		function show() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target visible');
				ok( $( '#' + testId + ' #' + testId + '-target-parent' ).is( ':visible' ), 'Toggle target parent visible');
				start();
			}, 1000);
		}
	});

	test( "Target by class parameter showing hidden parent elements", function() {
		var testId = 'toggler-class-param-show-parents';
		show();
		
		function show() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target visible');
				ok( $( '#' + testId + ' #' + testId + '-target-parent' ).is( ':visible' ), 'Toggle target parent visible');
				start();
			}, 1000);
		}
	});
}

if ( testConfig.runAll || testConfig.run.toggler.all || testConfig.run.toggler.delay ) {

	test( "Target by ID with delay", function() {
		var testId = 'toggler-id-delay';
		show();
		
		function show() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target hidden after 1000ms');
				start();
				stop();
				setTimeout(function(){
					ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target visible after 2500ms');
					start();
				}, 1500);
			}, 1000);
		}
	});

	test( "Target by class parameter with delay", function() {
		var testId = 'toggler-class-param-delay';
		show();
		
		function show() {
			$( '#' + testId + ' a.toggler' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target hidden after 1000ms');
				start();
				stop();
				setTimeout(function(){
					ok( $( '#' + testId + ' #' + testId + '-target' ).is( ':visible' ), 'Toggle target visible after 2500ms');
					start();
				}, 1500);
			}, 1000);
		}
	});
}