import Page from './page';

class VersionsTab extends Page {

	get versionsTabLnk() {
		return $('[data-tab-name="Versions"]');
	}
	get version001Lnk() {
		return $('p=0.01');
	}

	get version100Lnk() {
		return $('p=1.00');
	}

	get version101Lnk() {
		return $('p=1.01');
	}

}

export default new VersionsTab();