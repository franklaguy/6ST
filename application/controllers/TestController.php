<?php

class TestController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
			
    	$csv = new Application_Model_Test();
    	$csv->createTest();

    }


}