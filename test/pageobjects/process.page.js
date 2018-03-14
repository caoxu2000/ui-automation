import Page from './page';

class Process extends Page {

	get layers() { return $('.layers'); }
	get canvas() { return $('.canvas'); }
	get processName() { return $('.process-name-field'); }
	get processDesc() { return $('.process-desc-field'); }
	get createProcessLink() { return $('.create-Process'); }
	get createProcessBtn() { return $('.update-process'); }
	get updateProcessNameBtn() { return $('.default-button.action-button'); }
	get duplicateProcessBtn() { return $('.duplicate-process'); }
	get processNameOnLibraryRow() {
		return $('tr.library-table-row:nth-of-type(1) > td:nth-of-type(1)');
	}
	
	get shareProcessMnu() {
		return $('.context-items.dropdown-menu > li:nth-child(7)');
	}

	get searchUserBox() { return $('.search-box.search-box-text'); }
	get selectFirstUser() { return $('.-autocomplete-container'); }
	get userRoleDropDown() { return $('.role-item'); }
	get shareBtn() { return $('.send-invitation'); }
	get confirmationBtn() { return $('.default-button'); }
	get shareWithTab() { return $('.tab-list > li:nth-child(2)'); }
	get cancelBtn() { return $('.cancel-button'); }
	get collaboratorFirstRow() {
		return $('.allowed-collaborators > tr.collaborator-row > td:nth-child(1)');
	}
	get moveToTrash() {
		return $('a*=Move to Trash');
	}
	get restore() {
		return $('a*=Restore');
	}
	get removeFromMyLibrary() {
		return $('a*=Remove from my library');
	}
	get deletePermanently() {
		return $('a*=Delete Permanently');
	}
	get renameProcess() { return $('a*=Rename'); }
	get trashProcess() { return $('a*=Trash'); }
	get allProcess() { return $('a*=All'); }
	get deleteAndRestoreProcess() { return $(`td*=Delete and Restore Test`); }
	get processTD() { return $('tbody > tr:nth-child(1) > td:nth-child(1)'); }
	get purgeButton() { return $('.purge-button'); }

	get addTagLinkContextMnu() {
		return $('a*=Add/Remove Tag');
	}

	get tagNameField() { return $('input.search-box'); }

	get tagUpdateBtn() {
		return $('button.tag-button');
	}

	get tagPill() {
		return $('.tag-pill');
	}

	get removeTag() { return $('.remove-review-pill'); }

	get processTitle() {
		return $('div.app-title-text.title');
	}

	get randomName() {
		return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5).toUpperCase();
	}

	get alertMessage() { return $('.alert-message > p'); }

}

export default new Process();