import LoginPage from '../pageobjects/login.page';
import Step from '../pageobjects/step.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
let stepLabel;
let doesStepShowID;


describe('Show Step ID Test', () => {

 	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should display Step ID in upper left corner of the step box', () => {

		browser.url('processes/ed2wxMprF9tNrB6bW');
		browser.waitForElement(Step.resourceSummaryTable, config.app.waitTime, 'resourceSummaryTable');
		Step.firstStepBox.rightClick();
		Step.showStepID.click();
		browser.pause(config.app.waitTime);
		stepLabel = Step.stepLabel;
		doesStepShowID = stepLabel[0].getText() === "S1" && stepLabel[1].getText() === "S2";
		expect(doesStepShowID).to.be.true;

	});

});