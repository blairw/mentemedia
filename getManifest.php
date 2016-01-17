<?php
$dir    = '../mentemedia-data/items';
$files1 = scandir($dir);
$files2 = array();
for ($i=0; $i<count($files1); $i++) {
	if (substr($files1[$i],-5) == '.html') {
		$temp = substr($files1[$i], 0, strpos($files1[$i], '.html'));
		array_push($files2, $temp);
	}
}
header('Content-type: application/json');
echo json_encode($files2, JSON_PRETTY_PRINT);
?>
