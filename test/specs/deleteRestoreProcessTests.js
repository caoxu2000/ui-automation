import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Process from '../pageobjects/process.page';
import createProcess from '../pageobjects/create.process.page';
import deleteProcess from '../pageobjects/delete.process.page';
import getRandomName from '../helpers/get_random_name';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const randomName = `Delete and Restore Test ${getRandomName()}`;

describe('Delete then Restore Process tests', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		createProcess.create(randomName);
		browser.switchTab(browser.getTabIds()[0]);
	});

	it('should delete that process', () => {

		browser.pause(config.app.waitTime);
		browser.rightClick(`td*=${randomName}`);
		browser.waitForElement(Process.moveToTrash, config.app.waitTime, 'moveToTrash');
		Process.moveToTrash.click();
		browser.pause(config.app.waitTime);
		Process.purgeButton.click();
		browser.pause(config.app.waitTime);
		let isProcessRemoved = $(`td*=${randomName}`).isExisting();
		expect(isProcessRemoved).to.be.false;

	});

	it('should restore the deleted process above', () => {

		browser.waitForElement(Process.trashProcess, config.app.waitTime, 'trashProcess');
		Process.trashProcess.click();
		browser.pause(config.app.waitTime);
		browser.rightClick(`td*=${randomName}`);
		browser.waitForElement(Process.restore, config.app.waitTime, 'restore');
		Process.restore.click();
		browser.pause(config.app.waitTime);
		Process.purgeButton.click();
		browser.waitForElement(Process.allProcess, config.app.waitTime, 'allProcess');
		Process.allProcess.click();
		browser.pause(config.app.waitTime);
		let isProcessRemoved = $(`td*=${randomName}`).isExisting();
		expect(isProcessRemoved).to.be.true;
		deleteProcess.delete(randomName);

	});

});
