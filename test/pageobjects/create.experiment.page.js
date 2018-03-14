import createProcess from '../pageobjects/create.process.page';
import Experiment from '../pageobjects/experiment.page';
import Home from '../pageobjects/home.page';
import waitForElement from '../helpers/wait_for_element';
const config = require('config');

class createExperiment {

	create(processName, experimentName) {

		createProcess.create(processName);
		browser.switchTab(browser.getTabIds()[1]);
		Experiment.createExperiment(experimentName);

	}
	get url() { return browser.getUrl(); }

}

export default new createExperiment();