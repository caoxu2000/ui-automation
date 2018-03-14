import Page from './page';
import waitForElement from '../helpers/wait_for_element';
const config = require('config');

class Step extends Page {

	get addNewStepLnk() {
		return $('[title="Add Step"]');
	}

	get firstStepBox() {
		return $('[data-name="Step 1"]');
	}

	get secondStepBox() {
		return $('[data-name="Step 2"]');
	}

	get thirdStepBox() {
		return $('[data-name="New Base Step"]');
	}

	get prevStepBox() {
		return $('[data-name="Prev Step"]');
	}
	get nextStepBox() {
		return $('[data-name="Next Step"]');
	}
	get prevStepLabel() { return $('[data-name="Prev Step"] > .step-order-label'); }
	get nextStepLabel() { return $('[data-name="Next Step"] > .step-order-label'); }

	get firstStepInputResource() {
		return $('[data-name="Step 1"] .resource.input');
	}
	get secondStepOutputResource() {
		return $('[data-name="Step 2"] .resource.output');
	}
	get addStepBeforeLnk() { return $('a*=Add Step Before'); }
	get addStepAfterLnk() { return $('a*=Add Step After'); }
	get deleteStepLnk() { return $('a*=Delete Step'); }

	get deleteConfirmation() { return $('.action-button'); }

	get newStepBox() {
		return $('.activities > .box:nth-child(2)');
	}

	get contextMenu() {
		return $('.context-items');
	}

	get noAccessPopup() {
		return $('.modal-content');
	}

	get resourceSummaryTable() {
		return $('.resource-summary-set.body.view');
	}

	get viewStepOrder() { return $('a*=View Step Order'); }
	get showStepID() { return $('a*=Show Step ID'); }
	get addInput() { return $('a*=Add Input'); }
	get addOutput() { return $('a*=Add Output'); }
	get stepOrderBubble() { return $$('.step-order-item-order-bubble') }
	get secondStepOrderTableRow() { return $('.order-steps-panel tr:nth-child(2)'); }
	get stepLabel() { return $$('.step-label'); }
	
	add3rdStep() {
		this.addNewStepLnk.click();
		browser.pause(config.app.waitTime);
		this.thirdStepBox.rightClick();
	}
	remove3rdStep() {
		this.thirdStepBox.rightClick();
		this.deleteStepLnk.click();
		browser.pause(config.app.waitTime);
		this.deleteConfirmation.click();
		browser.pause(config.app.waitTime);
	}
	addAndRemoveStepBefore1stStep() {
		this.firstStepInputResource.rightClick();
		this.addStepBeforeLnk.click();
		browser.pause(config.app.waitTime);
		this.prevStepLabel.click();
		expect(this.prevStepBox.isExisting()).to.be.true;
		browser.waitForElement(this.prevStepBox, config.app.waitTime, 'prevStepBox');
		this.prevStepBox.rightClick();
		browser.pause(config.app.waitTime);
		this.deleteStepLnk.click();
		browser.waitForElement(this.deleteConfirmation, config.app.waitTime, 'deleteConfirmation');
		this.deleteConfirmation.click();
		browser.pause(config.app.waitTime);
	}
	addAndRemoveStepAfter2ndStep() {
		this.secondStepOutputResource.rightClick();
		this.addStepAfterLnk.click();
		browser.pause(config.app.waitTime);
		this.nextStepLabel.click();
		expect(this.nextStepBox.isExisting()).to.be.true;
		browser.waitForElement(this.nextStepBox, config.app.waitTime, 'nextStepBox');
		this.nextStepBox.rightClick();
		browser.pause(config.app.waitTime);
		this.deleteStepLnk.click();
		browser.waitForElement(this.deleteConfirmation, config.app.waitTime, 'deleteConfirmation');
		this.deleteConfirmation.click();
		browser.pause(config.app.waitTime);
	}

}

export default new Step();