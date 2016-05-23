<?php

  /*
   * Encodes PHP Arrays as a HTML Data Attribute
   */
  function ui_data($data, $dataProperty='ui'){
    $data =  htmlspecialchars(json_encode($data), ENT_QUOTES, 'UTF-8');
    echo "data-$dataProperty='$data'";
  }
