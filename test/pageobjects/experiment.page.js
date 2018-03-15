import Page from './page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');

class Experiment extends Page {

	get experimentLnk() {
		return $('.process-info.experiment-menu.ready');
	}
	get createExptLnk() {
		return $('.expanded-dropdown-menu-actions td:nth-child(1)');
	}
	get measureTopNav() { return $('.mode-menu.measure'); }
	get moveToTrash() { return $('a*=Move to Trash'); }
	get confirmDeletion() { return $('.purge-button'); }
	get confirmDeleteMsg() { return $('.library-purge-entity > h4'); }
	get summaryLink() { return $('.subtitle'); }
	get summaryInputField() { return $('.summary'); }
	get summaryUpdateBtn() { return $('.update-experiment-edits'); }

	get appTitle() { return $('.app-title-text.subtitle'); }
	get deleteIcon() { return $('.delete-comment'); }

	get createExptBtn() { return $('.modal-dialog .action-button'); }

	get exptName() { return $('.experiment-name-field'); } // remember to change this back when dev fixes the css name value
	get arithmaticExptName() { return $('.process-name-field'); }
	get exptPurpose() { return $('.experiment-purpose-field'); }

	get openDropDown() { return $('.mode-menu.organize'); }
	get duplicateContextMnu() {
		return $('a*=Duplicate');
	}
	get duplicateBtn() { return $('.duplicate-button'); }

	runTableRow(tr_index, td_index) { 
		return $(`.resource-details-table tbody > 
			tr:nth-child(${tr_index}) > td:nth-child(${td_index})`);
	}
	get firstRunSecondCol() {
		return $('.resource-details-table tbody > tr:nth-child(1) > td:nth-child(2)');
	}
	get trashLeftNav() { return $('a*=Trash'); }
	get firstExperimentInLibrary() {
		return $('tr.library-table-row:nth-of-type(1) > td:nth-of-type(1)');
	}
	get restoreContextMenu() { return $('a*=Restore'); }
	get confirmRestoreBtn() {
		return $('.purge-button.action-button');
	}
	get allLeftNav() { return $('a*=All'); }
	get arithmaticExpRow() { return $('td*=arithmetic'); }
	get deletePermanentlyContextMenu() { return $('a*=Delete Permanently'); }
	get confirmPermanentDeletion() {
		return $('.default-button.action-button')
	}
	createExperiment(expName) {
		browser.waitForElement(this.experimentLnk, config.app.waitTime, 'this.experimentLnk');
		this.experimentLnk.click();
		browser.waitForElement(this.createExptLnk, config.app.waitTime, 'this.createExptLnk');
		this.createExptLnk.click();
		browser.waitForElement(this.exptName, config.app.waitTime, 'this.exptName');
		this.exptName.setValue(expName);
		this.exptPurpose.setValue(`${expName} by test automation`);
		this.createExptBtn.click();
		browser.pause(config.app.downloadWaitTime);
	}
}

export default new Experiment();