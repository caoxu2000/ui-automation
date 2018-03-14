import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import ResourceToolbar from '../pageobjects/resource.toolbar.page';
import getRandomName from '../helpers/get_random_name';
import Run from '../pageobjects/run.page';
import createExperiment from '../pageobjects/create.experiment.page';
import addProperty from '../pageobjects/add.property.page';
import waitForElement from '../helpers/wait_for_element';

const moment = require('moment');
const expected_date = require('../data/date_properties');
const config = require('config');
const testName = 'date test';
const propertyName = 'date/time';


describe('Date/Time Manipulation Test', () => {

	before(() => {

		const addPropertySelector = Run.addProperty;
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		createExperiment.create(getRandomName(), testName);
		ResourceToolbar.createNewRunInput.setValue('test1');
		browser.keys(['Enter'])
		browser.waitForElement(Run.modifyRun, config.app.waitTime, 'libraryTable');
		addProperty.add(propertyName);

	});

	it('should output date/time correctly', () => {

		Run.actualRun.click();
		browser.waitForElement(Experiment.runTableRow(1, 2), config.app.waitTime, 'runTableRow');
		// test resource column that is date data type
		expected_date.forEach(each => {
			for (let i = 1; i <= 5; i++) {
				browser.keys(['ArrowRight']);
			}
			Run.dateResource.rightClick();
			browser.waitForElement(Run.formulaEditor, config.app.waitTime, 'libraryTable');
			Run.formulaEditor.click();
			browser.waitForElement(Run.formulaInput, config.app.waitTime, 'formulaInput');
			Run.formulaInput.setValue(each.formula);
			Run.updateFormulaBtn.click();
			browser.waitForElement(Run.calculationBtn, config.app.waitTime, 'calculationBtn');
			Run.calculationBtn.click();
			browser.pause(config.app.waitTime);
			let actual = Run.calculatedResultCell.getText();
			let expected = moment().format('YYYY-MM-DD kk:mm:');
			let hasValue = actual.includes(expected);
			if (!hasValue) {
				console.log(`formula is ${each.formula}`);
				console.log(`expected: ${expected}`);
				console.log(`actual: ${actual}`);
			}
			expect(hasValue).to.be.true;
		});

	});

});