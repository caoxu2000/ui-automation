import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import RunGroup from '../pageobjects/run.group.page';
import waitForElement from '../helpers/wait_for_element';

const fs = require('fs-extra');
const config = require('config');


describe('Export Planned Values For Groups Test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should export to CSV with expected content', () => {

		browser.url('experiments/qiv4HjjrduTiiFKat');
		browser.waitForElement(Experiment.runTableRow(1, 2), config.app.waitTime, 'runTableRow');

		RunGroup.planMenu.click();
		browser.waitForElement(RunGroup.runGroupDropDown, config.app.waitTime, 'runGroupDropDown');
		RunGroup.runGroupDropDown.click();
		browser.waitForElement(RunGroup.plannedMultipleValues, config.app.waitTime, 'plannedMultipleValues');
		RunGroup.plannedMultipleValues.click();
		browser.pause(config.app.waitTime);
		RunGroup.confirmBtn.click();
		browser.pause(config.app.downloadWaitTime);

		let match = null;
		let expectedCSV = fs.readFileSync(config.app.plannedExpected, 'utf8');
		fs.moveSync(config.app.plannedCSV, config.app.plannedActual, { overwrite: true } );
    let actualCSV = fs.readFileSync(config.app.plannedActual, 'utf8');
    match = expectedCSV === actualCSV;
    console.log(`Verifying expected ${config.app.plannedExpected}`);
    console.log(`Actual exported csv file is located at ${config.app.plannedActual}`);
    expect(match).to.be.true;

	});

});