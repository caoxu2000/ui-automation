import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import getRandomName from '../helpers/get_random_name';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const randomName = getRandomName();


describe('Update Experiment Summary Test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should add summary to experiment', () => {

		browser.url('experiments/qiv4HjjrduTiiFKat');
		browser.waitForElement(Experiment.summaryLink, config.app.waitTime, 'summaryLink');
		Experiment.summaryLink.click();
		browser.waitForElement(Experiment.summaryInputField, config.app.waitTime, 'summaryInputField');
		Experiment.summaryInputField.setValue(`This is test from automation ${randomName}`);
		browser.pause(config.app.waitTime);
		Experiment.summaryUpdateBtn.click();
		
		browser.waitForElement(Experiment.summaryLink, config.app.waitTime, 'summaryLink');
		Experiment.summaryLink.click();
		browser.pause(config.app.waitTime);
		let summary = Experiment.summaryInputField.getText();
		expect(summary).equals(`This is test from automation ${randomName}`);

	});

});