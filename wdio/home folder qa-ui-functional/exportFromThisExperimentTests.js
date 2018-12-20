import LoginPage from '../pageobjects/login.page';
import experimentOfProcess from '../pageobjects/create.experiment.page';
import fileUpload from '../pageobjects/fileupload.config';
import getRandomName from '../helpers/get_random_name';
import getRandomNum from '../helpers/get_random_num';
import convertArrayToMapObject from '../helpers/convert_array_to_map_obj';
import Run from '../pageobjects/run.page';
import Experiment from '../pageobjects/experiment.page';
import waitForElement from '../helpers/wait_for_element';
const _ = require('lodash');
const config = require('config');
const randomName = getRandomName();
const randomNumber = getRandomNum();
const path = require('path');
const filePath = path.join(__dirname, config.app.uploadFile);
const downloadFile = path.join(__dirname, config.app.exportFromSingle);
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
	randomNumber.toString(),
	randomNumber.toString(),
	randomNumber.toString(),
	randomNumber.toString(),
	randomNumber.toString()
];
let actualArr = [];
let expected = convertArrayToMapObject(expectedArr);
let actual = {};
const errMsg = 'element was not loaded';


describe('Export Data From This Experiment Test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should export all pH values of the experiment to CSV file', () => {

		experimentOfProcess.createConnectedSteps(randomName);
		Run.createRunsAndFillPHValue('automation ', 5, randomNumber);
		Experiment.dataDropdown.click();
		browser.waitForElement(Experiment.exportFromThisExperiment,
			config.app.waitTime, `Export From This Experiment Menu ${errMsg}`);
		Experiment.exportFromThisExperiment.click();
		browser.waitForElement(Experiment.exportFileName, config.app.waitTime,
			`ExportFileNameInputField ${errMsg}`);
		Experiment.exportFileName.setValue('exportFromSingleExperimentTest');
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
		actualArr.splice(0, 1);
		actual = convertArrayToMapObject(actualArr);
		console.log(`Expected: ${expectedArr}`);
		console.log(`Actually: ${actualArr}`);
		expect(_.isEqual(actual, expected)).to.be.true;
		fs.removeSync(downloadFile);

	});

});