import Page from './page';

class Design extends Page {

	get designDropDown() { return $('.mode-menu.design'); }

	get duplicateLnk() {
		return $('.context-items.dropdown-menu.menu-without-title.normal > li:nth-child(4)');
	}

}

export default new Design();