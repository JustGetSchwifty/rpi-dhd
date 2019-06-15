<?php
   $write = "";
for( $i = 1; $i < 40; $i++ ) {
   $n = ( $i < 10 ? "0" : "" ) . $i;
   $file = "Stargate_SG·1_symbol_" . $n . ".svg";
   $out = exec( "svgo -i {$file} -o -" );
   //$out = str_replace( array( "#000", "#fff", "gray", "version=\"1.0\">", "\"none\"" ), array( "#{\$stroke}", "#{\$fill}", "#{\$fill}", "version=\"1.0\"><style>path{fill:#{\$fill}path.none{fill:none}</style>", "\"none\" class=\"none\"" ), $out );
   //$out = str_replace( array( "version=\"1.0\">" ), array( "version=\"1.0\"><style>*{filter:invert(100%);}</style>" ), $out );
   $write .= <<<HMTL
@if \$name == 'symbol_{$n}' {
 \$image: '{$out}';
}
   

HMTL;
}

file_put_contents( "out.scss", $write );