import LoginPage from '../pageobjects/login.page';
import Step from '../pageobjects/step.page';
import Resource from '../pageobjects/resource.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const resourceName = 'zebularine';


describe('Change Input Resource Type Test', () => {

 	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should update input resource type in the bottom panel', () => {

		browser.url('processes/ed2wxMprF9tNrB6bW');
		browser.waitForElement(Step.resourceSummaryTable, config.app.waitTime, 'resourceSummaryTable');
		Step.addNewStepLnk.click();
		browser.pause(config.app.waitTime);
		Resource.changeResourceType(resourceName);
		expect(Resource.inputFirstResource.getText()).to.equal('zebularine'.toUpperCase());
		Step.remove3rdStep();

	});

});