import Home from '../pageobjects/home.page';
import Process from '../pageobjects/process.page';
import waitForElement from '../helpers/wait_for_element';
const config = require('config');

class createProcess {

	create(randomName) {

		browser.waitForElement(Home.createProcessLink, config.app.waitTime, 'createProcessLink');
		Home.createProcessLink.click();
		browser.waitForElement(Process.processName, config.app.waitTime, 'processName');
		Process.processName.setValue(randomName);
		browser.waitForElement(Process.processDesc, config.app.waitTime, 'processDesc');
		Process.processDesc.setValue('test description');
		Process.createProcessBtn.click();

		browser.pause(config.app.waitTime);
	}

}

export default new createProcess();