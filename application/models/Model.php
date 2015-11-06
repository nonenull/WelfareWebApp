<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model extends CI_Model {

    function __construct(){
        parent::__construct();
		$this->load->database();
    }
	function getNextPageContent($limitStartPage,$limitGetNumPage){
		$select = array('id','title','preview','lookNum','classify','createTime');
		$this->db->select($select);
		$this->db->order_by('id','desc');
		$this->db->limit($limitStartPage,$limitGetNumPage);
		$query = $this->db->get('bed_content');
//		echo $this->db->last_query();
		return $query->result();
	}
	//查
	function select($select,$table,$where,$limit="",$order=""){
		$this->db->select($select);
		if($where){
			$this->db->where($where);
		}
		$this->db->limit($limit);
		$this->db->order_by($order);
		$query = $this->db->get($table);
		return $query->result();
	}

	//统计条数
	function count_num($table,$where){
		$this->db->select('count(1) as total');
		$this->db->where($where);
		$query = $this->db->get($table);
		$result = $query->row_array();
		return $result['total'];
	}
	//增
	function insert($table,$data){
		$query = $this->db->insert($table,$data);
		return $query;
	}
	
	//改
	function update($data,$table,$where){
		$this->db->set($data);
		$this->db->where($where);
		$query = $this->db->update($table);
		return $query;
	}
	
	//删
	function delete($table,$where){
		$this->db->where($where); 
		$query = $this->db->delete($table);
		return $query->result();
	}
}
