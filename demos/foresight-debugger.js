// DEMO JAVASCRIPT ONLY
// this is not required to use foresight.js, this is here only to help view info about the images


var initForesightDebugger = function () {
	// oncomplete only being use to print out debugger info, demo purposes only
	var info = [];

	info.push( 'Foresight Images: ' + foresight.images.length );
	info.push( 'Device Pixel Ratio: ' + foresight.devicePixelRatio );
	info.push( 'Connection Test Result: ' + foresight.connTestResult );
	if( foresight.connTestResult !== 'skip' ) {
		info.push( 'Connection Type: ' + foresight.connType );
		info.push( 'Estimated Connection Speed: ' + foresight.connKbps + 'Kbps' );
	}
	info.push( 'Bandwidth: ' + foresight.bandwidth );
	info.push( '<hr>' );

	// add in a <pre> element or use one already there for debugging info
	var docPres = document.getElementsByTagName('pre');
	if(docPres && docPres.length) {
		var docPre = docPres[0];
	} else {
		var docPre = document.createElement( 'pre' );
		if(foresight.images.length) {
			foresight.images[0].parentElement.insertBefore(docPre, foresight.images[0]);
		} else {
			document.body.appendChild(docPre);
		}
	}
	docPre.innerHTML = info.join( '<br>' );


	// print out img info above each foresight image
	for( var x = 0; x < foresight.images.length; x++ ) {
		var img = foresight.images[ x ];
		
		if ( !img.requestChange ) {
			continue;
		}
		
		var imgInfo = [];
		imgInfo.push( 'Original: <a href="' + img.orgSrc + '">' + img.orgSrc + '</a>');
		if ( img.computedWidth ) {
			imgInfo.push( 'Computed Width: ' + img.computedWidth );
		}
		imgInfo.push( 'Browser Width/Height: ' + img.browserWidth + 'x' + img.browserHeight );
		imgInfo.push( 'Request Width/Height: ' + img.requestWidth + 'x' + img.requestHeight );
		imgInfo.push( 'Unit Type: ' + img.unitType + ', Bandwidth: ' + img.bandwidth + ', Scale: ' + img.scaleFactor );

		imgInfo.push( 'Src Modification: ' + img.srcModification );
		if ( img.highResolutionSrc && foresight.hiResEnabled ) {
			imgInfo.push( 'Hi-Res Src Attribute: ' + img.highResolutionSrc );
		} else {
			if( img.srcModification === 'src-uri-template' ) {
				imgInfo.push( 'URI Template: ' + img.uriTemplate );
			}
		}

		imgInfo.push( 'Request: <a href="' + img.src + '">' + img.src + '</a>' );

		if ( !img.infoElement ) {
			img.infoElement = document.createElement( 'div' );
			img.parentElement.insertBefore(img.infoElement, img);
		}
		
		var newInfoElement = document.createElement( 'pre' );
		newInfoElement.innerHTML = imgInfo.join( '<br>' ) + '<hr>';
		img.infoElement.appendChild(newInfoElement);
	}

};

var foresightDebugger = function () {
	// kick off the debugger when the window has been loaded
	if ( document.readyState === 'complete' ) {
		initForesightDebugger();
	} else {
		if ( document.addEventListener ) {
			window.addEventListener( "load", initForesightDebugger, false );
		} else if ( document.attachEvent ) {
			window.attachEvent( "onload", initForesightDebugger );
		}
	}
}


window.foresight = window.foresight || {};

window.foresight.updateComplete = foresightDebugger;

window.foresight.options = window.foresight.options || {};


// You can set your own variables both bandwidth and device pixel ratio

// Querystring dpr sets the device pixel ratio, possible values: 1.5 and 2
// Querystring bw sets the bandwidth, possible values: low and high


if ( window.location.search.indexOf( 'dpr=2' ) > -1 ) {
	window.foresight.options.forcedPixelRatio = 2
} else if ( window.location.search.indexOf( 'dpr=1.5' ) > -1 ) {
	window.foresight.options.forcedPixelRatio = 1.5
}

if ( window.location.search.indexOf( 'bw=low' ) > -1 ) {
	window.foresight.options.forcedBandwidth = 'low'
} else if ( window.location.search.indexOf( 'bw=high' ) > -1 ) {
	window.foresight.options.forcedBandwidth = 'high'
}





