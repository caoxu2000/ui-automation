import Process from '../pageobjects/process.page';
import waitForElement from '../helpers/wait_for_element';
const config = require('config');

class deleteProcess {

	delete(randomName) {
		const expectedAlertMsg = 'Are you sure you want to delete this process?';
		browser.pause(config.app.waitTime);
		$(`td*=${randomName}`).rightClick();
		browser.waitForElement(Process.moveToTrash, config.app.waitTime, 'moveToTrash');
		Process.moveToTrash.click();
		browser.pause(config.app.waitTime);
		Process.confirmationBtn.click();

		browser.pause(config.app.waitTime);
		let isMoveToTrash = !$(`td*=${randomName}`).isExisting();
		expect(isMoveToTrash).to.be.true;
		browser.waitForElement(Process.trashProcess, config.app.waitTime, 'trashProcess');
		Process.trashProcess.click();
		browser.pause(config.app.waitTime);
		$(`td*=${randomName}`).rightClick();
		browser.waitForElement(Process.deletePermanently, config.app.waitTime, 'deletePermanently');
		Process.deletePermanently.click();
		browser.pause(config.app.waitTime);
		let actualAlertMsg = Process.alertMessage.getText();
		expect(actualAlertMsg).equals(expectedAlertMsg);
		Process.confirmationBtn.click();
		browser.pause(config.app.waitTime);
		let isProcessDeleted = !browser.element(`td*=${randomName}`).isExisting();
		expect(isProcessDeleted).to.be.true;
	}

}

export default new deleteProcess();