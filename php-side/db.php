<?php

$db =  mysqli_connect(
    'localhost',
    'root',
    'password',
    'tor_db'
);
if (!$db) {
    die("We couldn't connect to mysql!");
}
