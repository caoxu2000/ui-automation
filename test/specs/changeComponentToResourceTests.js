import LoginPage from '../pageobjects/login.page';
import crudComponent from '../pageobjects/crud.component.resource';
import Step from '../pageobjects/step.page';
import Resource from '../pageobjects/resource.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const componentName1 = 'abequose';
const componentName2 = 'Zerbaxa';


describe('Change Component\'s name to Resource Test', () => {

 	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should change component\'s name to the new name', () => {

		browser.url('processes/ed2wxMprF9tNrB6bW');
		browser.waitForElement(Step.resourceSummaryTable, config.app.waitTime, 'resourceSummaryTable');
		Step.addNewStepLnk.click();
		browser.pause(config.app.waitTime);
		crudComponent.add(componentName1);
		crudComponent.change(componentName2);
		expect(Resource.componentName.getText()).to.equal(componentName2.toUpperCase());
		Step.remove3rdStep();

	});

});