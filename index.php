<?php

$method = $_SERVER['REQUEST_METHOD'];

$input = file_get_contents('php://input');
$object = json_decode($input, true);

$title = $object['title'];

switch($method)
{
    case 'GET': 
        $todos = array(
            array('title' => 'title1'),
            array('title' => 'title2')        
        );
        
        header('Content-type: application/json; charset=UTF-8');
        echo json_encode($todos);
        die();
        break;
    case 'POST': 
        $result = "post:" . $title;
        break;

    default:
        $result = "nada";   
}

error_log($result . "\n", 3, 'fran_te_amo.log');