import LoginPage from '../pageobjects/login.page';
import Step from '../pageobjects/step.page';
import Resource from '../pageobjects/resource.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const resourceName = 'air compressor';
const testCaseName = `should add a step before existing 
	1st step and a step after existing 2nd step`;


describe('Add Step Before/After Test', () => {

 	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it(testCaseName, () => {

		browser.url('processes/ed2wxMprF9tNrB6bW');
		browser.waitForElement(Step.resourceSummaryTable, config.app.waitTime, 'resourceSummaryTable');
		Step.addAndRemoveStepBefore1stStep();
		Step.addAndRemoveStepAfter2ndStep();
	});

});