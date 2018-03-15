import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import getRandomName from '../helpers/get_random_name';
import createExperiment from '../pageobjects/create.experiment.page';
import deleteExperiment from '../pageobjects/delete.experiment.page';
import waitForElement from '../helpers/wait_for_element';


const config = require('config');
const testName = 'Move Experiment to trash and then delete permanently'
const randomName = getRandomName();
const expectedDeletionMsg = 'Items in the trash will be permanently deleted after 7 days.';
const waitErrorMsg = `new experiment takes longer than ${config.app.waitTime} seconds to create`;


describe(testName, () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		createExperiment.create(randomName, randomName);
	});

	it(testName, () => {

		browser.waitUntil(() => {
			let url = browser.getUrl();
			let isUrlChanged = url.includes('experiments');
			return isUrlChanged;
		}, config.app.waitTime, );

		browser.waitForElement(Experiment.appTitle, config.app.waitTime, 'appTitle');
		expect(browser.getUrl()).to.contain('experiments');
		expect(browser.getTitle()).to.contain(randomName);
		// move to trash
		Experiment.measureTopNav.click();
		browser.waitForElement(Experiment.moveToTrash, config.app.waitTime, 'moveToTrash');
		Experiment.moveToTrash.click();
		browser.waitForElement(Experiment.confirmDeleteMsg, config.app.waitTime, 'confirmDeleteMsg');
		let actualDeletionMsg = Experiment.confirmDeleteMsg.getText();
		expect(actualDeletionMsg).equals(expectedDeletionMsg);
		browser.pause(config.app.waitTime);
		Experiment.confirmDeletion.click();
		browser.pause(config.app.downloadWaitTime);
		Experiment.trashLeftNav.click();
		browser.waitForElement($(`td*=${randomName}`), config.app.waitTime, 'Experiment Entry in trash');
		let isExperimentInTrash = $(`td*=${randomName}`).getText().includes(randomName);
		expect(isExperimentInTrash).to.be.true;

		// delete permanently
		browser.pause(config.app.downloadWaitTime);
		browser.element(`td*=${randomName}`).rightClick();
		browser.waitForElement(Experiment.restoreContextMenu, config.app.waitTime, 'restoreContextMenu');
		Experiment.restoreContextMenu.click();
		browser.pause(config.app.waitTime);
		Experiment.confirmRestoreBtn.click();
		browser.pause(config.app.downloadWaitTime);
		Experiment.allLeftNav.click();
		browser.pause(config.app.downloadWaitTime);
		browser.element(`td*=${randomName}`).rightClick();
		browser.waitForElement(Experiment.moveToTrash, config.app.waitTime, 'moveToTrash');
		Experiment.moveToTrash.click();
		browser.pause(config.app.waitTime);
		Experiment.confirmDeletion.click();
		browser.pause(config.app.downloadWaitTime);
		Experiment.trashLeftNav.click();
		browser.pause(config.app.downloadWaitTime);
		browser.element(`td*=${randomName}`).rightClick();
		deleteExperiment.delete();
		browser.pause(config.app.downloadWaitTime);
		let isDeleted = !$(`td*=${randomName}`).isExisting();
		expect(isDeleted).to.be.true;

	});

});
