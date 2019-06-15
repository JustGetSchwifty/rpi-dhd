<?php

   $pins = [ 29,28,27,26,31,11,10,6,5,4,25,24,23,22,21 ];
   $status = [];

   foreach( $pins as $pin ) {
      $status[$pin] = intval( exec( "gpio read {$pin}" ) );
   }

   echo json_encode( $status );