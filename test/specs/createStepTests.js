import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Step from '../pageobjects/step.page';
import createProcess from '../pageobjects/create.process.page';
import getRandomName from '../helpers/get_random_name';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const randomName = getRandomName();


describe('Create Step Test', function() {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should create a new step in Process Flow Chart', function() {

		browser.waitForElement(Home.libraryTable, config.app.waitTime, 'libraryTable');

		createProcess.create(randomName);
		browser.switchTab(browser.getTabIds()[1]);
		browser.waitUntil(function() {
			return browser.getTitle().includes(randomName);
		}, config.app.waitTime, `title takes more than ${config.app.waitTime} seconds to change`);

		// click on add new step plus sign on the upper left corner
		Step.addNewStepLnk.click();
		browser.waitForElement(Step.newStepBox, config.app.waitTime, 'Step.newStepBox');
		let isNewStepExisting = Step.newStepBox.isExisting();
		expect(isNewStepExisting).to.be.true;

	});

});