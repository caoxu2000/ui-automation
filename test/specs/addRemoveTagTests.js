import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Process from '../pageobjects/process.page';
import getRandomName from '../helpers/get_random_name';

const config = require('config');


describe('Add/remove tag of a process test', function() {

	it('should add the tag only to that the selected process', function() {

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

		browser.pause(3000);
		Process.processNameOnLibraryRow.rightClick();
		Process.addTagLinkContextMnu.click();
		browser.pause(1000);
		browser.keys(['Clear']);
		Process.tagNameField.setValue(getRandomName());
		browser.keys(['Enter']);
		Process.tagUpdateBtn.click();
		browser.pause(3000);
		let isTagAdded = Process.tagPill.isExisting();
		expect(isTagAdded).to.be.true;

	});

	it('should remove the tag above from the process', function() {
		browser.pause(3000);
		Process.processNameOnLibraryRow.rightClick();
		Process.addTagLinkContextMnu.click();
		browser.pause(1000);
		Process.removeTag.click();
		Process.tagUpdateBtn.click();

		browser.pause(3000);
		let isTagAdded = Process.tagPill.isExisting();
		expect(isTagAdded).to.be.not.true;

	});

});
