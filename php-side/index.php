<?php
header("Access-Control-Allow-Origin: *");
include_once("db.php");
include_once("function.php");
if (isset($_POST['task'])) {
    $task = $_POST['task'];
    if ($task == 'allUsers') {
        $result = getUsers();
        echo json_encode($result);
        exit;
    } else if ($task == 'addUser') {
        $postedData = json_decode(stripslashes($_POST['data']), true);
        if (isset($postedData['id'])) unset($postedData['id']);
        $result = createUser($postedData);
        if ($result['status'] == 'success') {
            $json['data']   = getUsers();
            $json['status'] = "success";
            $json['text']   = "Data added!";
            echo json_encode($json);
            exit;
        } else {
            echo json_encode($result);
            exit;
        }
    } else if ($task == 'editUser') {
        $postedData = json_decode(stripslashes($_POST['data']), true);
        if (!isset($postedData['id'])) {
            $json['status'] = "success";
            $json['text']   = "User id can not be null!";
            echo json_encode($json);
            exit;
        }
        $item = array();
        $item = $postedData;
        $item['where'][] = "id='" . $postedData['id'] . "'";
        $result = updateUser($item);
        if ($result['status'] == 'success') {
            $json['data']   = getUsers();
            $json['status'] = "success";
            $json['text']   = "Data updated!";
            echo json_encode($json);
            exit;
        } else {
            echo json_encode($result);
            exit;
        }
    } else if ($task == 'deleteUser') {
        $postedData = json_decode(stripslashes($_POST['data']), true);
        if (!isset($postedData['id'])) {
            $json['status'] = "success";
            $json['text']   = "User id can not be null!";
            echo json_encode($json);
            exit;
        }
        $item = array();
        $item = $postedData;
        $item['where'][] = "id='" . $postedData['id'] . "'";
        $result = deleteUser($item);
        if ($result['status'] == 'success') {
            $json['data']   = getUsers();
            $json['status'] = "success";
            $json['text']   = "Data deleted!";
            echo json_encode($json);
            exit;
        } else {
            echo json_encode($result);
            exit;
        }
    }
}
