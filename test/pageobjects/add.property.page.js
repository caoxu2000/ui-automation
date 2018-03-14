import Run from '../pageobjects/run.page';
import waitForElement from '../helpers/wait_for_element';
const config = require('config');

class addProperty {

	add(propertyName) {

		Run.modifyRun.click();
		browser.execute(() => {
			$('.resource-input-summary .resource-header .toolbar-actions .add-property')
				.trigger('mouseover');
		});
		browser.waitForElement(Run.resourceName, config.app.waitTime, 'resourceName14');
		Run.addProperty.moveToObject();
		browser.waitForElement(Run.resourceName, config.app.waitTime, 'resourceName16');
		Run.addProperty.click();
		Run.findPropertySearchBox.click();
		browser.waitForElement(Run.findPropertySearchBox, config.app.waitTime, 'findPropertySearchBox');
		Run.findPropertySearchBox.setValue(propertyName);
		browser.pause(config.app.waitTime);
		Run.propertyOption.click();
		browser.pause(config.app.waitTime);

		if (propertyName == 'date/time' || propertyName == 'tag') {
			Run.addPropertyApply1.click();
		}
		else {
			Run.unitDropDown.click();
			browser.waitForElement(Run.editToolbar, config.app.waitTime, 'editToolbar');
			Run.editToolbar.click();
			browser.waitForElement(Run.unitPH, config.app.waitTime, 'unitPH');
			Run.unitPH.click();
			Run.addPropertyApply2.click();
		}
	}
}

export default new addProperty();