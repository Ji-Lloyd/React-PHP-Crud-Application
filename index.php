<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");  

include 'DbConnect.php';
$objDB = new DbConnect;
$conn = $objDB -> connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method){
    case "GET":
        $sql = "SELECT * FROM users";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])){
            $sql .= " WHERE id = :id";
            $stmnt = $conn->prepare($sql);
            $stmnt -> bindParam(':id', $path[3]);
            $stmnt -> execute();
            $users = $stmnt -> fetch(PDO::FETCH_ASSOC);
        }else{
            $stmnt = $conn->prepare($sql);
            $stmnt -> execute();
            $users = $stmnt -> fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($users);
        break;
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO users (id, name, email, mobile, date_created) VALUES (null, :name, :email, :mobile, :date_created)";
        $stmnt = $conn->prepare($sql);
        $date_created = date('Y-m-d');
        $stmnt -> bindParam(':name', $user -> name);
        $stmnt -> bindParam(':email', $user -> email);
        $stmnt -> bindParam(':mobile', $user -> mobile);
        $stmnt -> bindParam(':date_created', $date_created);

        if($stmnt -> execute()){
            $response = ['status' => 1, 'message' => 'Record Created Successfully.'];
        }else{
            $response = ['status' => 0, 'message' => 'Failed Record.'];
        }
        break;

    case "PUT":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE users SET name= :name, email =:email, mobile =:mobile, date_updated =:date_updated WHERE id = :id";
        $stmnt = $conn->prepare($sql);
        $date_updated = date('Y-m-d');
        $stmnt->bindParam(':id', $user -> id);
        $stmnt -> bindParam(':name', $user -> name);
        $stmnt -> bindParam(':email', $user -> email);
        $stmnt -> bindParam(':mobile', $user -> mobile);
        $stmnt -> bindParam(':date_updated', $date_updated);
        if($stmnt -> execute()){
            $response = ['status' => 1, 'message' => 'Record Updated Successfully.'];
        }else{
            $response = ['status' => 0, 'message' => 'Failed Uodate.'];
        }
        break;

    case "DELETE":
        $sql = "DELETE FROM users WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmnt = $conn->prepare($sql);
        $stmnt->bindParam(':id', $path[3]);

        if($stmnt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}
?>