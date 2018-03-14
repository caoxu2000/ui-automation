import ResourceToolbar from '../pageobjects/resource.toolbar.page';

class createRunFromToolbar {
	create(name) {
		browser.pause(5000);
		ResourceToolbar.createNewRunInput.setValue(name);
		ResourceToolbar.createNewRunInput.keys(['Enter']);
		browser.pause(2000);
	}
}

export default new createRunFromToolbar();