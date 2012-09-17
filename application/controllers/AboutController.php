<?php

class AboutController extends Zend_Controller_Action
{
	
    public function indexAction()
    {
        $this->view->headTitle('About the eBook', 'PREPEND');
    }
	
    public function authorAction()
    {
        $this->view->headTitle('About the eBook', 'PREPEND');
    }
	
    public function storyAction()
    {
        $this->view->headTitle('About the eBook', 'PREPEND');
    }
	
    public function rightSideAction()
    {
        //
    }

}

