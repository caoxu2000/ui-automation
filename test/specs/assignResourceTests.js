import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import Resource from '../pageobjects/resource.page';
import getRandomName from '../helpers/get_random_name';

const config = require('config');


describe('Experiment Assign Resource Test', function() {

	it('should assign a new resource to an experiment', function() {

		let isExisting;
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		browser.waitUntil(function() {
			isExisting = Home.libraryTable.isExisting()
			return isExisting;
		}, 10000, 'login takes more than 10 seconds to load the library element');

		browser.url('experiments/XCS83oCNLsBFqLhcF');
		browser.waitUntil(function() {
			return browser.getTitle() === 'E1 | Exp 1';
		}, 10000, 'title takes more than 10 seconds to change');
		Home.closeBrowserSize.waitForVisible();
		Home.closeBrowserSize.waitForEnabled();
		browser.pause(600);
		Home.closeBrowserSize.click();

		browser.waitUntil(function() {
			return Experiment.runTableRow(1, 2).isExisting();
		}, 10000, 'first run table row takes more than 10 seconds to load');

		Resource.assignResourceLnk.waitForExist();
		Resource.assignResourceLnk.click();
		browser.pause(3000);
		Resource.createNewResource.click();
		let expectedResourceName = getRandomName();
		Resource.resourceName.waitForExist();
		Resource.resourceName.waitForEnabled();
		Resource.resourceName.setValue(expectedResourceName);
		Resource.createResourceBtn.click();
		browser.pause(2000);
		Resource.assignResourceBtn.click();
		browser.pause(2000);
		let actualResourceName = Resource.resourceValue.getValue();
		expect(actualResourceName).equals(expectedResourceName);

	});

});