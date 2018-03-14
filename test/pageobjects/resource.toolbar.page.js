import Page from './page';

class ResourceToolbar extends Page {

	get createNewRunPlus() {
		return $('[title="Create Runs"]');
	}

	get runCounter() {
		return $('.run-count');
	}

	get runPrefixName() {
		return $('input.form-control.run-name');
	}

	get createRunBtn() {
		return $('button=Create Runs')
	}

	get resourceToolbar() {
		return $('.resource-details-toolbar');
	}
	get createNewRunInput() { return $('.run-name-field')}

}

export default new ResourceToolbar();