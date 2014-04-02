module( "Sizer" );

if ( testConfig.runAll || testConfig.run.sizer ) {

	test( "Target by ID, height only", function() {
		var testId = 'sizer-id-height';
		
		var height = $( '#' + testId + ' #' + testId + '-target' ).height();
		
		$( '#' + testId + ' a.sizer' ).click();
		
		var newheight = $( '#' + testId + ' #' + testId + '-target' ).height();
		
		ok( newheight == ( height + 10 ), 'Target height is 10px more');
	});
	
	test( "Target by ID, height and width", function() {
		var testId = 'sizer-id-height-width';
		
		var height = $( '#' + testId + ' #' + testId + '-target' ).height(),
			width = $( '#' + testId + ' #' + testId + '-target' ).width();
		
		$( '#' + testId + ' a.sizer' ).click();
		
		var newheight = $( '#' + testId + ' #' + testId + '-target' ).height(),
			newwidth = $( '#' + testId + ' #' + testId + '-target' ).width();
		
		ok( newheight == ( height + 10 ), 'Target height is 10px more');
		ok( newwidth == ( width - 10 ), 'Target width is 10px less');
	});
}