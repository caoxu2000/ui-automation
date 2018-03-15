import Page from './page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');

class LoginPage extends Page {
	// define elements
	get username() { return $('input[name="email"]'); }
	get password() { return $('input[name="password"]'); }
	get signInBtn() { return $('button[type="submit"]'); }
	get userInfo() {
		return $('a*=Sign Out');
	}

	get logoutLnk() { return $('.user-info'); }
	get contextMenu() {
		return $('.context-items.dropdown-menu.menu-with-title.normal');
	}
	login(username, password) {
		browser.waitForElement(this.username, config.app.waitTime, 'username');
		this.username.setValue(username);
		browser.waitForElement(this.password, config.app.waitTime, 'password');
		this.password.setValue(password);
		this.signInBtn.click();
		browser.pause(config.app.waitTime);
	}

	logout() {
		browser.pause(config.app.waitTime);
		this.logoutLnk.click();
		browser.waitForElement(this.userInfo, config.app.waitTime, 'userInfo');
		this.userInfo.click();
	}

}

export default new LoginPage();