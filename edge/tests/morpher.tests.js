QUnit.module( "Morpher" );

if ( testConfig.runAll || testConfig.run.morpher ) {

	QUnit.test( "Padding", function( assert ) {
		var testId = 'morpher-id';
		var done = assert.async();
		var el = $( '#' + testId + '-target' );
		var originalPadding = el[0].style.padding;
		
		click();
		
		function click() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( el[0].style.padding > originalPadding, 'Extra padding has been applied' );
				el[0].style.padding = originalPadding;
				done();
			}
			$( '#' + testId + ' #morpher-padding' ).click();
		}
	});
	
	QUnit.test( "Margin", function( assert ) {
		var testId = 'morpher-id';
		var done = assert.async();
		var el = $( '#' + testId + '-target' );
		var originalMargin = el[0].style.margin;
		
		click();
		
		function click() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( el[0].style.margin > originalMargin, 'Extra margin has been applied' );
				el[0].style.margin = originalMargin;
				done();
			}
			$( '#' + testId + ' #morpher-margin' ).click();
		}
	});
	
	QUnit.test( "Width", function( assert ) {
		var testId = 'morpher-id';
		var done = assert.async();
		var el = $( '#' + testId + '-target' );
		var originalWidth = el[0].style.width;
		
		click();
		
		function click() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( el[0].style.width > originalWidth, 'Extra width has been applied' );
				el[0].style.width = originalWidth;
				done();
			}
			$( '#' + testId + ' #morpher-width' ).click();
		}
	});
	
	QUnit.test( "Height", function( assert ) {
		var testId = 'morpher-id';
		var done = assert.async();
		var el = $( '#' + testId + '-target' );
		var originalHeight = el[0].style.height;
		
		click();
		
		function click() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( el[0].style.height > originalHeight, 'Extra height has been applied' );
				el[0].style.height = originalHeight;
				done();
			}
			$( '#' + testId + ' #morpher-height' ).click();
		}
	});
	
	QUnit.test( "Opacity", function( assert ) {
		var testId = 'morpher-id';
		var done = assert.async();
		var el = $( '#' + testId + '-target' );
		var originalOpacity = el[0].style.opacity;
		
		click();
		
		function click() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( el[0].style.opacity > originalOpacity, 'Opacity has been applied' );
				el[0].style.opacity = originalOpacity;
				done();
			}
			$( '#' + testId + ' #morpher-opacity' ).click();
		}
	});
	
	QUnit.test( "Font size", function( assert ) {
		var testId = 'morpher-id';
		var done = assert.async();
		var el = $( '#' + testId + '-target' );
		var originalFontSize = el[0].style.fontSize;
		
		click();
		
		function click() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( el[0].style.fontSize > originalFontSize, 'Font size has been applied' );
				el[0].style.fontSize = originalFontSize;
				done();
			}
			$( '#' + testId + ' #morpher-fontsize' ).click();
		}
	});
	
	QUnit.test( "Line height", function( assert ) {
		var testId = 'morpher-id';
		var done = assert.async();
		var el = $( '#' + testId + '-target' );
		var originalLineHeight = el[0].style.lineHeight;
		
		click();
		
		function click() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( el[0].style.lineHeight > originalLineHeight, 'Line height has been applied' );
				el[0].style.lineHeight = originalLineHeight;
				done();
			}
			$( '#' + testId + ' #morpher-lineheight' ).click();
		}
	});
	
	QUnit.test( "Border width", function( assert ) {
		var testId = 'morpher-id';
		var done = assert.async();
		var el = $( '#' + testId + '-target' );
		el[0].style.border = "1px solid #f00";
		var originalBorderWidth = el[0].style.borderWidth;
		
		click();
		
		function click() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( el[0].style.borderWidth > originalBorderWidth, 'Border width has been applied' );
				el[0].style.border = "none";
				done();
			}
			$( '#' + testId + ' #morpher-borderwidth' ).click();
		}
	});
	
	QUnit.test( "Multiple", function( assert ) {
		var testId = 'morpher-id';
		var done = assert.async();
		var el = $( '#' + testId + '-target' );
		el[0].style.border = "1px solid #f00";
		var originalBorderWidth = el[0].style.borderWidth;
		var originalPadding = el[0].style.padding;
		var originalFontSize = el[0].style.fontSize;
		
		click();
		
		function click() {
			Performer.callback = function(){
				Performer.resetCallback();
				assert.ok( el[0].style.borderWidth > originalBorderWidth, 'Border width has been applied' );
				assert.ok( el[0].style.padding > originalPadding, 'Padding has been applied' );
				assert.ok( el[0].style.fontSize > originalFontSize, 'Font size has been applied' );
				el[0].style.border = "none";
				el[0].style.padding = originalPadding;
				el[0].style.fontSize = originalFontSize;
				done();
			}
			$( '#' + testId + ' #morpher-multiple' ).click();
		}
	});
	
	if (jQuery.Color) {
	
		QUnit.test( "Color", function( assert ) {
			var testId = 'morpher-id';
			var done = assert.async();
			var el = $( '#' + testId + '-target' );
			var originalColor = el[0].style.color;
			
			click();
			
			function click() {
				Performer.callback = function(){
					Performer.resetCallback();
					assert.ok( el[0].style.color != originalColor, 'Color been applied' );
					el[0].style.color = originalColor;
					done();
				}
				$( '#' + testId + ' #morpher-color' ).click();
			}
		});
		
		QUnit.test( "Background color", function( assert ) {
			var testId = 'morpher-id';
			var done = assert.async();
			var el = $( '#' + testId + '-target' );
			var originalBackgroundColor = el[0].style.backgroundColor;
			
			click();
			
			function click() {
				Performer.callback = function(){
					Performer.resetCallback();
					assert.ok( el[0].style.backgroundColor != originalBackgroundColor, 'Background color been applied' );
					el[0].style.backgroundColor = originalBackgroundColor;
					done();
				}
				$( '#' + testId + ' #morpher-backgroundcolor' ).click();
			}
		});
	
	}
}