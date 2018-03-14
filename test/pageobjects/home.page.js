import Page from './page';

class Home extends Page {

	get createProcessLink() { return $('.create-entity.create-Process'); }
	get libraryTable() { return $('.library-browse-table'); }
	get appTitleText() { return $('.app-title-text.title'); }
}

export default new Home();