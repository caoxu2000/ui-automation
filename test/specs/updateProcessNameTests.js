import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Process from '../pageobjects/process.page';
import getRandomName from '../helpers/get_random_name';

const config = require('config');


describe('Update a process name test', function() {

	it('should rename the process name', function() {

		LoginPage.login(config.app.admin.username, config.app.admin.password);

		// click away the prompt video and browser size suggestion modal
		Home.closeVideoBtn.waitForExist();
		browser.pause(2000);
		Home.closeVideoBtn.click();
		browser.waitUntil(function() {
			return !Home.closeVideoBtn.isExisting();
		}, 3000, 'Video overlay should go away in 3 second');
		
		Home.closeBrowserSize.waitForExist();
		Home.closeBrowserSize.click();

		// browser.url('processes/FxDfPvotkQWc4jPen');
		// browser.waitUntil(function() {
		// 	return browser.getTitle().includes('Components and Properties');
		// }, 10000, 'title takes more than 10 seconds to change');

		browser.pause(2000);
		Process.processNameOnLibraryRow.rightClick();	
		Process.renameProcess.click();
		const randomName = getRandomName();
		Process.processName.waitForVisible();
		Process.processName.clearElement();
		Process.processName.setValue(`Components and Properties ${randomName}`);
		Process.processDesc.waitForVisible();
		Process.processDesc.clearElement();
		Process.processDesc.setValue('test description');
		Process.updateProcessNameBtn.click();
		browser.pause(2000);
		let isProcessTitleChanged = Process.processTD.getText().includes('Components and Properties');
		expect(isProcessTitleChanged).to.be.true;

	});

});
