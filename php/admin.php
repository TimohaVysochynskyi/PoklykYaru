<?php
session_start();
$login = strip_tags($_POST['login-pin']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
<? if($login == 1111 || $_SESSION['logged'] == True): ?>
<? $_SESSION['logged'] = True; ?>

    <!-- Content starts HERE -->

    <main>
        <h1>Відгуки від користувачів</h1>
        <ul>
        <?php
            require "./connection/connect.php";
            $data = $mysql->query("SELECT * FROM `feedback` WHERE `status` = 'False'");
            $feedbacks = $data->num_rows;
            if ($feedbacks > 0) {
                foreach ($data as $row) {
                    $id = $row['id'];
                    $name = $row['name'];
                    $surname = $row['surname'];
                    $message = $row['message'];
                    echo '<li>';
                    echo '<div><h2>'.$name.' ';
                    echo $surname.'</h2></div>';
                    echo '<h3>'.$message.'</h3>';
                    echo "<form action='' method='post'>
                    <button type='submit' id='done' name='$id'>Гооу!</button></form>";
                    echo '</li>';
                    if (isset($_POST[$id])) {
                        $mysql->query("UPDATE `feedback` SET `status` = 'True'");
                    }
                }
            $mysql->close();
            } else {
                echo '
                    <div style="display: flex;
                                justify-content: center;
                                align-items: center;
                                flex-direction: column;
                                height: 60vh;
                                padding: 30px;
                                border: 2px solid #aaa">
                        <h2>Ще нема відгуків на перевірку :(</h2>
                    </div>';
            }
        ?>
        </ul>
    </main>
    
    <!-- Content finishes HERE -->

<? else: ?>
<? $_SESSION['logged'] = False; ?>
<form action="" method="post"><h1>Залогінитися</h1><input type="text" name="login-pin" placeholder="Пін код"><button type="submit">Зайти</button></form>
<? endif ?>
</body>
</html>