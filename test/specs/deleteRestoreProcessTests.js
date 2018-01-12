import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Process from '../pageobjects/process.page';
import getRandomName from '../helpers/get_random_name';

const config = require('config');
const randomName = getRandomName();

describe('Create and then delete process from my library tests', function() {

	it('should delete that process', function() {

		LoginPage.login(config.app.admin.username, config.app.admin.password);
		Home.closeVideoBtn.waitForExist();
		browser.pause(2000);
		Home.closeVideoBtn.click();
		browser.waitUntil(function() {
			return !Home.closeVideoBtn.isExisting();
		}, 3000, 'Video overlay should go away in 3 second');
		
		Home.closeBrowserSize.waitForExist();
		Home.closeBrowserSize.click();

		browser.pause(3000);
		browser.element(`td*=Delete and Restore Test`).rightClick();
		browser.pause(1000);
		Process.moveToTrashOrRestoreMnu.click();
		browser.pause(2000);
		Process.purgeButton.click();
		browser.pause(2000);
		let isProcessRemoved = Process.deleteAndRestoreProcess.isExisting();
		expect(isProcessRemoved).to.be.false;

	});

	it('should restore the deleted process above', function() {

		browser.pause(3000);
		Process.trashProcess.click();
		browser.pause(3000);
		browser.element(`td*=Delete and Restore Test`).rightClick();
		browser.pause(1000);
		Process.moveToTrashOrRestoreMnu.click();
		browser.pause(2000);
		Process.purgeButton.click();
		browser.pause(2000);
		Process.allProcess.click();
		browser.pause(2000);
		let isProcessRemoved = Process.deleteAndRestoreProcess.isExisting();
		expect(isProcessRemoved).to.be.true;

	});

});
