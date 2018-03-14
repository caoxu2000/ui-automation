import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Process from '../pageobjects/process.page';
import getRandomName from '../helpers/get_random_name';
import createProcess from '../pageobjects/create.process.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const randomName1 = getRandomName();
const randomName2 = getRandomName();


describe('Rename process name test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should rename the process name', () => {

    browser.keys(['Enter']);
		browser.pause(config.app.waitTime);
		createProcess.create(randomName1);
		browser.switchTab(browser.getTabIds()[0]);
		browser.pause(config.app.waitTime);
		browser.element(`td*=${randomName1}`).rightClick();
		browser.waitForElement(Process.renameProcess, config.app.waitTime, 'renameProcess');
		Process.renameProcess.click();
		browser.waitForElement(Process.processName, config.app.waitTime, 'processName');
		Process.processName.clearElement();
		Process.processName.setValue(randomName2);
		browser.waitForElement(Process.processDesc, config.app.waitTime, 'processDesc');
		Process.processDesc.clearElement();
		Process.processDesc.setValue('test description');
		browser.pause(config.app.waitTime);
		Process.updateProcessNameBtn.click();
		browser.pause(config.app.waitTime);
		let isProcessTitleChanged = Process.processTD.getText().includes(randomName2);
		expect(isProcessTitleChanged).to.be.true;

	});

});
