import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Process from '../pageobjects/process.page';
import getRandomName from '../helpers/get_random_name';
import createProcess from '../pageobjects/create.process.page';
import deleteProcess from '../pageobjects/delete.process.page';

const config = require('config');
const randomName = getRandomName();

describe('Create/Share/Remove process from my library tests', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should create a new process', () => {

		createProcess.create(randomName);

	});

	it('should move the process created above to trash', () => {

		browser.switchTab(browser.getTabIds()[0]);
		deleteProcess.delete(randomName);

	});

});
