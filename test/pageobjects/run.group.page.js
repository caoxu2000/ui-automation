import Page from './page';

class RunGroup extends Page {

	get runGroupDropDown() {
		return $('.run-group-name');
	}

	get newRunGroup() {
		return $('.dropdown-menu > li:nth-child(1) > a');
	}

	get groupName() {
		return $('.group-name');
	}

	get confirmBtn() {
		return $('.default-button.action-button');
	}

	get headerRow() { return $('.header-row'); }
	get renameCurrentGroup() { return $('a*=Rename Current Group'); }
	get exportSingleValuedData() {
		return $('a*=Export Single Valued Data For Group');
	}
	get plannedMultipleValues() {
		return $('a*=Export Planned Values For Group');
	}
	get planMenu() {
		return $('.modes > span:nth-child(1)');
	}
	get newRunGroupDropDown() { return $('.run-group-details'); }
	get deleteCurrentGroup() {
		return $('a*=Delete Current Group');
	}
}

export default new RunGroup();