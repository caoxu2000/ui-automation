import Step from './step.page';
import waitForElement from '../helpers/wait_for_element';
const config = require('config');
const errMsg = 'element was not loaded';


class dbUploadConfig {

	clickDBUpload(name, dbTable, whereClauseFilterOption) {

		browser.pause(config.app.waitTime);
		browser.waitForElement(this.queryName, config.app.waitTime,
			`Query Name Input Field ${errMsg}`);
		this.queryName.setValue(name);
		browser.pause(config.app.waitTime);
		// this.envList.click();
		// this.envOption.click();
		// this.dataSourceList.click();
		// this.dataSourceOption.click();
		this.fromDBTableList.click();
		browser.pause(config.app.waitTime);
		if (dbTable == 'sample_runs') {
			browser.waitForElement(this.sampleRuns, config.app.waitTime,
			`sample_runs in dropdown ${errMsg}`);
			this.sampleRuns.click();
		} else if (dbTable == 'compression_data') {
			browser.waitForElement(this.compressionData, config.app.waitTime,
			`compression_data option in drop down ${errMsg}`);
			this.compressionData.click();
		}
		browser.pause(config.app.waitTime);
		browser.waitForElement(this.whereClauseFilter, config.app.waitTime,
			`where clause filter dropdown ${errMsg}`);
		this.whereClauseFilter.click();
		browser.pause(config.app.waitTime);
		if (whereClauseFilterOption == 'run_name') {
			this.whereClauseRunName.click();
		} else {
			this.whereClauseRun.click();
		}
		browser.pause(config.app.waitTime);
		browser.waitForElement(this.whereClauseOperator, config.app.waitTime,
			`Where Clause Operator dropdown ${errMsg}`);
		this.whereClauseOperator.click();
		browser.pause(config.app.waitTime);
		browser.waitForElement(this.whereClauseOperatorOption, config.app.waitTime,
			`is not null in dropdown ${errMsg}`);
		this.whereClauseOperatorOption.click();
		browser.pause(config.app.waitTime);
		this.saveButton[1].click();
		browser.pause(config.app.downloadWaitTime);

	}

	executeQuery() {

		browser.waitForElement(this.queryItem, config.app.waitTime,
			`Query Item ${errMsg}`);
		this.queryItem.click();
		browser.pause(config.app.waitTime);
		this.executeButton.click();
		browser.pause(config.app.downloadWaitTime);

	}

	runRulesSelections(runNameOption) {

		browser.waitForElement(this.runMatchingType, config.app.waitTime,
			`Run Matching Dropdown ${errMsg}`);
		this.runMatchingType.click();
		this.createEachRowFromFile.click();
		this.runAttribute.click();
		this.runAttrOption.click();
		this.columnFromDB.click();
		if (runNameOption == 'runOption') {
			this.rootRunOption.click();
		}

	}

	resourceRulesSelections(runNameOption) {

		this.resourceRules.click();
		this.inputResourceType.click();
		this.inputUnassigned.click();
		this.inputResourceFromDB.click();
		if (runNameOption == 'runOption') {
			this.rootRunOption.click();
		}

	}

	propertyRulesSelections(phOption) {

		this.propertyRules.click();
		this.outputPH.click();
		if (phOption == 'topMaxFNewtons') {
			this.topMaxFNewtons.click();
		} else if (phOption == 'PH') {
			this.outputPH.click();
		}

	}

	uploadAndSave() {

		this.uploadAndSaveBtn.click();
		browser.pause(config.app.dbConfigLoadTime);

	}

	requireFromDB() {

		Step.requireFromDBQuery();
		browser.waitForElement(Step.confirmation,
			config.app.waitTime, `Yes Button ${errMsg} on line 27`);
		Step.confirmation.click();
		browser.pause(config.app.waitTime);
		Step.dbIconOnStep.click();

	}

	config(runNameOption, phOption) {

		this.runRulesSelections(runNameOption);
		this.resourceRulesSelections(runNameOption);
		this.propertyRulesSelections(phOption);
		this.uploadAndSave();

	}

	editQuery() {

		browser.waitForElement(this.editQueryIcon, config.app.waitTime,
			`Edit Query Pen Icon ${errMsg}`);
		this.editQueryIcon.click();

	}

	overwriteExistingRuns(filePath) {

		this.useExistingRuns.click();
		this.uploadAndSave();

	}

	manualDataEntryConfig(filePath) {

		this.createEachRowFromFile.click();
		this.manualDataEntryOption.click();
		browser.pause(config.app.waitTime);
		this.manualDataEntry.click();
		browser.pause(config.app.waitTime);
		this.manualDataEntryValue.setValue('1234');
		browser.pause(config.app.waitTime);
		this.uploadAndSave();

	}

	get addQuery() { return $('.btn.btn-add-saved-query'); }
	get queryName() { return $('#saved-query-name'); }
	get envList() { return $('#environment-select'); }
	get envOption() { return $('option*=AWS Test Environment'); }
	get dataSourceList() { return $('#data-source-select'); }
	get dataSourceOption() { return $('option*=PG(AWS)'); }
	get fromDBTableList() { return $('#from-select'); }
	get sampleRuns() { return $('option[value="table:sample_runs"]'); }
	get compressionData() { return $('option[value="table:compression_data"]'); }
	get whereClauseFilter() { return $('[name="querybuilder_rule_0_filter"]'); }
	get whereClauseRunName() { return $('option[value="run_name"]');; }
	get whereClauseRun() { return $('option[value="run"]'); }
	get whereClauseOperator() { return $('[name="querybuilder_rule_0_operator"]'); }
	get whereClauseOperatorOption() { return $('option*=is not null'); }
	get runOption() { return $('option*=run'); }
	get isNotNullOption() { return $('option*=is not null'); }
	get saveButton() { return $$('.btn.default-button.action-button'); }
	get executeRunByRun() { return $('.run-by-run-checkbox'); }
	get executeButton() { return $('.btn.default-button.action-button'); }
	get closeButton() { return $('.close.cancel-button.close-location'); }
	get queryItem() { return $('li.list-group-item'); }
	get editQueryIcon() { return $('.btn-edit-saved-query'); }
	get deleteQueryIcon() { return $('.btn-delete-saved-query'); }
	get uploadAndSaveBtn() { return $('.btn.btn-primary.upload-save'); }

	get resourceRules() { return $('[data-step="ResourceRules"]'); }
	get propertyRules() { return $('[data-step="PropertyRules"]'); }
	get manualDataEntry() { return $('[data-step="ManualDataEntry"]'); }
	get inputResourceType() {
		return $('#resource-rules tr.resource-rule > td:nth-child(2) > select');
	}
	get outputResourceType() {
		return $('#resource-attributes tr.resource-rule > td:nth-child(2) > select');
	}
	get inputResourceFromDB() {
		return $('#resource-rules tr.resource-rule > td:nth-child(4) > select');
	}
	get outputResourceFromDB() {
		return $('#resource-attributes tr.resource-rule > td:nth-child(4) > select');
	}
	get inputUnassigned() {
		return $('option*=Pass-through | Unassigned | Name');
	}
	get outputResourceTypeOption() {
		return $('option*=Output | Water | Name');
	}
	get runMatchingType() {
		return $('.di-main-run-rules > div:nth-of-type(2) > .data-block-field-input');
	}
	get createEachRowFromFile() {
		return $('option*=Create as many runs as rows of file data');
	}
	get useExistingRuns() {
		return $('option*=Use existing runs on current step');
	}
	get runAttribute() {
		return $('#run-attributes .run-rule td:nth-child(2) select');
	}
	get runAttrOption() {
		return $('option*=Run | Name');
	}
	get columnFromDB() {
		return $('#run-attributes .run-rule td:nth-child(4) select');
	}
	get runNameOption() {
		return $('option[value="root|run_name"]');
	}
	get rootRunOption() {
		return $('option[value="root|run"]');
	}
	get manualDataEntryOption() {
		return $('[value="new-manual-data"]');
	}
	get manualDataEntryValue() {
		return $('.manual-data-entry-value');
	}

	get outputPH() {
		return $('.outputs-table tr:nth-of-type(1) td:nth-of-type(4)');
	}

	get outputA() { return $('option*=output_a'); }
	get topMaxFNewtons() { return $('option*=top_max_f_newtons'); }

}

export default new dbUploadConfig();