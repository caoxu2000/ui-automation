import Page from './page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');


class Resource extends Page {

	get assignResourceLnk() {
		return $('tr.data-table-row > td:nth-child(6) > .rf-resource-status-container');
	}

	get step2Box() {
		return $('[data-name="Step 2"] rect:nth-child(1)');
	}

	get createRunInput() {
		return $('.run-name-field');
	}

	get resourceValue() {
		return $('tr.data-table-row:nth-of-type(1) > td:nth-child(6) > .rf-resource-put');
	}

	get createNewResource() {
		return $('.btn.define-resource > .create-new-icon');
	}

	get resourceName() {
		return $('input[data-id="resource_name"]');
	}

	get createResourceBtn() {
		return $('.create-resource');
	}

	get assignResourceBtn() {
		return $('.assign-resource');
	}
	get addSelectedComponent() {
		return $('.resource-actions .add-component');
	}
	get componentName() { return $('.component-name'); }
	get addComponentIcon() {
		return $('.resource-input-summary .resource-header .toolbar-actions .add-component');
	}
	get resourceSearch() { return $('#search'); }
	get firstResource() { return $('ul.-autocomplete-list > li'); }
	get addResourceTypeToStep() { return $('.default-button.add-to-activity'); }
	get changeResourceTypeSubmit() { return $('.default-button.change-resource'); }
	get defaultResourceTD() {
		return $('.resource-input-summary table.resource-summary-set > tbody > tr:first-child > td:first-child');
	}
	get changeResourceTypeIcon() {
		return $('.resource-input-summary .resource-header .toolbar-actions .change-resource');
	}
	get copyToOutputIcon() {
		return $('.resource-input-summary .resource-definition tr:nth-child(2) .toolbar-actions .copy-input');
	}
	get inputFirstResource() { return $('.resource-input-summary table.resource-summary-set tr:first-child td.resource-header-name:first-child'); }
	get inputSecondResource() { return $('.resource-input-summary table.resource-summary-set tr:nth-child(2) td.resource-header-name:first-child'); }
	get outputSecondResource() { return $('.resource-output-summary table.resource-summary-set tr:nth-child(2) td.resource-header-name:first-child'); }
	get secondResourceRemoveIcon() {
		return $('.resource-output-summary tbody.resource-definition tr:nth-child(2) td:nth-child(2) div.toolbar-actions button.remove-resource');
	}
	searchResource(resourceName) {
		browser.waitForElement(this.resourceSearch, config.app.waitTime, 'resourceSearch');
		browser.waitUntil(() => {
			return this.resourceSearch.isEnabled();
		}, config.app.waitTime, 'resource search input field');
		this.resourceSearch.setValue(resourceName);
		browser.pause(config.app.waitTime);
		this.firstResource.click();
		browser.pause(config.app.waitTime);
	}
	addResource(resourceName) {
		browser.pause(config.app.waitTime);
		this.searchResource(resourceName);
		this.addResourceTypeToStep.click();
		browser.pause(config.app.waitTime);
	}
	changeResourceType(resourceName) {
		browser.execute(() => {
			$('.resource-input-summary .resource-header .toolbar-actions .change-resource').trigger('mouseover');
		});
		browser.pause(config.app.waitTime);
		this.changeResourceTypeIcon.moveToObject();
		browser.waitForElement(this.changeResourceTypeIcon, config.app.waitTime, 'changeResourceTypeIcon');
		this.changeResourceTypeIcon.click();
		this.searchResource(resourceName);
		this.changeResourceTypeSubmit.click();
		browser.pause(config.app.waitTime);
	}
	copyToOutput(resourceName) {
		browser.execute(() => {
			$('.resource-input-summary .resource-definition tr:nth-child(2) .toolbar-actions .copy-input').trigger('mouseover');
		});
		browser.pause(config.app.waitTime);
		this.copyToOutputIcon.moveToObject();
		browser.waitForElement(this.copyToOutputIcon, config.app.waitTime, 'copyToOutputIcon');
		this.copyToOutputIcon.click();
		browser.pause(config.app.waitTime);
	}

}

export default new Resource();