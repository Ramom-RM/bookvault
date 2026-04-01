<?php

// $_SESSION['auth']

session_destroy();

header('location: /login');

exit();