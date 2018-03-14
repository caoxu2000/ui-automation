import Page from './page';

class Role extends Page {

	get roleText() {
		return $('.user-role');
	}

}

export default new Role();