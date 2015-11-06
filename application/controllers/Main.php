<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {

	public function index(){
		$data['indexData'] = $this->getIndexContent();
		$this->load->view('main',$data);
	}
	public function getIndexContent(){
		$select = array('id','title','preview','lookNum','classify','createTime');
		$order_by = 'id desc';
		$data = $this->Model->select($select,'bed_content','',30,$order_by);
		if($this->input->post('refresh')){
			echo json_encode($data);
		}else{
			return $data;
		}
	}
	public function getNextPageContent(){
		$limitStartPage = $this->input->post('limitStartPage');
		$limitGetNumPage = $this->input->post('limitGetNumPage');
		$data = $this->Model->getNextPageContent($limitStartPage,$limitGetNumPage);
		echo json_encode($data);
	}
}
