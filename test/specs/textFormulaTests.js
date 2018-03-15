import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import ResourceToolbar from '../pageobjects/resource.toolbar.page';
import getRandomName from '../helpers/get_random_name';
import Run from '../pageobjects/run.page';
import createExperiment from '../pageobjects/create.experiment.page';
import addProperty from '../pageobjects/add.property.page';
import waitForElement from '../helpers/wait_for_element';

const expected_txt = require('../data/text_properties');
const config = require('config');
const testName = 'text test';
const propertyName = 'tag';
const randomName = getRandomName();

describe('String Manipulation Test', () => {

	before(() => {

		const addPropertySelector = Run.addProperty;
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		createExperiment.create(randomName, testName);
		ResourceToolbar.createNewRunInput.setValue('test1');
		browser.keys(['Enter'])
		browser.pause(config.app.downloadWaitTime);
		addProperty.add(propertyName);

	});

	it('should parse string correctly', () => {

		Run.actualRun.click();
		browser.waitForElement(Experiment.runTableRow(1, 2), config.app.downloadWaitTime, 'runTableRow');

		// test resource column that is text/string data type
		expected_txt.forEach(each => {
			for (let i = 1; i <= 5; i++) {
				browser.keys(['ArrowRight']);
			}
			browser.waitForElement(Run.textResource, config.app.downloadWaitTime, 'textResource');
			Run.textResource.rightClick();
			browser.waitForElement(Run.formulaEditor, config.app.downloadWaitTime, 'formulaEditor');
			Run.formulaEditor.click();
			browser.waitForElement(Run.formulaInput, config.app.downloadWaitTime, 'formulaInput');
			Run.formulaInput.setValue(each.formula);
			browser.pause(config.app.downloadWaitTime);
			Run.updateFormulaBtn.click();
			browser.pause(config.app.downloadWaitTime);
			Run.calculationBtn.click();
			browser.pause(config.app.downloadWaitTime);
			let actual = Run.calculatedResultCell.getText();
			let hasValue = each.expected.indexOf(actual) !== -1;
			if (!hasValue) {
				console.log(`formula is ${each.formula}`);
				console.log(`expected: ${each.expected}`);
				console.log(`actual: ${actual}`);
			}
			expect(hasValue).to.be.true;
		});

	});

});