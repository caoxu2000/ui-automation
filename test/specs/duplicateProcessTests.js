import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Design from '../pageobjects/design.dropdown.page';
import getRandomName from '../helpers/get_random_name';
import Process from '../pageobjects/process.page';

const config = require('config');


describe('Duplicate a Process test', function() {

	it('should duplicate the Process', function() {

		LoginPage.login(config.app.admin.username, config.app.admin.password);

		// click away the promot video and browser size suggestion modal
		browser.pause(5000);
		Home.closeVideoBtn.waitForExist();
		Home.closeVideoBtn.click();
		browser.pause(2000);
		Home.closeBrowserSize.waitForExist();
		Home.closeBrowserSize.click();

		browser.url('processes/NRriBeYKnv5ErrraS');
		browser.pause(2000);
		Home.closeBrowserSize.waitForExist();
		Home.closeBrowserSize.click();

		Design.designDropDown.click();
		Design.duplicateLnk.click();

		const randomName = getRandomName();
		Process.processName.waitForVisible();
		Process.processName.setValue(`duplicate of process 4-1-4 ${randomName}`);
		Process.processDesc.waitForVisible();
		Process.processDesc.setValue('test description');
		Process.duplicateProcessBtn.click();

		browser.waitUntil(function() {
			return browser.getTabIds()[1] !== undefined;
		}, 5000, 'dup process tab takes longer than 5 seconds to load');
		browser.switchTab(browser.getTabIds()[1]);

		browser.waitForExist('.main-panel');
		expect(browser.getUrl()).to.contain('process');
		expect(browser.getTitle()).to.equal(`duplicate of process 4-1-4 ${randomName}`);
		expect(Home.appTitleText.getText()).to.equal(`DUPLICATE OF PROCESS 4-1-4 ${randomName.toUpperCase()}`);

	});
});
