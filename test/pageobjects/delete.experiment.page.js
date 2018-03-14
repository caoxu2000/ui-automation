import Experiment from '../pageobjects/experiment.page';

class deleteExperiment {
	delete() {

		browser.pause(3000);
		Experiment.deletePermanentlyContextMenu.click();
		browser.pause(3000);
		Experiment.confirmPermanentDeletion.click();
		browser.pause(3000);

	}

}

export default new deleteExperiment();