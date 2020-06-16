<?php

//	error_reporting(E_ALL);
//	ini_set('display_errors', 1);

include_once("database.php");

class Api extends Database{

	function Api(){
	}

	/* Quote/escape something to use in a query */
	function db_quote($str) {
		$str = trim($str);
		return addslashes($str);
	}
	function fixCharacters($string)
	{
		$string = trim(utf8_encode($string));

		$string= htmlspecialchars($string, ENT_COMPAT,'ISO-8859-1', true);
		$string=preg_replace('/"/', '', $string);
		$string=str_replace('"', '', $string);

		return $string;
	}

	function create_user($params){

		if (!($params['Email']))
			return json_encode(array('Error' => 'Email cant be empty'),JSON_FORCE_OBJECT);
		if (!strlen($params['Password']))
			return json_encode(array('Error' => 'password cant be empty'),JSON_FORCE_OBJECT);


		$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);

		if (!$sqlconnect){
			$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);
		}

		$sqlquery="spCreateUser '".$this->db_quote($params['Name'])."','"
			.$this->db_quote($params['TecID'])."','".$this->db_quote($params['Email'])."','"
			.$this->db_quote($params['Password'])."';";


		$process=@odbc_exec($sqlconnect, $sqlquery);

		$resul=false;

		$csv=odbc_fetch_array($process);

		if(!$csv){

			return "-1";
		}
		else{
			return $csv;
		}
	}

	function forgot_password($params){

		$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);

		if (!$sqlconnect){
			$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);
		}

		$sqlquery="spForgotPassword '".$this->db_quote($params['TecID'])."','".$this->db_quote($params['Password']). "';";

		$process=@odbc_exec($sqlconnect, $sqlquery);

		$csv=odbc_fetch_array($process);

		if(!$csv){
			return "-1";
		}
		else{
			return $csv;
		}
	}

	function login($params){

		$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);

		if (!$sqlconnect){
			$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);
		}

		$sqlquery="spLogin '".$this->db_quote($params['TecId'])."','".$this->db_quote($params['Password'])."';";

		$process=@odbc_exec($sqlconnect, $sqlquery);

		$csv=odbc_fetch_array($process);

		if(!$csv){
			return "-1";
		}
		else{
			return $csv;
		}
	}

	function create_project($params){

		$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);

		if (!$sqlconnect){
			$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);
		}

		$sqlquery="spCreateProject '".$this->db_quote($params['projectName'])."','".$this->db_quote($params['projectDetail'])
			."','".$this->db_quote($params['projectDate'])."';";

		$process=@odbc_exec($sqlconnect, $sqlquery);

		$csv=odbc_fetch_array($process);

		if(!$csv){
			return "-1";
		}
		else{
			return $csv;
		}
	}
	function edit_project($params){

		$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);

		if (!$sqlconnect){
			$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);
		}

		$sqlquery="spEditProject '".$this->db_quote($params['Project_name'])."','".$this->db_quote($params['Description'])
			."','".$this->db_quote($params['Image'])."';";

		$process=@odbc_exec($sqlconnect, $sqlquery);

		$csv=odbc_fetch_array($process);

		if(!$csv){
			return "-1";
		}
		else{
			return $csv;
		}
	}

	function return_project($params){

		$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);

		if (!$sqlconnect){
			$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);
		}

		$sqlquery="spReturnProject '".$this->db_quote($params['Project_name'])."';";

		$process=@odbc_exec($sqlconnect, $sqlquery);

		$csv=odbc_fetch_array($process);

		if(!$csv){
			return "-1";
		}
		else{
			return $csv;
		}
	}

	function return_project_list($params){

		$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);

		if (!$sqlconnect){
			$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);
		}

		$sqlquery="spReturnProjectList ".";";

		$process=@odbc_exec($sqlconnect, $sqlquery);

		$lista = array();

		while ($row = odbc_fetch_array($process)) {
			$row2 = array();
			foreach ($row as $key => $value) {
				$row2[$key] = $this->fixCharacters($value);
			}
			array_push($lista, $row2);
		}

		odbc_close($sqlconnect);


		if(!$lista){
			return "-1";
		}
		else{
			return $lista;
		}
	}

	function return_material_list($params){

		$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);

		if (!$sqlconnect){
			$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);
		}

		$sqlquery="spReturnMaterialList ".";";

		$process=@odbc_exec($sqlconnect, $sqlquery);

		$lista = array();

		while ($row = odbc_fetch_array($process)) {
			$row2 = array();
			foreach ($row as $key => $value) {
				$row2[$key] = $this->fixCharacters($value);
			}
			array_push($lista, $row2);
		}

		odbc_close($sqlconnect);


		if(!$lista){
			return "-1";
		}
		else{
			return $lista;
		}
	}

	function create_material($params){

		$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);

		if (!$sqlconnect){
			$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);
		}

		$sqlquery="spCreateMaterial '".$this->db_quote($params['Material_name'])."','".$this->db_quote($params['Thickness'])
			."','".$this->db_quote($params['Id_cut'])."','".$this->db_quote($params['Id_trace'])."';";

		$process=@odbc_exec($sqlconnect, $sqlquery);

		$csv=odbc_fetch_array($process);


		if(!$csv){
			return "-1";
		}
		else{
			return json_encode($csv, JSON_FORCE_OBJECT);
		}
	}

	function add_material($params){

		$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);

		if (!$sqlconnect){
			$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);
		}

		$sqlquery="spAddMaterial '".$this->db_quote($params['materialName'])."','".$this->db_quote($params['cutPower'])
			."','".$this->db_quote($params['cutSpeed'])."','".$this->db_quote($params['tracePower'])."','".$this->db_quote($params['traceSpeed'])."';";

		$process=@odbc_exec($sqlconnect, $sqlquery);

		$csv=odbc_fetch_array($process);

		if(!$csv){
			return "-1";
		}
		else{
			return $csv;
		}
	}

	function return_laser_parameters($params){

		$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);

		if (!$sqlconnect){
			$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);
		}

		$sqlquery="spReturnLaserParameters '".$this->db_quote($params['Material_name'])."','".$this->db_quote($params['Thickness'])."';";

		$process=@odbc_exec($sqlconnect, $sqlquery);

		$csv=odbc_fetch_array($process);

		if(!$csv){
			return "-1";
		}
		else{
			return $csv;
		}
	}
	function edit_material($params){

		$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);

		if (!$sqlconnect){
			$sqlconnect=odbc_connect($this->dsn,$this->username,$this->password);
		}

		$sqlquery="spEditMaterial '".$this->db_quote($params['Material_name'])."','".$this->db_quote($params['Thickness'])
			."','".$this->db_quote($params['Id_cut'])."','".$this->db_quote($params['Id_trace'])."';";

		$process=@odbc_exec($sqlconnect, $sqlquery);

		$csv=odbc_fetch_array($process);


		
		if(!$csv){
			return "-1";
		}
		else{
			return $csv;
		}
	}

}

?>