<?php

require "functions.php";

require "models/Livro.php";

session_start();

require "Flash.php";

require "models/Usuario.php";

$config = require 'config.php';

require "database.php";

require "routes.php";

?>