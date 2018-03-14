import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import ResourceToolbar from '../pageobjects/resource.toolbar.page';
import getRandomName from '../helpers/get_random_name';
import Run from '../pageobjects/run.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const path = require('path');
const filePath = path.join(__dirname, '../data/fileupload.csv');


xdescribe('Upload data from file Test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should upload the file and run rule through it', () => {

		browser.url('experiments/3u8ubELYAj4ZnjgH8');
		browser.waitForElement(Experiment.runTableRow(1, 2), config.app.waitTime, 'runTableRow');
		console.log(filePath);
		browser.pause(config.app.waitTime);

		// Run.uploadIcon.click();
		// browser.pause(config.app.waitTime);
		Run.fileUploadInput.uploadFile(filePath);
		browser.pause(config.app.waitTime);

	});

	it('should unrequire file upload', () => {

		Run.checkAllRuns.click();
		browser.waitForElement(Run.trash, config.app.waitTime, 'Run.trash');
		Run.trash.click();
		browser.pause(config.app.waitTime);
		Run.confirmBtn.click();

		browser.pause(config.app.waitTime);
		let isRunDeleted = !Run.checkBoxesForAllRuns.isExisting();
		expect(isRunDeleted).to.be.true;
	});

});