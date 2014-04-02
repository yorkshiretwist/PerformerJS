module( "GroupToggler" );

if ( testConfig.runAll || testConfig.run.grouptoggler ) {

	test( "Target by class parameter", function() {
		var testId = 'grouptoggler-class-param';
		show();
		
		function show() {
			$( '#' + testId + ' a.grouptoggler' ).click();
			stop();
			setTimeout(function(){
				ok( $( '#' + testId + ' .' + testId + '-target' ).is( ':visible' ), 'Toggle target visible');
				ok( $( '#' + testId + ' .' + testId + '-target' ).hasClass( 'toggleropen' ), 'Toggle target has open class');
				start();
				hide();
			}, 1000);
		}
		
		function hide() {
			$( '#' + testId + ' a.grouptoggler' ).click();
			stop();
			setTimeout(function(){
				ok( ! $( '#' + testId + ' .' + testId + '-target' ).is( ':visible' ), 'Toggle target hidden');
				ok( ! $( '#' + testId + ' .' + testId + '-target' ).hasClass( 'toggleropen' ), 'Toggle target does not have open class');
				ok( $( '#' + testId + ' .' + testId + '-target' ).hasClass( 'togglerclosed' ), 'Toggle target has closed class');
				start();
			}, 1000);
		}
	});
	
}