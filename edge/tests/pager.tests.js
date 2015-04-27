QUnit.module( "Pager" );

if ( testConfig.runAll || testConfig.run.pager ) {

	QUnit.test( "Pager initialised", function( assert ) {
		assert.ok( $( '#pagerlistitem1' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem2' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem3' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem4' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem5' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem6' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem7' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem8' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem9' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem10' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem11' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem12' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem13' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem14' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem15' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem16' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem17' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem18' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem19' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem20' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem21' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem22' ).is( ':visible' ) );
		
		assert.equal( $( '#pagerlist-pagination' ).length, 1 );
		
		assert.equal( $( '#pagerlist-pagination' ).children().length, 3 );
	});
	
	QUnit.test( "Page 2", function( assert ) {
		$( '#pagerlist-page2' ).click();
		
		assert.ok( ! $( '#pagerlistitem1' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem2' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem3' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem4' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem5' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem6' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem7' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem8' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem9' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem10' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem11' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem12' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem13' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem14' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem15' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem16' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem17' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem18' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem19' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem20' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem21' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem22' ).is( ':visible' ) );
	});
	
	QUnit.test( "Page 3", function( assert ) {
		$( '#pagerlist-page3' ).click();
		
		assert.ok( ! $( '#pagerlistitem1' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem2' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem3' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem4' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem5' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem6' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem7' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem8' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem9' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem10' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem11' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem12' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem13' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem14' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem15' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem16' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem17' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem18' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem19' ).is( ':visible' ) );
		assert.ok( ! $( '#pagerlistitem20' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem21' ).is( ':visible' ) );
		assert.ok( $( '#pagerlistitem22' ).is( ':visible' ) );
	});
	
	QUnit.test("Class parameter tests", function( assert ){
		assert.ok( ! $('#pagerlistclassparam1').is( ':visible' ) );
		assert.ok( $('#pagerlistclassparam2').is( ':visible' ) );
		assert.ok( ! $('#pagerlistclassparam3').is( ':visible' ) );
	});

	QUnit.test("Selector tests", function( assert ){
		assert.ok( $('#pagertable thead').is( ':visible' ) );
		assert.ok( ! $('#pagerrow1').is( ':visible' ) );
		assert.ok( ! $('#pagerrow2').is( ':visible' ) );
		assert.ok( ! $('#pagerrow3').is( ':visible' ) );
		assert.ok( ! $('#pagerrow4').is( ':visible' ) );
		assert.ok( ! $('#pagerrow5').is( ':visible' ) );
		assert.ok( $('#pagerrow6').is( ':visible' ) );
		assert.ok( $('#pagerrow7').is( ':visible' ) );
		assert.ok( $('#pagerrow8').is( ':visible' ) );
		assert.ok( $('#pagerrow9').is( ':visible' ) );
		assert.ok( $('#pagerrow10').is( ':visible' ) );
		assert.ok( ! $('#pagerrow11').is( ':visible' ) );
		assert.ok( ! $('#pagerrow12').is( ':visible' ) );
	});
}