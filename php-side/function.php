<?php
function SQL_ready($str)
{
    if ($str != '' && !is_array($str)) {
        $str = str_ireplace('"', '\"', trim($str));
        $str = str_ireplace("'", "\'", trim($str));
        $str = str_ireplace("\\\\'", "\'", trim($str));
        return $str;
    }
    return $str;
}

function getUsers()
{
    global $db;
    $SQL = $db->query('SELECT * FROM users ORDER BY id DESC');
    $users = array();
    while ($row = mysqli_fetch_assoc($SQL)) {
        $users[] = $row;
    }
    return $users;
}

function createUser($item = array())
{
    global $db;
    $keys = array();
    $values = array();
    foreach ($item as $key => $value) {
        $item[$key] =  SQL_ready($value);
    }
    $keys    = implode('`,`', array_keys($item));
    $values  = implode("','", array_values($item));
    $SQL = "INSERT INTO users (`$keys`) values ('$values')";
    $result = $db->query($SQL);
    $json = array();
    if (!$result) {
        $json['status'] = "danger";
        $json['text']   = "Data couldn't add!";
        return $json;
    }
    $json['status']   = "success";
    $json['id']       = $db->insert_id;
    return $json;
}

function updateUser($item = array())
{
    global $db;
    if (!isset($item['where'])) {
        $json['status'] = "danger";
        $json['text']   = "You should add where clause!";
        return $json;
    }
    $WHERE = join(' AND ', $item['where']);
    unset($item['where']);
    $SQL = array();
    foreach ($item as $key => $value) {
        $value = ($value != '') ? $value = SQL_ready($value) : $value;
        $SQL[] =  "`$key` ='" . $value . "'";
    }
    $SQL    = implode(',', $SQL);
    $SQL = "UPDATE users SET $SQL WHERE $WHERE;";
    $result         = $db->query($SQL);
    if (!$result) {
        $json['status'] = "danger";
        $json['text']   = "Data couldn't update!";
        return $json;
    }
    $json['status']   = "success";
    return $json;
}

function deleteUser($item = array()){
    global $db;
    if (!isset($item['where'])) {
        $json['status'] = "danger";
        $json['text']   = "You should add where clause!";
        return $json;
    }
    $WHERE = join(' AND ', $item['where']);
    $SQL = "DELETE FROM users WHERE $WHERE;";
    $result         = $db->query($SQL);
    if (!$result) {
        $json['status'] = "danger";
        $json['text']   = "Data couldn't delete!";
        return $json;
    }
    $json['status']   = "success";
    return $json;
}
