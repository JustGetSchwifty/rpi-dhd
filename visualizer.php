<!DOCTYPE html>
<html lang="cs">
<head>
   <meta charset="UTF-8">
   <title>Stargate command</title>
   <style>
      * {
         box-sizing: border-box;
      }

      body {
         color: black;
         background: white;
         font-size: 18px;
         font-weight: normal;
         padding: 18px;
         display: flex;
         justify-content: center;
         align-items: center;
         height: 100vh;
         width: 100vw;
         overflow: hidden;
      }

      a.a {
         position: absolute;
         top: 10px;
         left: 10px;
      }

      .heartbeat {
         position: absolute;
         top: 10px;
         right: 10px;
         color: red;
         font-weight: bold;
         font-size: 22px;
      }

      .gate {
         width: 80vh;
         height: 80vh;
         border: 10px solid black;
         border-radius: 100%;
         position: relative;
      }

      .stripe, .chevron {
         display: inline-flex;
         justify-content: center;
         align-items: center;
         background: white;
         color: black;
         width: 44px;
         height: 44px;
         font-weight: bold;
         font-size: 18px;
         border: 5px solid #222222;
         border-radius: 100%;
         position: absolute;
         top: calc( 50% - 22px );
         left: calc( 50% - 22px );
      }

      .chevron.on {
         background: orange;
      }

      .stripe.on {
         background: yellow;
      }

      .stripe {
         border-style: dashed;
         border-color: silver;
      }

      .stripe_11 {
         transform: translateY( -36vh ) translateX( -13vh );
      }

      .chevron_3 {
         transform: translateY( -30vh ) translateX( -25vh );
      }

      .stripe_10 {
         transform: translateY( -20vh ) translateX( -34vh );
      }

      .chevron_5 {
         transform: translateY( -8vh ) translateX( -38vh );
      }

      .stripe_9 {
         transform: translateY( 5vh ) translateX( -39vh );
      }

      .chevron_7 {
         transform: translateY( 18vh ) translateX( -34vh );
      }

      .stripe_8 {
         transform: translateY( 29vh ) translateX( -26vh );
      }

      .chevron_1 {
         transform: translateY( -40vh );
      }

      .stripe_12 {
         transform: translateY( -36vh ) translateX( 13vh );
      }

      .chevron_2 {
         transform: translateY( -30vh ) translateX( 25vh );
      }

      .stripe_13 {
         transform: translateY( -20vh ) translateX( 34vh );
      }

      .chevron_4 {
         transform: translateY( -8vh ) translateX( 38vh );
      }

      .stripe_14 {
         transform: translateY( 5vh ) translateX( 39vh );
      }

      .chevron_6 {
         transform: translateY( 18vh ) translateX( 34vh );
      }

      .stripe_15 {
         transform: translateY( 29vh ) translateX( 26vh );
      }

      .blocker {
         width: 200px;
         height: 50px;
         background: white;
         position: absolute;
         bottom: 0;
         left: calc( 50% - 100px );
         transform: translateY( 20px );
      }
   </style>
</head>
<body>
<?php
   if( isset( $_GET["pin"] ) ) {
      $pin = intval( $_GET["pin"] );
      $state = intval( exec( "gpio read {$pin}") );
      $newState = abs( $state - 1 );
      exec( "gpio write {$pin} {$newState}" );
      header( "Location: /visualizer.php" );
   }
?>
<a class="a" href="/">&lt;&lt; ZPĚT</a><br><br>
<div class="gate">
   <a href="?pin=29" class="chevron chevron_1 pin_29<?php echo ( intval( exec( "gpio read 29" ) ) == 1 ? " on" : " off" ) ?>">01</a>
   <a href="?pin=28" class="chevron chevron_2 pin_28<?php echo ( intval( exec( "gpio read 28" ) ) == 1 ? " on" : " off" ) ?>">02</a>
   <a href="?pin=27" class="chevron chevron_3 pin_27<?php echo ( intval( exec( "gpio read 27" ) ) == 1 ? " on" : " off" ) ?>">03</a>
   <a href="?pin=26" class="chevron chevron_4 pin_26<?php echo ( intval( exec( "gpio read 26" ) ) == 1 ? " on" : " off" ) ?>">04</a>
   <a href="?pin=31" class="chevron chevron_5 pin_31<?php echo ( intval( exec( "gpio read 31" ) ) == 1 ? " on" : " off" ) ?>">05</a>
   <a href="?pin=11" class="chevron chevron_6 pin_11<?php echo ( intval( exec( "gpio read 11" ) ) == 1 ? " on" : " off" ) ?>">06</a>
   <a href="?pin=10" class="chevron chevron_7 pin_10<?php echo ( intval( exec( "gpio read 10" ) ) == 1 ? " on" : " off" ) ?>">07</a>
   <a href="?pin=6" class="stripe stripe_8 pin_6<?php echo ( intval( exec( "gpio read 6" ) ) == 1 ? " on" : " off" ) ?>">08</a>
   <a href="?pin=5" class="stripe stripe_9 pin_5<?php echo ( intval( exec( "gpio read 5" ) ) == 1 ? " on" : " off" ) ?>">09</a>
   <a href="?pin=4" class="stripe stripe_10 pin_4<?php echo ( intval( exec( "gpio read 4" ) ) == 1 ? " on" : " off" ) ?>">10</a>
   <a href="?pin=25" class="stripe stripe_11 pin_25<?php echo ( intval( exec( "gpio read 25" ) ) == 1 ? " on" : " off" ) ?>">11</a>
   <a href="?pin=24" class="stripe stripe_12 pin_24<?php echo ( intval( exec( "gpio read 24" ) ) == 1 ? " on" : " off" ) ?>">12</a>
   <a href="?pin=23" class="stripe stripe_13 pin_23<?php echo ( intval( exec( "gpio read 23" ) ) == 1 ? " on" : " off" ) ?>">13</a>
   <a href="?pin=22" class="stripe stripe_14 pin_22<?php echo ( intval( exec( "gpio read 22" ) ) == 1 ? " on" : " off" ) ?>">14</a>
   <a href="?pin=21" class="stripe stripe_15 pin_21<?php echo ( intval( exec( "gpio read 21" ) ) == 1 ? " on" : " off" ) ?>">15</a>
   <a class="blocker"></a>
</div>

<?php if( isset( $_GET["visualize"] ) ) { ?>
   <a href="?" class="heartbeat">Stop visualization...</a>
   <script type="text/javascript">
      setInterval( function() {
         var xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function() {
            if( this.readyState == 4 && this.status == 200 ) {
               var pins = JSON.parse( xhttp.responseText );
               Object.keys(pins).forEach(function(key, index) {
                  document.querySelector( ".pin_" + key ).classList.add( ( this[key] == 0 ? "off" : "on" ) );
                  document.querySelector( ".pin_" + key ).classList.remove( ( this[key] == 1 ? "off" : "on" ) );
                  //console.log( this );
               }, pins);
            }
         };

         xhttp.open("GET", "getPins.php", true);
         xhttp.send();
      }, 250 );
   </script>
<?php } else {
   ?>
   <a href="?visualize" class="heartbeat">Start visualization...</a>
   <?php
} ?>
</body>
</html>