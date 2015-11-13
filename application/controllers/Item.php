<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Item extends CI_Controller {

	public function get($id){
		$data['itemData'] = $this->getItemContent($id);
		$this->load->view('item',$data);
	}
	public function getItemContent($id){
		$select = array('id','title','lookNum','content','description','classify','createTime');
		$where['id'] = $id;
		return $this->Model->select($select,'bed_content',$where,1);
	}
	public function lookNum(){
		$id = $this->input->post('id');
		$action = $this->input->post('action');
		$this->Model->lookNumOperation($id,$action);
	}
}
