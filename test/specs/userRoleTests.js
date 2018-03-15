import LoginPage from '../pageobjects/login.page';
import Step from '../pageobjects/step.page';
import Role from '../pageobjects/role.page';
import getRandomName from '../helpers/get_random_name';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const randomName = getRandomName();


describe('Verify User Role Test', () => {

 	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('Org Admin should have access to context menu in Process Flow Chart', () => {

		browser.url('processes/ed2wxMprF9tNrB6bW');
		browser.pause(config.app.downloadWaitTime);
		// grab the text of the user role on upper right corner
		let isAdmin = Role.roleText.getText().includes('Admin');
		expect(isAdmin).to.be.true;
		// do a right click on 1st step
		Step.firstStepBox.rightClick();
		browser.pause(config.app.downloadWaitTime);
		let isContextMenuExisting = Step.contextMenu.isExisting();
		expect(isContextMenuExisting).to.be.true;
		LoginPage.contextMenu.click();
		LoginPage.logout();
		LoginPage.login(config.app.non_admin.username, config.app.non_admin.password);
		browser.url('processes/ed2wxMprF9tNrB6bW');
		browser.pause(config.app.downloadWaitTime);
		// grab the text of the user role on upper right corner
		let isOperator = Role.roleText.getText().includes('Operator');
		expect(isOperator).to.be.true;
		// do a right click on 1st step
		Step.firstStepBox.rightClick();
		browser.pause(config.app.downloadWaitTime);
		let isPopupExisting = Step.noAccessPopup.isExisting();
		expect(isPopupExisting).to.be.true;

	});

});