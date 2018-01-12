import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import getRandomName from '../helpers/get_random_name';

const config = require('config');


describe('Create/Delete experiment test', function() {

	it('should create an experiment', function() {

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

		Experiment.experimentLnk.waitForExist();
		Experiment.experimentLnk.waitForEnabled();
		Experiment.experimentLnk.click();

		Experiment.createExptLnk.waitForExist();
		Experiment.createExptLnk.waitForEnabled();
		Experiment.createExptLnk.click();
		const randomName = getRandomName();
		Experiment.exptName.waitForExist();
		Experiment.exptName.waitForEnabled();
		browser.pause(3000);
		Experiment.exptName.setValue(randomName);
		Experiment.exptPurpose.setValue('testing static purpose');
		Experiment.createExptBtn.click();

		browser.waitUntil(function() {
			let url = browser.getUrl();
			let isUrlChanged = url.includes('experiments');
			return isUrlChanged;
		}, 6000, 'new experiment takes longer than 6 seconds to create');

		browser.pause(2000);
		expect(browser.getUrl()).to.contain('experiments');
		expect(browser.getTitle()).to.contain(randomName);

	});

	it('should remove the experiment created above', function() {

		Experiment.measureTopNav.click();
		Experiment.moveToTrash.click();
		let actualDeletionMsg = Experiment.confirmDeleteMsg.getText();
		expect(actualDeletionMsg).equals('Items in the trash will be permanently deleted after 7 days.');
		browser.pause(3000);
		Experiment.confirmDeletion.click();
		
		browser.pause(3000);
		expect(browser.getUrl()).to.contain('library/experiments');

	});

});
