import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import RunGroup from '../pageobjects/run.group.page';
import getRandomName from '../helpers/get_random_name';
import createExperiment from '../pageobjects/create.experiment.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const testName = 'Rename an existing Run Group Test';
const randomName = getRandomName();


describe('Experiment Run Group Rename Test', () => {

	before(() => {

		LoginPage.login(config.app.admin.username, config.app.admin.password);
		createExperiment.create(randomName, testName);

	});

	it('should rename the existing run group', () => {

		browser.waitForElement(RunGroup.runGroupDropDown, config.app.waitTime, 'runGroupDropDown');
		RunGroup.runGroupDropDown.click();
		browser.waitForElement(RunGroup.renameCurrentGroup, config.app.waitTime, 'renameCurrentGroup');
		RunGroup.renameCurrentGroup.click();

		browser.waitForElement(RunGroup.groupName, config.app.waitTime, 'groupName');
		RunGroup.groupName.setValue(testName);
		browser.pause(config.app.waitTime);
		RunGroup.confirmBtn.click();
		browser.pause(config.app.waitTime);
		let actualRunGrpName = RunGroup.runGroupDropDown.getText();
		expect(actualRunGrpName).equals(testName);

	});

});