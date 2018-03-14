import LoginPage from '../pageobjects/login.page';
import Step from '../pageobjects/step.page';
import Resource from '../pageobjects/resource.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const resourceName = 'water';


describe('Copy Input Resource/Property to Output Test', () => {

 	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should copy input resource/property to output', () => {

		browser.url('processes/ed2wxMprF9tNrB6bW');
		browser.waitForElement(Step.resourceSummaryTable, config.app.waitTime, 'resourceSummaryTable');
		Step.add3rdStep();
		Step.addInput.click();
		browser.waitForElement(Resource.resourceSearch, config.app.waitTime, 'resourceSearch');
		browser.waitUntil(() => {
			return Resource.resourceSearch.isEnabled();
		}, config.app.waitTime, 'resource search input field');
		Resource.addResource(resourceName);
		Resource.copyToOutput(resourceName);
		expect(Resource.outputSecondResource.getText()).to.equal('water'.toUpperCase());
		Step.remove3rdStep();

	});

});