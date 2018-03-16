import LoginPage from '../pageobjects/login.page';
import addComponent from '../pageobjects/add.component.resource';
import Step from '../pageobjects/step.page';
import Resource from '../pageobjects/resource.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const componentName = 'hydron';


describe('Add Component to Resource Test', () => {

 	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should add component to resource in bottom panel', () => {

		browser.url('processes/ed2wxMprF9tNrB6bW');
		browser.waitForElement(Step.resourceSummaryTable, config.app.waitTime, 'resourceSummaryTable');
		Step.addNewStepLnk.click();
		browser.pause(config.app.waitTime);
		addComponent.add(componentName);
		expect(Resource.componentName.getText()).to.equal(componentName.toUpperCase());
		Step.remove3rdStep();

	});

});