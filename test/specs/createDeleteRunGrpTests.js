import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import RunGroup from '../pageobjects/run.group.page';
import getRandomName from '../helpers/get_random_name';
import createExperiment from '../pageobjects/create.experiment.page';
import ResourceToolbar from '../pageobjects/resource.toolbar.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const testName = 'Create Run Group Test';
const randomName = getRandomName();


describe(testName, () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		createExperiment.create(randomName, testName);
		ResourceToolbar.createNewRunPlus.waitForExist();
		ResourceToolbar.createNewRunPlus.click();
		browser.waitForElement(ResourceToolbar.runCounter, config.app.waitTime, 'runCounter');
		ResourceToolbar.runCounter.setValue('2');
		ResourceToolbar.runPrefixName.setValue(randomName);
		ResourceToolbar.createRunBtn.click();
	});

	it('should create a new run group', () => {

		browser.waitForElement(Experiment.runTableRow(1, 2), config.app.waitTime, 'runTableRow');
		RunGroup.runGroupDropDown.click();
		RunGroup.newRunGroup.click();

		browser.waitForElement(RunGroup.groupName, config.app.waitTime, 'groupName');
		RunGroup.groupName.setValue(randomName);
		RunGroup.confirmBtn.click();

		browser.pause(config.app.waitTime);

		let actualRunGrpName = RunGroup.runGroupDropDown.getText();
		expect(actualRunGrpName).equals(randomName);

	});

	it('should delete the Run group created from above', () => {

		RunGroup.newRunGroupDropDown.click();
		browser.waitForElement(RunGroup.deleteCurrentGroup, config.app.waitTime, 'deleteCurrentGroup');
		RunGroup.deleteCurrentGroup.click();
		browser.waitForElement(RunGroup.confirmBtn, config.app.waitTime, 'confirmBtn');
		RunGroup.confirmBtn.click();
		browser.pause(config.app.waitTime);
		let isBackToDefault = RunGroup.runGroupDropDown.getText().includes('default');
		expect(isBackToDefault).to.be.true;

	});

});