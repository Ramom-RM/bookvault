<?php

session_start();

require "functions.php";

require "models/Livro.php";

require "models/Usuario.php";

$config = require 'config.php';

require "database.php";

require "routes.php";

?>