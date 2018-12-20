import LoginPage from '../pageobjects/login.page';
import experimentOfProcess from '../pageobjects/create.experiment.page';
import dbUpload from '../pageobjects/dbupload.config';
import getRandomName from '../helpers/get_random_name';
import Run from '../pageobjects/run.page';
import waitForElement from '../helpers/wait_for_element';
const config = require('config');
const randomName = getRandomName();
const errMsg = 'element was not loaded';
const tc = 'should execute the DB query Run by Run';


describe('Execute DB Query Run By Run Test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it(tc, () => {

		experimentOfProcess.createConnectedSteps(randomName);
		Run.createRunsAndFillPHValue('automation ', 5, randomNumber);
		dbUpload.requireFromDB();
		browser.waitForElement(dbUpload.addQuery, config.app.waitTime,
			`Add Query Plus ${errMsg}`);
		dbUpload.addQuery.click();
		dbUpload.clickDBUpload(randomName, 'sample_runs', 'run_name');
		browser.waitForElement(dbUpload.executeRunByRun, config.app.waitTime,
			`Execute Run by run checkbox ${errMsg}`);
		dbUpload.executeRunByRun.click();
		dbUpload.executeQuery();
		dbUpload.config('runOption', 'outputA');
		browser.pause(config.app.downloadWaitTime);
		expect(Run.run2ndProperty8thCol.getValue()).to.equal('33.45');

	});

});