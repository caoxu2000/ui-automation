import LoginPage from '../pageobjects/login.page';
import Step from '../pageobjects/step.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
let bubbleText;
let isStepInOrder;


describe('View Step Order Test', () => {

 	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should display the right step order in bottom panel under Design Process', () => {

		browser.url('processes/ed2wxMprF9tNrB6bW');
		browser.waitForElement(Step.resourceSummaryTable, config.app.waitTime, 'resourceSummaryTable');
		Step.firstStepBox.rightClick();
		Step.viewStepOrder.click();
		bubbleText = Step.stepOrderBubble;
		isStepInOrder = bubbleText[0].getText() === "1" && bubbleText[1].getText() === "2";
		expect(isStepInOrder).to.be.true;

	});

});