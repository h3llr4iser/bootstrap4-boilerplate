<?php
	// configure
	$title = "Client | Project Name";

	// do not edit below this line
	$webroot = $_SERVER['REQUEST_URI'];
?><!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><?php echo $title; ?></title>
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
	<style type="text/css">
		/* centered rows */
		@media (min-width: 768px) {
			.centered {
				text-align: center;
			}
			.centered > div {
				display: inline-block;
				float: none;
				text-align: left;
				margin-right: -4px;
			}
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="row centered">
			<div class="col-sm-12 col-md-8 col-lg-6" style="background:transparent;border:0;">
				<h1 style="font-size:1.5em;"><?php echo $title; ?></h1>
				<div class="list-group">
					<?php
						if ($handle = opendir('.')) {
							while (false !== ($entry = readdir($handle))) {

								if (
									$entry != "."
									&& $entry != ".."
									&& $entry != "index.php"
									&& $entry != "README.md"
									&& substr($entry, 0, 1) != '.'
									&& substr($entry, -5) == '.html'
								) {
									$isdir = is_dir( getcwd() . "/" . $entry );
									?><a href="<?php echo $webroot . $entry; if( is_dir( getcwd() . "/" . $entry ) ) echo '/'; ?>" class="list-group-item"><?php
									if( $isdir ) echo '<span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span>&nbsp;&nbsp;';
									else echo '<span class="glyphicon glyphicon-file" aria-hidden="true"></span>&nbsp;&nbsp;';
									echo $entry;
									if( $isdir ) echo '/';
									?></a><?php
								}
							}
							closedir($handle);
						}
					?>
				</div>
			</div>
		</div>
	</div>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</body>
</html>