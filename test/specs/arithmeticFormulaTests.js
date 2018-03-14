import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import ResourceToolbar from '../pageobjects/resource.toolbar.page';
import getRandomName from '../helpers/get_random_name';
import Run from '../pageobjects/run.page';
import createExperiment from '../pageobjects/create.experiment.page';
import addProperty from '../pageobjects/add.property.page';
import createRunOneAtATime from '../pageobjects/create.run.one.page';
import waitForElement from '../helpers/wait_for_element';

const expected_num = require('../data/sanity_numeric_properties');
const config = require('config');
const testName = 'arithmetic test';
const name = getRandomName();
const propertyName = 'pH';


describe('Arithmetic Manipulation Test', () => {

	before(() => {

		const addPropertySelector = Run.addProperty;
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		createExperiment.create(name, testName);
		createRunOneAtATime.create(name);
		addProperty.add(propertyName);

	});

	it('should perform mathmatic calculation correctly', () => {

		Run.actualRun.click();

		browser.waitForElement(Experiment.runTableRow(1, 2), config.app.waitTime, '1st run table row 2nd td');
		// test resource column that is numeric data type
		expected_num.forEach(each => {

			browser.pause(750);
			Run.numericResource.rightClick();
			browser.waitForElement(Run.formulaEditor, config.app.waitTime, 'formulaEditor');
			Run.formulaEditor.click();
			browser.waitForElement(Run.formulaInput, config.app.waitTime, 'formulaInput');
			Run.formulaInput.setValue(each.formula);
			browser.waitForElement(Run.updateFormulaBtn, config.app.waitTime, 'updateFormulaBtn');
			Run.updateFormulaBtn.click();
			browser.waitForElement(Run.calculationBtn, config.app.waitTime, 'calculationBtn');
			Run.calculationBtn.click();
			browser.waitForElement(Run.calculatedResultCell, config.app.waitTime, 'calculatedResultCell');
			browser.pause(750); // the text takes time to show up in the td cell, that's why have to wait explicitly
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