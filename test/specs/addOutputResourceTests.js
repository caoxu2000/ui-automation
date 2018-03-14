import LoginPage from '../pageobjects/login.page';
import Step from '../pageobjects/step.page';
import Resource from '../pageobjects/resource.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const resourceName = 'zebularine';

describe('Add Output Resource Test', () => {

 	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should add output resource to resource table in bottom panel', () => {

		browser.url('processes/ed2wxMprF9tNrB6bW');
		browser.waitForElement(Step.resourceSummaryTable, config.app.waitTime, 'resourceSummaryTable');
		Step.add3rdStep();
		Step.addOutput.click();
		browser.waitForElement(Resource.resourceSearch, config.app.waitTime, 'resourceSearch');
		browser.waitUntil(() => {
			return Resource.resourceSearch.isEnabled();
		}, config.app.waitTime, 'resource search input field');
		Resource.resourceSearch.setValue('zebularine');
		Resource.addResource(resourceName);
		expect(Resource.outputSecondResource.getText()).to.equal(resourceName.toUpperCase());
		Step.remove3rdStep();

	});

});