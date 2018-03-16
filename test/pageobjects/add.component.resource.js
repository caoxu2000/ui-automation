import waitForElement from '../helpers/wait_for_element';
import Resource from '../pageobjects/resource.page';
const config = require('config');

class addComponent {

	add(componentName) {
		browser.execute(() => {
			$('.resource-input-summary .resource-header .toolbar-actions .add-component')
				.trigger('mouseover');
		});
		browser.pause(config.app.waitTime);
		Resource.addComponentIcon.moveToObject();
		browser.pause(config.app.waitTime);
		Resource.addComponentIcon.click();
		browser.waitForElement(Resource.resourceSearch, config.app.waitTime, 'resourceSearch');
		browser.waitUntil(() => {
			return Resource.resourceSearch.isEnabled();
		}, config.app.waitTime, 'resource search input field');
		Resource.resourceSearch.setValue(componentName);
		browser.pause(config.app.downloadWaitTime);
		Resource.firstResource.click();
		browser.pause(config.app.downloadWaitTime);
		Resource.addSelectedComponent.click();
		browser.pause(config.app.downloadWaitTime);
	}

}

export default new addComponent();