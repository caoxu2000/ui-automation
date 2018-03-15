import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Process from '../pageobjects/process.page';
import getRandomName from '../helpers/get_random_name';
import waitForElement from '../helpers/wait_for_element';
import ContextMenu from '../pageobjects/context.menu.page';

const config = require('config');
const randomName = getRandomName();

describe('Add/remove tag of a process test', function() {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should add the tag only to that the selected process', function() {

		browser.waitForElement(Process.firstProcessRowInLibrary, config.app.waitTime, 'firstProcessRowInLibrary1');
		Process.firstProcessRowInLibrary.rightClick();
		browser.waitForElement(Process.addTagLinkContextMnu, config.app.waitTime, 'addTagLinkContextMnu1');
		Process.addTagLinkContextMnu.click();
		browser.keys(['Clear']);
		browser.waitForElement(Process.tagNameField, config.app.waitTime, 'tagNameField');
		Process.tagNameField.setValue(randomName);
		browser.keys(['Enter']);
		browser.waitForElement(Process.tagUpdateBtn, config.app.waitTime, 'tagUpdateBtn');
		Process.tagUpdateBtn.click();
		browser.waitForElement(Process.tagPill, config.app.waitTime, 'tagPill');
		expect(Process.tagPill.isExisting()).to.be.true;

		// remove tag added from above
		Process.tagPill.click();
		browser.waitForElement(Process.firstProcessRowInLibrary, config.app.waitTime, 'firstProcessRowInLibrary2');
		Process.firstProcessRowInLibrary.rightClick();
		browser.waitForElement(Process.addTagLinkContextMnu, config.app.waitTime, 'addTagLinkContextMnu2');
		Process.addTagLinkContextMnu.click();
		browser.pause(config.app.waitTime);
		Process.removeTag.click();
		browser.waitForElement(Process.tagUpdateBtn, config.app.waitTime, 'tagUpdateBtn');
		Process.tagUpdateBtn.click();
		browser.pause(config.app.waitTime);
		expect(Process.tagPill.isExisting()).to.be.false;

	});

});
