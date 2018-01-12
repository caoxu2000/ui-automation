import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Process from '../pageobjects/process.page';
import getRandomName from '../helpers/get_random_name';

const config = require('config');
const randomName = getRandomName();

describe('Create/Share/Remove process from my library tests', function() {

	it('should create a new process', function() {

		LoginPage.login(config.app.admin.username, config.app.admin.password);

		// click away the promot video and browser size suggestion modal
		Home.closeVideoBtn.waitForExist();
		browser.pause(2000);
		Home.closeVideoBtn.click();
		browser.waitUntil(function() {
			return !Home.closeVideoBtn.isExisting();
		}, 3000, 'Video overlay should go away in 3 second');
		
		Home.closeBrowserSize.waitForExist();
		Home.closeBrowserSize.click();

		Home.createProcessLink.waitForEnabled();
		Home.createProcessLink.click();

		browser.waitUntil(function() {
			return Process.createProcessBtn.isEnabled();
		}, 3000, 'Process modal takes longer than 3 seconds to load');
		browser.pause(3000);
		
		Process.processName.waitForVisible();
		Process.processName.setValue(randomName);
		Process.processDesc.waitForVisible();
		Process.processDesc.setValue('test description');
		Process.createProcessBtn.click();

		browser.waitUntil(function() {
			return browser.getTabIds()[1] !== undefined;
		}, 5000, 'new process tab takes longer than 5 seconds to load');
		browser.switchTab(browser.getTabIds()[1]);

		browser.waitForExist('.main-panel');
		expect(browser.getUrl()).to.contain('process');
		expect(browser.getTitle()).to.equal(randomName);
		expect(Home.appTitleText.getText()).to.equal(randomName);

	});

	it('should share it and give admin role to another user', function() {
		browser.pause(2000);
		browser.switchTab(browser.getTabIds()[0]);
		browser.element(`td*=${randomName}`).rightClick();
		Process.shareProcessMnu.click();
		browser.pause(2000);
		Process.searchUserBox.setValue('jko');
		browser.pause(1000);
		Process.selectFirstUser.click();
		browser.pause(2000);
		Process.userRoleDropDown.selectByValue('admin');
		browser.pause(2000);
		Process.shareBtn.click();
		browser.pause(2000);
		Process.confirmationBtn.click();
		browser.pause(2000);
		browser.element(`td*=${randomName}`).rightClick();
		Process.shareProcessMnu.click();
		browser.pause(2000);
		Process.shareWithTab.click();
		browser.pause(2000);
		let firstCollaboratorInfo = Process.collaboratorFirstRow.getText();
		let hasFirstCollaboratorEmail = firstCollaboratorInfo.includes('jko@riffyn.com');
		expect(hasFirstCollaboratorEmail).to.be.true;
		Process.cancelBtn.click();

	});

	it('should remove the process created above from process library', function() {

		browser.pause(5000);
		browser.element(`td*=${randomName}`).rightClick();
		Process.removeFromMyLibrary.click();
		browser.pause(2000);
		Process.confirmationBtn.click();

		browser.pause(2000);
		let isRemovedFromLibrary = !browser.element(`td*=${randomName}`).isExisting();
		expect(isRemovedFromLibrary).to.be.true;

	});

});
