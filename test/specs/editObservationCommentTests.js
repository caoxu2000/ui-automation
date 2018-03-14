import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Comment from '../pageobjects/comment.experiment.page';
import getRandomName from '../helpers/get_random_name';
import addComment from '../pageobjects/add.comment.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const expectedComment = getRandomName();


describe('Edit Existing Experiment Observation Comment Test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should update the comment with the new content', () => {

		browser.url('experiments/tbag7H5YvaYLQXXvp');
		browser.waitUntil(() => {
			return browser.getTitle() === 'E3 | 3 - One step uploaded';
		}, 7000, 'title takes more than 7 seconds to change');
		browser.waitForElement(Comment.observationsTab, config.app.waitTime, 'observationsTab');
		Comment.observationsTab.click();
		browser.pause(config.app.waitTime);
		addComment.add(expectedComment);
		browser.waitForElement(Comment.editComment, config.app.waitTime, 'editComment');
		Comment.editComment.click();
		browser.waitForElement(Comment.editCommentArea, config.app.waitTime, 'editCommentArea');
		Comment.editCommentArea.setValue(expectedComment);
		browser.pause(config.app.waitTime);
		Comment.updateComment.click();
		browser.pause(config.app.waitTime);
		let actualComment = Comment.firstCommentView.getText();
		expect(actualComment).equals(expectedComment);
		Comment.deleteComment.click();

	});

});