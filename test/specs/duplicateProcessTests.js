import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Design from '../pageobjects/design.dropdown.page';
import getRandomName from '../helpers/get_random_name';
import Process from '../pageobjects/process.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const randomName = getRandomName();

describe('Duplicate a Process test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should duplicate the Process', () => {

		browser.url('processes/NRriBeYKnv5ErrraS');
		browser.waitForElement(Design.designDropDown, config.app.downloadWaitTime, 'designDropDown');

		Design.designDropDown.click();
		Design.duplicateLnk.click();

		
		browser.waitForElement(Process.processName, config.app.waitTime, 'processName');
		Process.processName.setValue(`duplicate of process 4-1-4 ${randomName}`);
		browser.waitForElement(Process.processDesc, config.app.waitTime, 'processDesc');
		Process.processDesc.setValue('test description');
		Process.duplicateProcessBtn.click();

		browser.waitUntil(() => {
			return browser.getTabIds()[1] !== undefined;
		}, config.app.downloadWaitTime, 'dup process tab takes longer than 5 seconds to load');
		browser.switchTab(browser.getTabIds()[1]);
		browser.pause(config.app.downloadWaitTime);
		expect(browser.getUrl()).to.contain('process');
		expect(browser.getTitle()).to.equal(`duplicate of process 4-1-4 ${randomName}`);
		expect(Home.appTitleText.getText()).to.equal(`DUPLICATE OF PROCESS 4-1-4 ${randomName.toUpperCase()}`);

	});
});
