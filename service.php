<?php
$dontauth=1;
require_once("api.php");

$dataQuerys=new Api;

function getParam($param){
	if(isset($_GET[$param])){
		return addslashes($_GET[$param]);
	}else if(isset($_POST[$param])){
		return addslashes($_POST[$param]);
	}
}

if(isset($_GET['who'])){
	$who = $_GET['who'];
}else if(isset($_POST['who'])){
	$who = $_POST['who'];
}

$api_key="5183723902398237640";

switch($who){

	case "create_user":

		$rsts['api_key'] = addslashes($_GET['api_key']);
		$rsts['Name'] = addslashes($_GET['Name']);
		$rsts['TecID'] = addslashes($_GET['TecID']);
		$rsts['Email'] = addslashes($_GET['Email']);
		$rsts['Password'] = addslashes($_GET['Password']);


		if(isset($rsts['Name']) && isset($rsts['TecID']) && isset($rsts['Email']) && isset($rsts['Password'])
			 && $rsts['api_key']==$api_key){

			$resp = $dataQuerys->create_user($rsts);

			if($resp!="-1"){
				echo json_encode(array('Response'=> 1,'Data' => $resp),JSON_FORCE_OBJECT);

			}
			else{
				echo json_encode(array('Response'=> 0,'Error' => 'Cant create user'),JSON_FORCE_OBJECT);
			}

		}else{
			echo json_encode(array('Response'=> 0,'Error' => 'Cant create user'),JSON_FORCE_OBJECT);

		}
		break;


	case "forgot_password":

		$rsts['api_key'] = addslashes($_GET['api_key']);
		$rsts['TecID'] = addslashes($_GET['TecID']);
		$rsts['Password'] = addslashes($_GET['Password']);


		if(isset($rsts['TecID']) && isset($rsts['Password']) && $rsts['api_key']==$api_key){

			$resp = $dataQuerys->forgot_password($rsts);

			if($resp!="-1"){
				header('Content-Type: application/json');
				echo json_encode(array('Response' => 1,'Data' => $resp),JSON_FORCE_OBJECT);

			}
			else{
				header('Content-Type: application/json');
				echo json_encode(array('Response' => 0,'Data' => array('error' => 'error')),JSON_FORCE_OBJECT);
			}

		}
		break;

	case "login":

		$rsts['api_key'] = addslashes($_GET['api_key']);
		$rsts['TecId'] = addslashes($_GET['TecId']);
		$rsts['Password'] = addslashes($_GET['Password']);

		if(isset($rsts['TecId']) && isset($rsts['Password']) && $rsts['api_key']==$api_key){

			$resp = $dataQuerys->login($rsts);

			if($resp!="-1"){
				header('Content-Type: application/json');
				echo json_encode(array('Response' => 1,'Data' => $resp),JSON_FORCE_OBJECT);

			}
			else{
				header('Content-Type: application/json');
				echo json_encode(array('Response' => 0,'Data' => 'error'),JSON_FORCE_OBJECT);
			}

		}
		break;

	case "create_project":

		$rsts['api_key'] = addslashes($_GET['api_key']);
		$rsts['projectName'] = addslashes($_GET['projectName']);
		$rsts['projectDetail'] = addslashes($_GET['projectDetail']);
		$rsts['projectDate'] = addslashes($_GET['projectDate']);
		$rsts['projectCreator'] = addslashes($_GET['projectCreator']);
        
        
        


		if(isset($rsts['projectName']) && isset($rsts['projectDetail']) && isset($rsts['projectDate']) && isset($rsts['projectCreator']) && $rsts['api_key']==$api_key){

			$resp = $dataQuerys->create_project($rsts);

			if($resp!="-1"){
				header('Content-Type: application/json');
				echo json_encode(array('Response' => 1,'Data' => $resp),JSON_FORCE_OBJECT);

			}
			else{
				header('Content-Type: application/json');
				echo json_encode(array('Response' => 0,'Data' => array('error' => 'error')),JSON_FORCE_OBJECT);
			}

		}
		break;

	case "edit_project":

		$rsts['api_key'] = addslashes($_GET['api_key']);
		$rsts['Project_name'] = addslashes($_GET['Project_name']);
		$rsts['Description'] = addslashes($_GET['Description']);
		$rsts['Image'] = addslashes($_GET['Image']);


		if(isset($rsts['Project_name']) && isset($rsts['Description']) && isset($rsts['Image']) && $rsts['api_key']==$api_key){

			$resp = $dataQuerys->edit_project($rsts);

			if($resp!="-1"){
				echo json_encode(array('Data' => $resp),JSON_FORCE_OBJECT);

			}
			else{
				echo json_encode(array('Error' => 'Cant create user'),JSON_FORCE_OBJECT);
			}

		}
		break;

	case "return_project":

		$rsts['api_key'] = addslashes($_GET['api_key']);
		$rsts['Project_name'] = addslashes($_GET['Project_name']);

		if(isset($rsts['Project_name']) && $rsts['api_key']==$api_key){

			$resp = $dataQuerys->return_project($rsts);

			if($resp!="-1"){
				header('Content-Type: application/json');
				echo json_encode(array('Data' => $resp),JSON_FORCE_OBJECT);

			}
			else{
				header('Content-Type: application/json');
				echo json_encode(array('Error' => 'Cant create user'),JSON_FORCE_OBJECT);
			}

		}
		break;
    
    case "return_project_by_id":

		$rsts['api_key'] = addslashes($_GET['api_key']);
		$rsts['Id_project'] = addslashes($_GET['Id_project']);

		if(isset($rsts['Id_project']) && $rsts['api_key']==$api_key){

			$resp = $dataQuerys->return_project_by_id($rsts);

			if($resp!="-1"){
				header('Content-Type: application/json');
				echo json_encode(array('Response' => 1,'Data' => $resp),JSON_FORCE_OBJECT);

			}
			else{
				header('Content-Type: application/json');
				echo json_encode(array('Response' => 0,'Data' => array('error' => 'error')),JSON_FORCE_OBJECT);
			}

		}
		break;


	case "return_project_list":

		$rsts['api_key'] = addslashes($_GET['api_key']);


		if( $rsts['api_key']==$api_key){

			$resp = $dataQuerys->return_project_list($rsts);

			if($resp!="-1"){
				echo json_encode(array('Data' => $resp),JSON_FORCE_OBJECT);

			}
			else{
				echo json_encode(array('Error' => 'Cant create user'),JSON_FORCE_OBJECT);
			}

		}

		break;
        
        case "return_material_list":

			$rsts['api_key'] = addslashes($_GET['api_key']);


			if( $rsts['api_key']==$api_key){

				$resp = $dataQuerys->return_material_list($rsts);

				if($resp!="-1"){
					echo json_encode(array('Data' => $resp),JSON_FORCE_OBJECT);

				}
				else{
					echo json_encode(array('Error' => 'Cant create user'),JSON_FORCE_OBJECT);
				}

			}

		break;

	case "create_material":

		$rsts['api_key'] = addslashes($_GET['api_key']);
		$rsts['Material_name'] = addslashes($_GET['Material_name']);
		$rsts['Thickness'] = addslashes($_GET['Thickness']);
		$rsts['Id_cut'] = addslashes($_GET['Id_cut']);
		$rsts['Id_trace'] = addslashes($_GET['Id_trace']);

		if(isset($rsts['Material_name'])&& isset($rsts['Thickness'])
			&& isset($rsts['Id_cut']) && isset($rsts['Id_trace']) && $rsts['api_key']==$api_key){

			$resp = $dataQuerys->create_material($rsts);

			if($resp!="-1"){
				echo json_encode(array('Data' => $resp),JSON_FORCE_OBJECT);

			}
			else{
				echo json_encode(array('Error' => 'Cant create user'),JSON_FORCE_OBJECT);
			}

		}
		break;

	case "add_material":

		$rsts['api_key'] = addslashes($_GET['api_key']);
		$rsts['materialName'] = addslashes($_GET['materialName']);
		$rsts['materialThickness'] = addslashes($_GET['materialThickness']);
		$rsts['materialProvider'] = addslashes($_GET['materialProvider']);
		$rsts['cutPower'] = addslashes($_GET['cutPower']);
		$rsts['cutSpeed'] = addslashes($_GET['cutSpeed']);
		$rsts['tracePower'] = addslashes($_GET['tracePower']);
		$rsts['traceSpeed'] = addslashes($_GET['traceSpeed']);
        
        $rsts['materialName'] = $rsts['materialName'] .  " - T: " . $rsts['materialThickness'] . " - P: " . $rsts['materialProvider']; 


		if(isset($rsts['materialName'])&&  isset($rsts['cutPower'])
			&& isset($rsts['cutSpeed']) && isset($rsts['tracePower']) && isset($rsts['traceSpeed'])&& $rsts['api_key']==$api_key){

			$resp = $dataQuerys->add_material($rsts);

			if($resp!="-1"){
				header('Content-Type: application/json');
				echo json_encode(array('Response' => 1,'Data' => $resp),JSON_FORCE_OBJECT);

			}
			else{
				header('Content-Type: application/json');
				echo json_encode(array('Response' => 0,'Data' => array('error' => 'error')),JSON_FORCE_OBJECT);
			}

		}else{
			header('Content-Type: application/json');
			echo json_encode(array('Response' => 0,'Data' => array('error' => 'error')),JSON_FORCE_OBJECT);
		}
		break;

	case "return_laser_parameters":

		$rsts['api_key'] = addslashes($_GET['api_key']);
		$rsts['Material_name'] = addslashes($_GET['Material_name']);
		$rsts['Thickness'] = addslashes($_GET['Thickness']);

		if(isset($rsts['Material_name'])&& isset($rsts['Thickness']) &&
			 $rsts['api_key']==$api_key){

			$resp = $dataQuerys->return_laser_parameters($rsts);

			if($resp!="-1"){
				echo json_encode(array('Data' => $resp),JSON_FORCE_OBJECT);

			}
			else{
				echo json_encode(array('Error' => 'Cant create user'),JSON_FORCE_OBJECT);
			}

		}
		break;

	case "edit_material":
        

		$rsts['api_key'] = addslashes($_GET['api_key']);
		$rsts['Id_material'] = addslashes($_GET['Id_material']);
		$rsts['cutPower'] = addslashes($_GET['cutPower']);
		$rsts['cutSpeed'] = addslashes($_GET['cutSpeed']);
		$rsts['tracePower'] = addslashes($_GET['tracePower']);
		$rsts['traceSpeed'] = addslashes($_GET['traceSpeed']);

		if(isset($rsts['Id_material']) && $rsts['api_key']==$api_key){

			$resp = $dataQuerys->edit_material($rsts);

			if($resp!="-1"){
				header('Content-Type: application/json');
				echo json_encode(array('Response' => 1,'Data' => $resp),JSON_FORCE_OBJECT);

			}
			else{
				header('Content-Type: application/json');
				echo json_encode(array('Response' => 0,'Data' => array('error' => 'error')),JSON_FORCE_OBJECT);
			}

		}
		break;

}

?>
