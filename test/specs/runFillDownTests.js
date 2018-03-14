import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Run from '../pageobjects/run.page';
import Experiment from '../pageobjects/experiment.page';
import createExperiment from '../pageobjects/create.experiment.page';
import ResourceToolbar from '../pageobjects/resource.toolbar.page';
import getRandomName from '../helpers/get_random_name';
import getRandomNum from '../helpers/get_random_num';
import addProperty from '../pageobjects/add.property.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const testName = 'Fill down a run test';
const randomName = getRandomName();
const randomNumber = getRandomNum();

describe(testName, () => {

	before(() => {

		LoginPage.login(config.app.admin.username, config.app.admin.password);
		createExperiment.create(randomName, testName);
		browser.waitForElement(ResourceToolbar.createNewRunPlus, config.app.waitTime, 'createNewRunPlus');
		ResourceToolbar.createNewRunPlus.click();
		browser.waitForElement(ResourceToolbar.runCounter, config.app.waitTime, 'runCounter');
		ResourceToolbar.runCounter.setValue('100');
		browser.waitForElement(ResourceToolbar.createRunBtn, config.app.waitTime, 'createRunBtn');
		ResourceToolbar.createRunBtn.click();
		browser.pause(config.app.waitTime);
		addProperty.add('pH');
		browser.waitForElement(Run.actualRun, config.app.waitTime, 'actualRun');
		Run.actualRun.click();
		browser.pause(config.app.waitTime);

	});

	it('should copy value of the property to runs down below', () => {

		browser.waitForElement(Run.checkAllCheckbox, config.app.waitTime, 'checkAllCheckbox');
		Run.checkAllCheckbox.click();
		browser.waitForElement(Run.firstPropertyCell, config.app.waitTime, 'firstPropertyCell');
		Run.firstPropertyCell.setValue(randomNumber);
		browser.waitForElement(Run.runFillDownBtn, config.app.waitTime, 'runFillDownBtn');
		Run.runFillDownBtn.click();
		browser.pause(config.app.waitTime);
		expect(Run.belowPropertyCell.getValue()).to.equal(randomNumber.toString());

	});
});
