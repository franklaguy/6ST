<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
	protected function _initViewHelpers() {

		$this->bootstrap('layout'); // Call this bootstrap
		$layout = $this->getResource('layout'); // Get layout resource from application.ini
		$view = $layout->getView(); // Send out as a view
		
		// Meta tag data
		$view->headMeta()->appendName('keywords', 'Six Strange Tales,
				 Six, Strange, Tales, Individual Eleven, Individual, 
				Eleven, Crime, Mystery, Psychological, Thrillers, Story, Stories')
			->appendName('description', 'Six Strange Tales is a complex
				 and intertwined series of stories intricately woven around the fates
				 of a small community of characters. Quentin Tarantino and Vincent Gallo
				 come to mind as the plot twists and turns through alternating time periods
				 in the lives of these anti-heroes, sadists, monsters and villains. This book
				 may be the best noir literary work published in recent history. ')
			->appendName('viewport', 'width=device-width, initial-scale=1.0')
			->appendHttpEquiv('X-UA-Compatible', 'IE=Edge;chrome=1');
		
		$view->headTitle()->setSeparator(' - ');
		$view->headTitle('Six Strange Tales');
		
		// Social media text variables - should go into a config file
		define ('TWEET', urlencode("Check out Six Strange Tales on Kindle @"));
		define ('URL_KINDLE', urlencode("http://www.amazon.com/dp/B006GRZ0D8"));
		define ('EMAIL_SUBJECT', urlencode("Here is a book that I think you might enjoy :)"));
		define ('EMAIL_BODY', urlencode("Check out Six Strange Tales on Kindle @ http://www.amazon.com/dp/B006GRZ0D8"));		
		define ('EMAIL_TITLE', 'Email this book to a friend today!');
		
		// URL Constants - Production
// 		define ('IMAGE', 'cdn/images/');
// 		define ('URL', '/welcome/');
		// URL Constants - Development
		define ('IMAGE', '/6ST/welcome/cdn/images/');
		define ('URL', '/6ST/welcome/');
		
	}

}

