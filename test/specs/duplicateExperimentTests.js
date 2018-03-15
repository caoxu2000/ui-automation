import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import getRandomName from '../helpers/get_random_name';
import createExperiment from '../pageobjects/create.experiment.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const testName = 'arithmetic test';
const randomName = getRandomName();

describe('Duplicate Experiment test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		createExperiment.create(randomName, testName);
	});

	it('should duplicate the Experiment', () => {

		browser.url('library/experiments');
		browser.pause(config.app.downloadWaitTime);
		Experiment.arithmaticExpRow.rightClick();
		browser.waitForElement(Experiment.duplicateContextMnu, config.app.downloadWaitTime, 'duplicateContextMnu');
		Experiment.duplicateContextMnu.click();

		
		browser.waitForElement(Experiment.arithmaticExptName, config.app.downloadWaitTime, 'experiment name field');
		Experiment.arithmaticExptName.setValue(`arithmetic ${randomName}`);
		Experiment.duplicateBtn.click();

		browser.waitUntil(() => {
			return browser.getTabIds()[2] !== undefined;
		}, config.app.waitTime, `dup process tab takes longer than ${config.app.waitTime} seconds to load`);
		browser.switchTab(browser.getTabIds()[2]);
		browser.pause(config.app.downloadWaitTime);
		expect(browser.getUrl()).to.contain('experiments');
		let isDuplicated = browser.getTitle().includes(`arithmetic ${randomName}`);
		console.log(browser.getTitle());
		expect(isDuplicated).to.be.true;
		expect(Experiment.appTitle.getText()).to.equal(`ARITHMETIC ${randomName}`);

	});
});
