import LoginPage from '../pageobjects/login.page';
import experimentOfProcess from '../pageobjects/create.experiment.page';
import getRandomName from '../helpers/get_random_name';
import getRandomNum from '../helpers/get_random_num';
import convertArrayToMapObject from '../helpers/convert_array_to_map_obj';
import Run from '../pageobjects/run.page';
import Experiment from '../pageobjects/experiment.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const randomName = getRandomName();
const exp1 = getRandomName();
const exp2 = getRandomName();
const exp3 = getRandomName();
const num1 = getRandomNum();
const num2 = getRandomNum();
const num3 = getRandomNum();
const path = require('path');
const filePath = path.join(__dirname, config.app.uploadFile);
const downloadFile = path.join(__dirname, config.app.exportFromAll);
const csv = require('csv-parser');
const fs = require('fs-extra');
const header = [
	'process_id_version',
	'process_name',
	'experiment_id',
	'experiment_label',
	'experiment_name',
	'run_id',
	'run_label',
	'run_number',
	'run_type',
	'run_name',
	'event_id',
	'unit',
	'value'
];

const expectedArr = [
	'First Step | output | unassigned | pH | value',
	num1.toString(),
	num1.toString(),
	num1.toString(),
	num1.toString(),
	num1.toString(),
	num2.toString(),
	num2.toString(),
	num2.toString(),
	num2.toString(),
	num2.toString(),
	num3.toString(),
	num3.toString(),
	num3.toString(),
	num3.toString(),
	num3.toString()
];
let actualArr = [];
const errMsg = 'element was not loaded';


describe('Export Data From All Experiments Test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should export all pH values from all experiments under that process', () => {

		experimentOfProcess.createMultipleExperiments(randomName, exp1, exp2, exp3, num1, num2, num3);
		Experiment.dataDropdown.click();
		browser.waitForElement(Experiment.exportFromAllExperiments,
			config.app.waitTime, `Export From This Experiment Menu ${errMsg}`);
		Experiment.exportFromAllExperiments.click();
		browser.waitForElement(Experiment.exportFileName, config.app.waitTime,
			`ExportFileNameInputField ${errMsg}`);
		Experiment.exportFileName.setValue('exportFromAllExperimentsTest');
		browser.waitForElement(Experiment.beginExport, config.app.waitTime,
			`beginExportButton ${errMsg}`);
		Experiment.beginExport.click();
		browser.pause(config.app.winWaitTime);
		browser.waitForElement(Experiment.downloadIcon, config.app.waitTime,
			`downloadIcon on upper right corner ${errMsg}`);
		Experiment.downloadIcon.click();
		browser.pause(config.app.winWaitTime);
		fs.createReadStream(downloadFile)
			.pipe(csv(header))
			.on('data', function(data) {
				actualArr.push(data.value);
			});
		browser.pause(config.app.downloadWaitTime);
		console.log(`Expect: ${expectedArr}`);
		console.log(`Actual: ${actualArr}`);
		expect(actualArr).to.deep.equal(expectedArr);
		fs.removeSync(downloadFile);

	});

});