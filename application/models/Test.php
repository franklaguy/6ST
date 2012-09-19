<?php

class Application_Model_Test
{
	private $_dbTable;
	
	public function __construct()
	{
		$this->_dbTable = new Application_Model_DbTable_Test();
	}
	
	public function createTest($result)
	{
		$this->_dbTable = new Application_Model_DbTable_Test();
		
		$db = Zend_Db_Table::getDefaultAdapter();
		$path = '/cdn/20120821_RIADataCenter.csv';
		$row = 1;
		$result = array();
		if (($handle = fopen("/cdn/20120821_RIADataCenter.csv", "r")) !== FALSE) {
			while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
				$num = count($data);
				$row++;
				for ($i=0; $i < $num; $i++) {
					$result = array(
							'a' => $data[0],
							'b' => $data[1],
							'c' => $data[2],
							'd' => $data[3],
							'e' => $data[4],
							'f' => $data[5],
							'g' => $data[6],
							'h' => $data[7],
							'i' => $data[8],
							'j' => $data[9],
							'k' => $data[10],
							'l' => $data[11],
							'm' => $data[12],
							'n' => $data[13],
							'o' => $data[14],
							'p' => $data[15],
							'q' => $data[16],
							'r' => $data[17]
					);
				}
				$db->insert($result);
			}
		}
		exit;
	}
	
	public function getTest()
	{
		$arr = $this->_dbTable->fetchAll();
		
		$group = "";
		$group .= "<section id='contentSection'><div class='content'><table width=865 id='orgs' >\n\n";
		foreach ($arr as $row){
			$a = $row->a;
			$b = $row->b;
			$c = $row->c;
			$d = $row->d;
			$e = $row->e;
			$f = $row->f;
			$g = $row->g;
			$h = $row->h;
			$i = $row->i;
			$j = $row->j;
			$k = $row->k;
			$l = $row->l;
			$m = $row->m;
			$n = $row->n;
			$o = $row->o;
			$p = $row->p;
			$q = $row->q;
			$r = $row->r;
			$z = $row->id;
			
			if($a !== 'NULL'){
				$group .= "<tr id='".$z."'><td class='a'>" . $a . "</td><td class='b'>" . $b . "</td><td class='c'>" . $c . "</td><td class='d'>" . $d . "</td>";
				$group .= "<td class='e'>" . $e . "</td><td class='f'>" . $f . "</td><td class='g'>" . $g . "</td>";
				$group .= "<td class='h'>" . $h . "</td><td class='i'>" . $i . "</td><td class='j'>" . $j . "</td>";
				$group .= "<td class='k'>" . $k . "</td><td class='l'>" . $l . "</td><td class='m'>" . $m . "</td>";
				$group .= "<td class='n'>" . $n . "</td><td class='o'>" . $o . "</td><td class='p'>" . $p . "</td>";
				$group .= "<td class='q'>" . $q . "</td><td class='r'>" . $r . "</td></tr>";
			}
		}
		$group .= "\n\n</table></div></section>";
		return $group;
	}

}



// 			while (($line = fgetcsv($f)) !== false) {
// 		echo "<tr>";
// 		      foreach ($line as $cell=>$value) {
// 		        	echo "<td>" . htmlspecialchars($value) . "</td>";
// 		      }
// 		echo "<tr>\n";
// 			}
