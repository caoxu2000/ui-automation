import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import ResourceToolbar from '../pageobjects/resource.toolbar.page';
import getRandomName from '../helpers/get_random_name';
import Run from '../pageobjects/run.page';
import createExperiment from '../pageobjects/create.experiment.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const testName = 'Create Run Test';
const randomName = getRandomName();


describe(testName, () => {

	before(() => {

		LoginPage.login(config.app.admin.username, config.app.admin.password);
		createExperiment.create(randomName, testName);

	});

	it('should create a new run then delete it for the next test', () => {

		browser.waitForElement(ResourceToolbar.createNewRunPlus, config.app.downloadWaitTime, 'formulaEditor');
		ResourceToolbar.createNewRunPlus.click();
		browser.waitForElement(ResourceToolbar.runCounter, config.app.waitTime, 'runCounter');
		ResourceToolbar.runCounter.setValue('2');
		ResourceToolbar.runPrefixName.setValue(randomName);
		ResourceToolbar.createRunBtn.click();
		browser.pause(config.app.downloadWaitTime);
		let newRun= Experiment.runTableRow(2, 2).isExisting();
		expect(newRun).to.be.true;

		browser.waitForElement(Run.checkAllRuns, config.app.downloadWaitTime, 'checkAllRuns');
		Run.checkAllRuns.click();
		browser.waitForElement(Run.trash, config.app.waitTime, 'trash');
		Run.trash.click();
		browser.pause(config.app.waitTime);
		Run.confirmBtn.click();

		browser.pause(config.app.downloadWaitTime);
		let isRunDeleted = !Run.checkBoxesForAllRuns.isExisting();
		expect(isRunDeleted).to.be.true;
	});

});