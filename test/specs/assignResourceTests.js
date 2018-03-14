import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import Resource from '../pageobjects/resource.page';
import getRandomName from '../helpers/get_random_name';
import createExperiment from '../pageobjects/create.experiment.page';
import createRunOneAtATime from '../pageobjects/create.run.one.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const name = getRandomName();
const testName = 'Experiment Assign Resource Test';

describe(testName, () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		createExperiment.create(name, testName);
		createRunOneAtATime.create(name);
	});

	it('should assign a new resource to an experiment', () => {

		browser.waitForElement(Resource.assignResourceLnk, config.app.waitTime, 'assignResourceLnk');
		Resource.assignResourceLnk.click();
		browser.waitForElement(Resource.createNewResource, config.app.waitTime, 'createNewResource');
		Resource.createNewResource.click();
		let expectedResourceName = getRandomName();
		Resource.resourceName.waitForExist();
		Resource.resourceName.waitForEnabled();
		Resource.resourceName.setValue(expectedResourceName);
		Resource.createResourceBtn.click();
		browser.waitForElement(Resource.assignResourceBtn, config.app.waitTime, 'assignResourceBtn');
		Resource.assignResourceBtn.click();
		browser.waitForElement(Resource.resourceValue, config.app.waitTime, 'resourceValue');
		let actualResourceName = Resource.resourceValue.getValue();
		expect(actualResourceName).equals(expectedResourceName);

	});

});