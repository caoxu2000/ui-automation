import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Step from '../pageobjects/step.page';
import getRandomName from '../helpers/get_random_name';
import createProcess from '../pageobjects/create.process.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const randomName = getRandomName();


describe('Duplicate Step Test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should duplicate the step in Process Flow Chart', () => {

		createProcess.create(randomName);
		browser.switchTab(browser.getTabIds()[1]);
		browser.waitForElement(Step.addNewStepLnk, config.app.waitTime, 'addNewStepLnk');

		// rightClick on step 1 and select 'Duplicate'
		Step.addNewStepLnk.click();
		browser.pause(config.app.waitTime);
		let isNewStepExisting = Step.newStepBox.isExisting();
		expect(isNewStepExisting).to.be.true;

	});

});