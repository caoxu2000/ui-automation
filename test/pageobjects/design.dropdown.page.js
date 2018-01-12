import Page from './page';

class Design extends Page {

	get designDropDown() { return browser.element('.mode-menu.design'); }

	get duplicateLnk() {
		return browser.element('.context-items.dropdown-menu.menu-without-title.normal > li:nth-child(4)');
	}

}

export default new Design();