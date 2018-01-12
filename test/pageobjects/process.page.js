import Page from './page';

class Process extends Page {

	get layers() { return browser.element('.layers'); }
	get canvas() { return browser.element('.canvas'); }
	get processName() { return browser.element('.process-name-field'); }
	get processDesc() { return browser.element('.process-desc-field'); }
	get createProcessLink() { return browser.element('.create-Process'); }
	get createProcessBtn() { return browser.element('.update-process'); }
	get updateProcessNameBtn() { return browser.element('.default-button.action-button'); }
	get duplicateProcessBtn() { return browser.element('.duplicate-process'); }

	get processNameOnLibraryRow() {
		return browser.element('td*=Components and Properties')
	}
	
	get shareProcessMnu() {
		return browser.element('.context-items.dropdown-menu > li:nth-child(7)');
	}

	get searchUserBox() { return browser.element('.search-box.search-box-text'); }
	get selectFirstUser() { return browser.element('.-autocomplete-container'); }
	get userRoleDropDown() { return browser.element('.role-item'); }
	get shareBtn() { return browser.element('.send-invitation'); }
	get confirmationBtn() { return browser.element('.default-button'); }
	get shareWithTab() { return browser.element('.tab-list > li:nth-child(2)'); }
	get cancelBtn() { return browser.element('.cancel-button'); }
	get collaboratorFirstRow() {
		return browser.element('.allowed-collaborators > tr.collaborator-row > td:nth-child(1)');
	}
	get moveToTrashOrRestoreMnu() {
		return browser.element('.context-items.dropdown-menu > li:nth-child(13)');
	}
	get removeFromMyLibrary() {
		return browser.element('.context-items.dropdown-menu > li:nth-child(11)');
	}
	get renameProcess() { return browser.element('a*=Rename'); }
	get trashProcess() { return browser.element('a*=Trash'); }
	get allProcess() { return browser.element('a*=All'); }
	get deleteAndRestoreProcess() { return browser.element(`td*=Delete and Restore Test`); }
	get processTD() { return browser.element('tbody > tr:nth-child(1) > td:nth-child(1)'); }
	get purgeButton() { return browser.element('.purge-button'); }

	get addTagLinkContextMnu() {
		return browser.element('li.context-menu-item:nth-of-type(9)');
	}

	get tagNameField() {
		return browser.element('input.search-box');
	}

	get tagUpdateBtn() {
		return browser.element('button.tag-button');
	}

	get tagPill() {
		return browser.element('.tag-pill')
	}

	get removeTag() { return browser.element('.remove-review-pill'); }

	get processTitle() {
		return browser.element('div.app-title-text.title');
	}

	get randomName() {
		return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5).toUpperCase();
	}

}

export default new Process();