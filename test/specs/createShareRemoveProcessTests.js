import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Process from '../pageobjects/process.page';
import getRandomName from '../helpers/get_random_name';
import createProcess from '../pageobjects/create.process.page';
import deleteProcess from '../pageobjects/delete.process.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const randomName = getRandomName();

describe('Create/Share/Remove process from my library tests', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		createProcess.create(randomName);
		browser.switchTab(browser.getTabIds()[1]);
		browser.pause(config.app.waitTime);
		expect(browser.getUrl()).to.contain('process');
		browser.waitForElement(Home.appTitleText, config.app.waitTime, 'Home.appTitleText');
		Home.appTitleText.waitForEnabled();
		expect(Home.appTitleText.getText()).to.equal(randomName);
	});

	after(() => {
		deleteProcess.delete(randomName);
	});

	it('should share it and give admin role to another user', () => {

		browser.switchTab(browser.getTabIds()[0]);
		browser.pause(config.app.waitTime);
		browser.element(`td*=${randomName}`).rightClick();
		browser.waitForElement(Process.shareProcessMnu, config.app.waitTime, 'shareProcessMnu1');
		Process.shareProcessMnu.click();
		browser.waitForElement(Process.searchUserBox, config.app.waitTime, 'searchUserBox');
		Process.searchUserBox.setValue('jko');
		browser.waitForElement(Process.selectFirstUser, config.app.waitTime, 'selectFirstUser');
		Process.selectFirstUser.click();
		browser.waitForElement(Process.userRoleDropDown, config.app.waitTime, 'userRoleDropDown');
		Process.userRoleDropDown.selectByValue('admin');
		browser.waitForElement(Process.shareBtn, config.app.waitTime, 'shareBtn');
		Process.shareBtn.click();
		browser.pause(config.app.downloadWaitTime);
		Process.confirmationBtn.click();
		browser.pause(config.app.downloadWaitTime);
		browser.element(`td*=${randomName}`).rightClick();
		browser.waitForElement(Process.shareProcessMnu, config.app.waitTime, 'shareProcessMnu');
		Process.shareProcessMnu.click();
		browser.waitForElement(Process.shareWithTab, config.app.waitTime, 'shareWithTab');
		Process.shareWithTab.click();
		browser.pause(config.app.waitTime);
		let firstCollaboratorInfo = Process.collaboratorFirstRow.getText();
		let hasFirstCollaboratorEmail = firstCollaboratorInfo.includes('jko@riffyn.com');
		expect(hasFirstCollaboratorEmail).to.be.true;
		Process.cancelBtn.click();

	});

});
