import Page from './page';

class Run extends Page {

	get resourceName() { return $('.resource-name'); }
	get resourceEditHeader() {
		return $('.resource-summary-set header edit');
	}
	get editToolbar() { return $('.property-edit-tools'); }
	get runTable() { return $('.data-table'); }
	get unitPH() { return $('option[value="ph"]'); }
	get unitDropDown() {
		return $('.unit-item.form-control');
	}
	get numericResource() {
		return $('div[title="pH"]');
	}
	get textResource() {
		return $('div[title="tag"]');
	}
	get dateResource() {
		return $('div[title="date/time"]');
	}
	get formulaEditor() {
		return $('a*=Formula editor');
	}

	get formulaInput() {
		return $('.calculated-formula');
	}

	get updateFormulaBtn() {
		return $('.formula-editor-footer > .action-button');
	}

	get calculationBtn() { return $('.calculation-button'); }
	get calculatedResultCell() { return $('.calculated.has-single-value'); }
	get firstPropertyCell() {
		return $('tr.data-table-row:nth-of-type(1) td:nth-child(7) > input');
	}
	get belowPropertyCell() {
		return $('tr.data-table-row:nth-of-type(2) td:nth-child(7) > input');
	}
	get runFillDownBtn() { return $('.action-button.update-run-status'); }
	get checkAllCheckbox() { return $('.toggle-box'); }
	get checkAllRuns() {
		return $('.header-row .toggle-box.select-none');
	}
	get checkBoxesForAllRuns() { return $('.data-table-row .toggle-box.select-none'); }
	get trash() { return $('.fa-trash'); }
	get confirmBtn() { return $('.footer-buttons > button:nth-of-type(2)'); }
	get uploadIcon() { return $('button.upload-data-file'); }
	get fileUploadInput() { return $$('input[type="file"]'); }
	get modifyRun() {
		return $('.rf-experiement-editor-panel-toolbar > span:nth-of-type(1)');
	}
	get actualRun() { return $('.rf-mode.inactive:nth-of-type(2) span:nth-of-type(2)'); }
	get addProperty() {
		return $('.resource-input-summary .resource-header .toolbar-actions .add-property');
	}
	get propertyOption() {
		return $('ul.-autocomplete-list > li');
	}
	get findPropertySearchBox() { return $('#search'); }
	get addPropertyApply1() { return $('.save-edits.qualitative'); }
	get addPropertyApply2() { return $('.save-edits.quantitative'); }
	get step1() { return $('.activities > .box.activity:nth-child(1)'); }
	get anchorOfStep2() { return $('.activities > .box.activity:nth-child(2) .anchor-link'); }
	get firstStepfirstRunCheckBox() {
		return $('.first-step .data-table-row:nth-of-type(1) .toggle-box:nth-of-type(1)');
	}
	get firstRunResourceOutput() {
		return $('.first-step .data-table-row:nth-of-type(1) .rf-resource-put:nth-of-type(1)');
	}
	get finalRunResourceInput() {
		return $('.final-step .data-table-row:nth-of-type(1) .rf-resource-put:nth-of-type(1)');
	}
	get finalStepfirstRunCheckBox() {
		return $('.final-step .data-table-row:nth-of-type(1) .toggle-box:nth-of-type(1)');
	}
	get connectionActionBtn() {
		return $('.run-propagation-connect-action-button');
	}
	get firstRunRows() { return $('.data-table-row:nth-of-type(1)'); }

}

export default new Run();