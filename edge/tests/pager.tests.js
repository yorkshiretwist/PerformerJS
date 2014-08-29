module( "Pager" );

if ( testConfig.runAll || testConfig.run.pager ) {

	test( "Pager initialised", function() {
		ok( $( '#pagerlistitem1' ).is( ':visible' ) );
		ok( $( '#pagerlistitem2' ).is( ':visible' ) );
		ok( $( '#pagerlistitem3' ).is( ':visible' ) );
		ok( $( '#pagerlistitem4' ).is( ':visible' ) );
		ok( $( '#pagerlistitem5' ).is( ':visible' ) );
		ok( $( '#pagerlistitem6' ).is( ':visible' ) );
		ok( $( '#pagerlistitem7' ).is( ':visible' ) );
		ok( $( '#pagerlistitem8' ).is( ':visible' ) );
		ok( $( '#pagerlistitem9' ).is( ':visible' ) );
		ok( $( '#pagerlistitem10' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem11' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem12' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem13' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem14' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem15' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem16' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem17' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem18' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem19' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem20' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem21' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem22' ).is( ':visible' ) );
		
		equal( $( '#pagerlist-pagination' ).length, 1 );
		
		equal( $( '#pagerlist-pagination' ).children().length, 3 );
	});
	
	test( "Page 2", function() {
		$( '#pagerlist-page2' ).click();
		
		ok( ! $( '#pagerlistitem1' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem2' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem3' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem4' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem5' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem6' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem7' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem8' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem9' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem10' ).is( ':visible' ) );
		ok( $( '#pagerlistitem11' ).is( ':visible' ) );
		ok( $( '#pagerlistitem12' ).is( ':visible' ) );
		ok( $( '#pagerlistitem13' ).is( ':visible' ) );
		ok( $( '#pagerlistitem14' ).is( ':visible' ) );
		ok( $( '#pagerlistitem15' ).is( ':visible' ) );
		ok( $( '#pagerlistitem16' ).is( ':visible' ) );
		ok( $( '#pagerlistitem17' ).is( ':visible' ) );
		ok( $( '#pagerlistitem18' ).is( ':visible' ) );
		ok( $( '#pagerlistitem19' ).is( ':visible' ) );
		ok( $( '#pagerlistitem20' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem21' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem22' ).is( ':visible' ) );
	});
	
	test( "Page 3", function() {
		$( '#pagerlist-page3' ).click();
		
		ok( ! $( '#pagerlistitem1' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem2' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem3' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem4' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem5' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem6' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem7' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem8' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem9' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem10' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem11' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem12' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem13' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem14' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem15' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem16' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem17' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem18' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem19' ).is( ':visible' ) );
		ok( ! $( '#pagerlistitem20' ).is( ':visible' ) );
		ok( $( '#pagerlistitem21' ).is( ':visible' ) );
		ok( $( '#pagerlistitem22' ).is( ':visible' ) );
	});
	
	test("Class parameter tests", function(){
		ok( ! $('#pagerlistclassparam1').is( ':visible' ) );
		ok( $('#pagerlistclassparam2').is( ':visible' ) );
		ok( ! $('#pagerlistclassparam3').is( ':visible' ) );
	});

	test("Selector tests", function(){
		ok( $('#pagertable thead').is( ':visible' ) );
		ok( ! $('#pagerrow1').is( ':visible' ) );
		ok( ! $('#pagerrow2').is( ':visible' ) );
		ok( ! $('#pagerrow3').is( ':visible' ) );
		ok( ! $('#pagerrow4').is( ':visible' ) );
		ok( ! $('#pagerrow5').is( ':visible' ) );
		ok( $('#pagerrow6').is( ':visible' ) );
		ok( $('#pagerrow7').is( ':visible' ) );
		ok( $('#pagerrow8').is( ':visible' ) );
		ok( $('#pagerrow9').is( ':visible' ) );
		ok( $('#pagerrow10').is( ':visible' ) );
		ok( ! $('#pagerrow11').is( ':visible' ) );
		ok( ! $('#pagerrow12').is( ':visible' ) );
	});
}