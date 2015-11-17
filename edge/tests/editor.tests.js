QUnit.module( "Editor" );

if ( testConfig.runAll || testConfig.run.editor ) {

	$.mockjax( function( requestSettings ) {
		if ( requestSettings.url === "/docs/editor/test1" ) {
			return {
				response: function( origSettings ) {
					this.responseText = "Test response 1";
				}
			};
		}
		if ( requestSettings.url === "/docs/editor/test3" ) {
			return {
				response: function( origSettings ) {
					this.responseText = "Test response 3";
				}
			};
		}
		if ( requestSettings.url === "/docs/editor/test5" ) {
			return {
				response: function( origSettings ) {
					this.responseText = "Test response 5";
				}
			};
		}
		if ( requestSettings.url === "/docs/editor/test6" ) {
			return {
				response: function( origSettings ) {
					this.responseText = "Test response 6";
				}
			};
		}
		return;
	});
	
	QUnit.test( "With buttons: Edit", function( assert ) {
		var testId = 'Editor';
		var el = $( '#' + testId + ' #withButtons' );
		
		var done1 = assert.async();
		var done2 = assert.async();
		edit();
		
		function edit() {
			var txt = $( '.editor', el );
			assert.equal( txt.html(), 'Test 1', 'Text is correct' );
			txt.click();
			assert.ok( txt.html().indexOf( '<form' ) > -1, 'Form has been created' );
			done1();
			submit();
		}
		
		function submit() {
			Performer.callback = function(){
				Performer.resetCallback();
				var txt = $( '.editor', el );
				assert.equal( txt.html(), 'Test response 1', 'Text is correct after saving' );
				done2();
			}
			var btn = $( 'input[type="submit"]', el );
			btn.click();
		}
	});
	
	QUnit.test( "With buttons: Edit then cancel", function( assert ) {
		var testId = 'Editor';
		var el = $( '#' + testId + ' #withButtonsCancel' );
		var txt = $( '.editor', el );
		
		assert.equal( txt.html(), 'Test 2', 'Text is correct' );
		txt.click();
		assert.ok( txt.html().indexOf( '<form' ) > -1, 'Form has been created' );
		
		var btn = $( 'input[type="submit"]', el );
		var cancel = $( '.uneditor', el );
		
		cancel.click();
		assert.equal( txt.html(), 'Test 2', 'Text is correct after cancelling' );
	});
	
	QUnit.test( "With buttons (class parameter): Edit", function( assert ) {
		var testId = 'Editor';
		var el = $( '#' + testId + ' #classParamWithButtons' );
		
		var done1 = assert.async();
		var done2 = assert.async();
		edit();
		
		function edit() {
			var txt = $( '.editor', el );
			assert.equal( txt.html(), 'Test 3', 'Text is correct' );
			txt.click();
			assert.ok( txt.html().indexOf( '<form' ) > -1, 'Form has been created' );
			done1();
			submit();
		}
		
		function submit() {
			Performer.callback = function(){
				Performer.resetCallback();
				var txt = $( '.editor', el );
				assert.equal( txt.html(), 'Test response 3', 'Text is correct after saving' );
				done2();
			}
			var btn = $( 'input[type="submit"]', el );
			btn.click();
		}
	});
	
	QUnit.test( "With buttons (class parameter): Edit then cancel", function( assert ) {
		var testId = 'Editor';
		var el = $( '#' + testId + ' #withoutButtons' );
		var txt = $( '.editor', el );
		
		assert.equal( txt.html(), 'Test 5', 'Text is correct' );
		txt.click();
		assert.ok( txt.html().indexOf( '<form' ) > -1, 'Form has been created' );
		
		var btn = $( 'input[type="submit"]', el );
		var cancel = $( '.uneditor', el );
		
		cancel.click();
		assert.equal( txt.html(), 'Test 5', 'Text is correct after cancelling' );
	});
	
	QUnit.test( "Without buttons: Edit", function( assert ) {
		var testId = 'Editor';
		var el = $( '#' + testId + ' #classParamWithoutButtons' );
		var txt = $( '.editor', el );
		
		assert.equal( txt.html(), 'Test 6', 'Text is correct' );
		txt.click();
		assert.ok( txt.html().indexOf( '<form' ) > -1, 'Form has been created' );
		
		var input = $( 'input[type="text"]', el );
		var dummyBtn = $( '#dummyButton' );
		var done = assert.async();
		
		blur();
		
		function blur() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( txt.html(), 'Test response 6', 'Text is correct after cancelling' );
				done();
			}
			dummyBtn.click();
		}
	});
	
	QUnit.test( "Without buttons (class parameter): Edit", function( assert ) {
		var testId = 'Editor';
		var el = $( '#' + testId + ' #classParamWithoutButtons' );
		var txt = $( '.editor', el );
		
		assert.equal( txt.html(), 'Test 4', 'Text is correct' );
		txt.click();
		assert.ok( txt.html().indexOf( '<form' ) > -1, 'Form has been created' );
		
		var input = $( 'input[type="text"]', el );
		var dummyButton = $( '#dummyButton' );
		var done = assert.async();
		
		blur();
		
		function blur() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.equal( txt.html(), 'Test response 4', 'Text is correct after cancelling' );
				done();
			}
			dummyButton.click();
		}
	});
}