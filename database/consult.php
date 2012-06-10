<?php
	include_once('database.php');

	function get_all_students() {
		global $db;

		$stmt = $db->query('SELECT * FROM Student');
		if(!$stmt)
			return false;
		else
			return $stmt->fetchAll(SQLITE_ASSOC);
	}

	function get_student_by_id($id) {
		global $db;

		$id = sqlite_escape_string($id);
		$stmt = $db->query("SELECT * FROM Student WHERE studentID = {$id}");
		if(!$stmt)
			return false;
		else
			return $stmt->fetch(SQLITE_ASSOC);
	}

	function get_students_by_week($week) {
		global $db;

		$week = sqlite_escape_string($week);
		$stmt = $db->query("SELECT * FROM Student WHERE week = {$week}");
		if(!$stmt)
			return false;
		else
			return $stmt->fetchAll(SQLITE_ASSOC);
	}
	
	function get_students_by_day($day) {
		global $db;

		$day = sqlite_escape_string($day);
		$stmt = $db->query("SELECT * FROM Student WHERE day = '{$day}'");
		if(!$stmt)
			return false;
		else
			return $stmt->fetchAll(SQLITE_ASSOC);
	}

	function generate_file_name($id) {
		$student = get_student_by_id($id);
		if(!$student)
			return false;
		
		$res = preg_match('/^\w*/', $student['studentName'], $matches);
		$filename = $matches[0];
		$res = preg_match('/\w*$/', $student['studentName'], $matches);
		$filename .= '_' . $matches[0] . '_' . $student['day'] . '_' . $student['studentID'];
		$filename = str_replace('-', '_', $filename);
		$filename = strtolower($filename);
		return $filename;
	}
?>
