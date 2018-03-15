import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import ResourceToolbar from '../pageobjects/resource.toolbar.page';
import getRandomName from '../helpers/get_random_name';
import Run from '../pageobjects/run.page';
import createExperiment from '../pageobjects/create.experiment.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const testName = 'Create Connection between Steps Test';
const resourceName = getRandomName();


describe(testName, () => {

	before(() => {

		LoginPage.login(config.app.admin.username, config.app.admin.password);

	});

	it('should create a new connection between steps', () => {

		browser.url('experiments/qiv4HjjrduTiiFKat');
		browser.waitForElement(Run.anchorOfStep2, config.app.waitTime, 'anchorOfStep2');
		Run.anchorOfStep2.click();
		browser.waitForElement(Run.firstStepfirstRunCheckBox, config.app.waitTime, 'firstStepfirstRunCheckBox');
		Run.firstStepfirstRunCheckBox.click();
		browser.waitForElement(Run.firstRunResourceOutput, config.app.waitTime, 'firstRunResourceOutput');
		Run.firstRunResourceOutput.setValue(resourceName);
		browser.pause(config.app.waitTime);
		Run.connectionActionBtn.click();
		browser.pause(config.app.waitTime);
		let bg_color = Run.firstRunRows.getCssProperty('background-color');
		let input_resource = Run.finalRunResourceInput.getValue();
		expect(bg_color.value).equals('rgba(255,247,225,1)');
		expect(input_resource).equals(resourceName);

	});

});