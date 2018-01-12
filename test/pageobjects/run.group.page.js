import Page from './page';

class RunGroup extends Page {

	get runGroupDropDown() {
		return browser.element('.run-group-name');
	}

	get newRunGroup() {
		return browser.element('.dropdown-menu > li:nth-child(1) > a');
	}

	get groupName() {
		return browser.element('.group-name');
	}

	get createRunGroupBtn() {
		return browser.element('.default-button.action-button');
	}

	get headerRow() { return browser.element('.header-row'); }
	get renameCurrentGroup() { return browser.element('a*=Rename Current Group'); }

}

export default new RunGroup();