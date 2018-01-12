import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import getRandomName from '../helpers/get_random_name';
const config = require('config');
const randomName = getRandomName();

describe('Update Experiment Summary Test', function() {

	it('should add summary to experiment', function() {

		let isExisting;
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		browser.waitUntil(function() {
			isExisting = Home.libraryTable.isExisting()
			return isExisting;
		}, 10000, 'login takes more than 10 seconds to load the library element');

		browser.url('experiments/XCS83oCNLsBFqLhcF');
		browser.waitUntil(function() {
			return browser.getTitle().includes('E1 | Exp 1');
		}, 10000, 'title takes more than 10 seconds to change');
		Home.closeBrowserSize.waitForVisible();
		Home.closeBrowserSize.waitForEnabled();
		browser.pause(2000);
		Home.closeBrowserSize.click();
		browser.pause(3000);
		Experiment.summaryLink.click();
		browser.pause(2000);
		Experiment.summaryInputField.setValue(`This is test from automation ${randomName}`);
		Experiment.summaryUpdateBtn.click();
		
		browser.pause(2000);
		Experiment.summaryLink.click();
		browser.pause(2000);
		let summary = Experiment.summaryInputField.getText();
		expect(summary).equals(`This is test from automation ${randomName}`);

	});

});