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

	it('should create a new run then delete it for next run', () => {

		browser.waitForElement(ResourceToolbar.createNewRunPlus, config.app.waitTime, 'formulaEditor');
		ResourceToolbar.createNewRunPlus.click();
		browser.waitForElement(ResourceToolbar.runCounter, config.app.waitTime, 'runCounter');
		ResourceToolbar.runCounter.setValue('2');
		ResourceToolbar.runPrefixName.setValue(randomName);
		ResourceToolbar.createRunBtn.click();
		browser.pause(config.app.waitTime);
		let newRun= Experiment.runTableRow(2, 2).isExisting();
		expect(newRun).to.be.true;

		browser.waitForElement(Run.checkAllRuns, config.app.waitTime, 'checkAllRuns');
		Run.checkAllRuns.click();
		browser.waitForElement(Run.trash, config.app.waitTime, 'checkAllRuns');
		Run.trash.click();
		browser.pause(config.app.waitTime);
		Run.confirmBtn.click();

		browser.pause(config.app.waitTime);
		let isRunDeleted = !Run.checkBoxesForAllRuns.isExisting();
		expect(isRunDeleted).to.be.true;
	});

});