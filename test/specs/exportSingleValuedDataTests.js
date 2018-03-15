import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import RunGroup from '../pageobjects/run.group.page';
import waitForElement from '../helpers/wait_for_element';

const fs = require('fs-extra');
const config = require('config');


describe('Export Single Valued Data For Group Test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should export to CSV with expected content', () => {

		browser.url('experiments/tbag7H5YvaYLQXXvp');
		browser.waitForElement(Experiment.runTableRow(1, 2), config.app.waitTime, 'runTableRow');
		RunGroup.runGroupDropDown.click();
		browser.waitForElement(RunGroup.exportSingleValuedData, config.app.waitTime, 'exportSingleValuedData');
		RunGroup.exportSingleValuedData.click();
		browser.pause(config.app.waitTime);
		RunGroup.confirmBtn.click();
		browser.pause(config.app.downloadWaitTime);

		let match = null;
		let expectedCSV = fs.readFileSync(config.app.expectedCSV, 'utf8');
		fs.moveSync(config.app.downloadedCSV, config.app.actual, { overwrite: true } );
    let actualCSV = fs.readFileSync(config.app.actual, 'utf8');
    match = expectedCSV === actualCSV;
    console.log(`Verifying expected ${config.app.expectedCSV}`);
    console.log(`Actual exported csv file is located at ${config.app.actual}`);
    expect(match).to.be.true;

	});

});