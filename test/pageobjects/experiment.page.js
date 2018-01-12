import Page from './page';

class Experiment extends Page {

	get experimentLnk() {
		return browser.element('.process-info.experiment-menu.ready');
	}
	get createExptLnk() {
		return browser.element('.expanded-dropdown-menu-actions td:nth-child(1)');
	}
	get measureTopNav() { return browser.element('.mode-menu.measure'); }
	get moveToTrash() { return browser.element('li*=Move to Trash'); }
	get confirmDeletion() { return browser.element('.purge-button'); }
	get confirmDeleteMsg() { return browser.element('.library-purge-entity > h4'); }
	get summaryLink() { return browser.element('.subtitle'); }
	get summaryInputField() { return browser.element('.summary'); }
	get summaryUpdateBtn() { return browser.element('.update-experiment-edits'); }

	get appTitle() { return browser.element('.app-title-text.subtitle'); }
	get deleteIcon() { return browser.element('.delete-comment'); }

	get observationsTab() {
		return browser.element('[data-tab-name="Observations"]');
	}

	get observationAddComment() { return browser.element('textarea.add-comment'); }
	get saveObservationCommentBtn() { return browser.element('.save-comment'); }
	get commentView() { return browser.element('.activity-comment.view'); }
	get createExptBtn() { return browser.element('.action-button'); }

	get exptName() { return browser.element('.experiment-name-field'); }
	get exptPurpose() { return browser.element('.experiment-purpose-field'); }

	runTableRow(tr_index, td_index) { 
		return browser.element(`.resource-details-table tbody > 
			tr:nth-child(${tr_index}) > td:nth-child(${td_index})`);
	}

}

export default new Experiment();