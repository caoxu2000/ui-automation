import waitForElement from '../helpers/wait_for_element';
import Resource from '../pageobjects/resource.page';
const config = require('config');

class crudComponent {

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
		Resource.addComponent.click();
		browser.pause(config.app.downloadWaitTime);
	}
	change(anotherComponentName) {
		browser.execute(() => {
			$('.resource-input-summary .resource-header .toolbar-actions .change-component')
				.trigger('mouseover');
		});
		browser.pause(config.app.waitTime);
		Resource.changeComponentIcon.moveToObject();
		browser.pause(config.app.waitTime);
		Resource.changeComponentIcon.click();
		browser.waitForElement(Resource.resourceSearch, config.app.waitTime, 'resourceSearch');
		browser.waitUntil(() => {
			return Resource.resourceSearch.isEnabled();
		}, config.app.waitTime, 'resource search input field');
		Resource.resourceSearch.setValue(anotherComponentName);
		browser.pause(config.app.downloadWaitTime);
		Resource.firstResource.click();
		browser.pause(config.app.downloadWaitTime);
		Resource.changeComponent.click();
		browser.pause(config.app.downloadWaitTime);
	}
	propagate() {
		browser.execute(() => {
			$('.resource-input-summary .resource-header .toolbar-actions .propagate-downstream')
				.trigger('mouseover');
		});
		browser.pause(config.app.waitTime);
		Resource.propagateDownstreamIcon.moveToObject();
		browser.pause(config.app.waitTime);
		Resource.propagateDownstreamIcon.click();
		browser.pause(config.app.waitTime);
	}

}

export default new crudComponent();