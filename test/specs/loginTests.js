import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import waitForElement from '../helpers/wait_for_element';
const config = require('config');


describe('Login Test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should login and see library table on home page', () => {

		browser.waitForElement(Home.libraryTable, config.app.waitTime, 'libraryTable');

		expect(browser.getUrl()).to.contain('library/processes');
		expect(browser.getTitle()).to.equal('Process Library');
		expect(Home.appTitleText.getText()).to.equal('PROCESS LIBRARY');

	});

})