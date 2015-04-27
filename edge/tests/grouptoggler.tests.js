QUnit.module( "GroupToggler" );

if ( testConfig.runAll || testConfig.run.grouptoggler ) {

	QUnit.test( "Target by class parameter", function( assert ) {
		var testId = 'grouptoggler-class-param';
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
			$( '#' + testId + ' a.grouptoggler' ).click();
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
			$( '#' + testId + ' a.grouptoggler' ).click();
		}
	});
	
}