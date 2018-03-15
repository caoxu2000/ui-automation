import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import ContextMenu from '../pageobjects/context.menu.page';
import getRandomName from '../helpers/get_random_name';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const randomName = getRandomName();

describe('Add/remove tag of an experiment test', function() {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should add the tag only to the selected experiment', function() {

		browser.pause(config.app.waitTime);
		Experiment.firstExperimentInLibrary.rightClick();
		browser.waitForElement(ContextMenu.addOrRemove, config.app.waitTime, 'addOrRemove');
		ContextMenu.addOrRemove.click();
		browser.keys(['Clear']);
		browser.waitForElement(ContextMenu.tagName, config.app.waitTime, 'tagName');
		ContextMenu.tagName.setValue(randomName);
		browser.keys(['Enter']);
		browser.pause(config.app.waitTime);
		ContextMenu.tagUpdateBtn.click();
		browser.pause(config.app.waitTime);
		expect(ContextMenu.tagPill.isExisting()).to.be.true;

		ContextMenu.tagPill.click();
		browser.pause(config.app.waitTime);
		Experiment.firstExperimentInLibrary.rightClick();
		browser.waitForElement(ContextMenu.addOrRemove, config.app.waitTime, 'addOrRemove');
		ContextMenu.addOrRemove.click();
		browser.pause(config.app.waitTime);
		ContextMenu.removeTag.click();
		browser.pause(config.app.waitTime);
		ContextMenu.tagUpdateBtn.click();
		browser.pause(config.app.waitTime);
		expect(ContextMenu.tagPill.isExisting()).to.be.false;

	});

});
