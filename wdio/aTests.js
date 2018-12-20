import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import getRandomName from '../helpers/get_random_name';
import Comment from '../pageobjects/comment.page';
import waitForElement from '../helpers/wait_for_element';

const fs = require('fs-extra');
const config = require('config');
const path = require('path');
const filePath = path.join(__dirname, '../data/RiffynMap.png');
// const cheerio = require('cheerio'); // Basically jQuery for node.js

describe('Attach file as Design Note Test', () => {

	before(() => {
		browser.url('https://www.google.com');
		browser.debug();
		browser.execute(() => {
			window.history.back();
		});
		browser.debug();
		// LoginPage.login(config.app.admin.username, config.app.admin.password);
		// browser.debug();
	});

	xit('should upload the file as attachment to the Design Note', () => {

		browser.url('processes/ed2wxMprF9tNrB6bW');
		browser.waitForElement(Comment.designNotesTab, config.app.waitTime, 'designNotesTab');
		Comment.designNotesTab.click();
		const $ = cheerio.load(browser.getSource());
		browser.execute(function() {
			return $('.foreground').rightClick();
		});

	});
	after(() => {
	});

});