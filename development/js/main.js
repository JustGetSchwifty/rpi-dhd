var glyphs_dynamic = document.querySelector( ".glyphs .dynamic" );
var glyphs_fixed = document.querySelector( ".glyphs .fixed" );
//var cls = "firstRow";
window.activeGlyph = 0;
window.activatedGlyphs = [];
window.dialingTest = [ true, true, true, true, true, true, true ];
window.checkingNow = 0;
window.scale = 1;
window.dialingTimePerGlyph = 8.25;
window.whereIsSuccess = 7;
window.planetName = "planetu";
window.adminClicks = 0;
window.timeout = null;
window.timeoutReset = null;
window.audio_dial = new Audio('media/Gate-Dial.mp3');
window.audio_open = new Audio('media/Gate-Open.mp3');
window.audio_close = new Audio('media/Gate-Close.mp3');
window.audio_fail = new Audio('media/Gate-Fail.mp3');
window.resetButton = document.querySelector( ".resetButton" );

var cover = document.querySelector( ".cover" );

var xhttp4 = new XMLHttpRequest();
xhttp4.open("GET", "server.php?reset=semiSoft", true);
xhttp4.send();

function reload( ) {
   location.reload();
}

window.resetButton.addEventListener( "click", reload );


document.querySelector( ".sidebar" ).addEventListener( "dblclick", function() {
   window.adminClicks++;
   var status = document.querySelector( ".adminState" );
   status.innerHTML = window.adminClicks;
   if( window.adminClicks > 2 ) {
      TweenMax.to( status, .25, { opacity: .5 } ).yoyo( true ).repeat( 3 );
   }
   if( window.adminClicks == 5 ) {
      window.timeout = setTimeout( function() {
         if( window.adminClicks == 5 ) {
            if( confirm( "POZOR! Opravdu chcete přejít do nastavení?" ) ) {
               window.location.href = "server.php";
            } else {
               clearTimeout( window.timeout );
               clearTimeout( window.timeoutReset );
               window.adminClicks = 0;
            }
         }
         clearTimeout( window.timeout );
      }, 5000 );
   } else if( window.adminClicks > 5 ) {
      window.timeout = setTimeout( function() {
         window.adminClicks = 0;
         status.innerHTML = window.adminClicks;
         TweenMax.to( status, .25, { opacity: .5 } ).yoyo( true ).repeat( 3 );
         clearTimeout( window.timeout );
      }, 5000 );
   } else {
      window.timeoutReset = setTimeout( function() {
         window.adminClicks = 0;
         status.innerHTML = window.adminClicks;
         TweenMax.to( status, .25, { opacity: .5 } ).yoyo( true ).repeat( 3 );
         clearTimeout( window.timeoutReset );
      }, 15000 );
   }
});

for( var o = 0; o < 2; o++ ) {
   for( var i = 1; i <=39; i++ ) {
      var n = ( i < 10 ? "0" : "" ) + i;

      var glyph = document.createElement( "div" );
      glyph.classList.add( "glyph_" + n );
      glyph.classList.add( "glyph" );

      glyph.dataset.id = n;


      var inside = document.createElement( 'span' );
      inside.dataset.glyph = String.fromCharCode(64 + ( i > 26 ? i + 6 : i ));
      inside.innerHTML = String.fromCharCode(64 + ( i > 26 ? i + 6 : i ));
      inside.classList.add( "inside" );

      glyph.appendChild( inside );

      if( o == 0 ) {
         glyphs_dynamic.appendChild( glyph );

         glyph.addEventListener( 'click', function( ) {

            if( window.activeGlyph < 7 ) {
               var activated_id = this.dataset.id;
               var inside = this.querySelector( ".inside" );
               var fixed_glyph = document.querySelector( ".glyphs .fixed .glyph_" + activated_id );

               if( this.classList.contains( "activated" ) ) {
                  TweenMax.to( fixed_glyph.querySelector( ".inside" ), .25, { color: 'red' } ).yoyo(true).repeat( 3 );
                  TweenMax.to( inside, .25, { color: 'red' } ).yoyo(true).repeat( 3 );
               } else {

                  fixed_glyph.classList.add( "activated" );
                  this.classList.add( "activated" );

                  TweenMax.to( cover, .15, { display: 'block', opacity: 1, ease:Power0.easeInOut } );
                  TweenMax.to( fixed_glyph.querySelector( ".inside" ), .5 * window.scale, { color: 'rgb(120,120,120)' } );

                  TweenMax.to( inside, 1 * window.scale, { opacity: 1, scale: 6, ease:Sine.easeInOut, onComplete: function( ) {
                        TweenMax.to( document.querySelector( ".sidebar .glyphBox_" + ( window.activeGlyph + 1 ) ), 1 * window.scale, { color: '#DCDCDC', borderColor: '#02C4D0', delay: .5 * window.scale } );
                        TweenMax.to( inside, 1 * window.scale, { opacity: 1, scale: .8, left: 'auto', height: 62, width: 97, right: 0, top: ( ( window.activeGlyph * 63 ) + ( window.activeGlyph * 2 ) ), y: 9, x: 126, ease:Sine.easeInOut, delay: .5 * window.scale, onComplete: function( ) {
                              window.activatedGlyphs.push( activated_id );
                              window.activeGlyph++;
                              if( window.activeGlyph < 7 ) {
                                 TweenMax.to( cover, .15, { display: 'none', opacity: 0, ease:Power0.easeInOut } );
                              } else {
                                 window.scale = 1;
                                 TweenMax.to( cover, .15, { display: 'flex', width: 790, backgroundColor: 'black', opacity: 1, ease:Power0.easeInOut } );
                                 TweenMax.to( "video", .15, { opacity: .15, ease:Power0.easeInOut } );
                                 TweenMax.to( cover, .5, { backgroundColor: 'black', ease:Power0.easeInOut } );

                                 TweenMax.to( cover.querySelectorAll( ".top, .status" ), 1 * window.scale, { opacity: 1 } );
                                 for( var i = 0; i < 7; i++ ) {
                                    var active = document.querySelector( ".dynamic .glyph_" + window.activatedGlyphs[i] + " .inside" );
                                    TweenMax.to( active, .15 * window.scale, { top: '50%', scale: 1.3, left: 25 + i * 108, x: 0, y: 0, zIndex: 1000 } );
                                 }
                                 TweenMax.staggerTo(document.querySelectorAll('.circle'),1,{opacity:.35,ease﻿:SteppedEase.config(1),repeat:-1,repeatDelay:0.5,delay:-1},0.5);

                                 var xhttp = new XMLHttpRequest();
                                 xhttp.onreadystatechange = function() {
                                    if (this.readyState == 4 && this.status == 200) {
                                       var response = JSON.parse( xhttp.responseText ).response;
                                       window.whereIsSuccess = response.whereIsSuccess;
                                       window.dialingTest = response.dialingTest;
                                       window.planetName = response.dialing;
                                       for( var i = 0; i < 7; i++ ) {
                                          if( window.dialingTest[i] === false ) {
                                             window.whereIsSuccess = i + 1;
                                             break;
                                          } 
                                       }

                                       TweenMax.to( window.resetButton, 1, { opacity: .5 } );

                                       for( var i = 0; i < window.whereIsSuccess; i++ ) {
                                          var statusBox = document.querySelector( '.statusBox.status_' + i );

                                          TweenMax.to( statusBox, .5 * window.scale, { opacity: 1, delay: window.scale * ( i * window.dialingTimePerGlyph ), onComplete: function( ) {

                                                if( window.scale >= 1 ) {
                                                   window.audio_dial.currentTime = 0;
                                                   window.audio_dial.play();

                                                   if( window.dialingTest[window.checkingNow] !== true ) {
                                                      setTimeout( function() {
                                                         window.audio_dial.pause();
                                                         window.audio_dial.currentTime = 0;
                                                         window.audio_fail.currentTime = 0;
                                                         window.audio_fail.play();
                                                      }, 5650 );
                                                   }
                                                }

                                                TweenMax.to( this.target, .25, { color: 'white', onComplete: function( ) {
                                                   } } ).yoyo(true).repeat( ( window.dialingTimePerGlyph - 2 ) * ( 1 / .25 ) );

                                                var target = this.target;

                                                var xhttp2 = new XMLHttpRequest();
                                                xhttp2.open("GET", "server.php?dialingNow=" + window.checkingNow, true);
                                                xhttp2.send();


                                                setTimeout( function( ) {

                                                   if( window.dialingTest[window.checkingNow] === true ) {
                                                      var xhttp3 = new XMLHttpRequest();
                                                      xhttp3.open( "GET", "server.php?dialedNow=" + window.checkingNow, true );
                                                      xhttp3.send();
                                                   } else {
                                                      var xhttp3 = new XMLHttpRequest();
                                                      xhttp3.open( "GET", "server.php?dialedNowWithError=" + window.checkingNow, true );
                                                      xhttp3.send();
                                                   }

                                                   TweenMax.to( target, .01, { color: 'white', onComplete: function( ) {
                                                         target.innerHTML = ( window.dialingTest[window.checkingNow] ? "symbol zapadl" : "symbol nezapadl" );
                                                         if( !window.dialingTest[window.checkingNow] ) {
                                                            TweenMax.to( target, .25, { color: 'red' } ).yoyo(true).repeat( 14 );
                                                            document.querySelector( ".cover .top h1" ).innerHTML = "Adresa je chybná!";
                                                            TweenMax.to( document.querySelectorAll('.circle'), .05, { display: 'none' } );
                                                            TweenMax.to( document.querySelector( ".cover .top h1" ), .5, { color: 'red' } );
                                                            TweenMax.to( "video", .15, { opacity: 0, ease:Power0.easeInOut } );
                                                            TweenMax.to( ".dialer", .25, { borderColor: 'red', ease:Power0.easeInOut } );
                                                         } else {
                                                            TweenMax.to( target, .15, { color: '#06FF20' } );
                                                         }

                                                         if( window.checkingNow == 6 && window.dialingTest[window.checkingNow] === true ) {



                                                            setTimeout( function( ) {

                                                               if( window.scale >= 1 ) {
                                                                  window.audio_open.currentTime = 0;
                                                                  window.audio_open.play();
                                                               }

                                                               var xhttp5 = new XMLHttpRequest();
                                                               xhttp5.open("GET", "server.php?success", true);
                                                               xhttp5.send();
                                                               document.querySelector( ".cover .top h1" ).innerHTML = "Spojení na " + window.planetName + " navázáno!";
                                                               TweenMax.to( document.querySelectorAll('.circle'), .05, { display: 'none' } );
                                                               document.querySelector( ".cover .top h1" ).classList.add( "smaller" );
                                                               TweenMax.to( document.querySelector( ".cover .top h1" ), .5, { color: '#06FF20' } );
                                                               TweenMax.to( ".dialer", .25, { borderColor: '#06FF20', ease:Power0.easeInOut } );
                                                               TweenMax.to( "video", .15, { opacity: 0, ease:Power0.easeInOut } );
                                                               window.resetButton.innerHTML = "ZAVŘÍT BRÁNU";
                                                               TweenMax.to( window.resetButton, .5, { opacity: 1, width: 400, left: 200, bottom: 20, height: 50, color: 'black', fontSize: 25, backgroundColor: '#06FF20' } );
                                                               window.resetButton.removeEventListener( "click", reload );
                                                               window.resetButton.addEventListener( "click", function( ) {
                                                                  reset( false );
                                                               });
                                                            }, 2000 * window.scale );

                                                         } else if( window.checkingNow == window.whereIsSuccess - 1 && window.dialingTest[window.checkingNow] === false ) {
                                                            window.checkingNow++;
                                                            setTimeout( "reset(true)", 5000 * window.scale );
                                                         } else {
                                                            window.checkingNow++;
                                                         }
                                                      } } );
                                                }, ( window.dialingTimePerGlyph - 1 ) * 1000 - 500 * window.scale );

                                             } } );
                                       }
                                    }
                                 };

                                 var dialed = JSON.stringify( activatedGlyphs );
                                 dialed = encodeURI(dialed);

                                 xhttp.open("GET", "server.php?dialed=" + dialed, true);
                                 xhttp.send();
                              }
                           } } );
                     } } );
               }
            }

         });

      } else {
         glyphs_fixed.appendChild( glyph );
      }
   }
}

function reset( quick ) {
   if( quick === true ) {
      window.scale = .4;
   } else {
      window.audio_close.currentTime = 0;
      window.audio_close.play();
   }

   var xhttp4 = new XMLHttpRequest();
   xhttp4.open("GET", "server.php?reset=" + ( quick ? "hard" : "soft" ), true);
   xhttp4.send();

   TweenMax.to( window.resetButton, 1, { opacity: 0 } );
   TweenMax.to( document.querySelectorAll( ".top, .status, .dynamic .glyph.activated .inside" ), 3.5 * window.scale, { opacity: 0, onComplete: function() {

         reload( );

      } } );


}

//TweenMax.to( ".dynamic .glyph_05", 2, { position: 'absolute', left: '50%', top: '50%' } );
//TweenMax.to( ".fixed .glyph_01", 0.01, { color: 'white' } );