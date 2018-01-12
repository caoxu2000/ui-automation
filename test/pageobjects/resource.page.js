import Page from './page';

class Resource extends Page {

	get assignResourceLnk() {
		return browser.element('tr.data-table-row > td:nth-child(6) > .rf-resource-status-container');
	}

	get resourceValue() {
		return browser.element('tr.data-table-row:nth-of-type(1) > td:nth-child(6) > .rf-resource-put');
	}

	get createNewResource() {
		return browser.element('.btn.define-resource > .create-new-icon');
	}

	get resourceName() {
		return browser.element('input[data-id="resource_name"]');
	}

	get createResourceBtn() {
		return browser.element('.create-resource');
	}

	get assignResourceBtn() {
		return browser.element('.assign-resource');
	}

}

export default new Resource();