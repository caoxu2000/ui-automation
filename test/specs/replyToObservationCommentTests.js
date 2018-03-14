import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Comment from '../pageobjects/comment.experiment.page';
import getRandomName from '../helpers/get_random_name';
import addComment from '../pageobjects/add.comment.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const expectedComment = getRandomName();


describe('Reply to Experiment Observation Comment Test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should generate a new comment below the existing and indent to the right', () => {

		browser.url('experiments/tbag7H5YvaYLQXXvp');
		browser.waitForElement(Comment.observationsTab, config.app.waitTime, 'runGroupDropDown');
		
		Comment.observationsTab.click();
		browser.pause(config.app.waitTime);
		addComment.add(expectedComment);
		browser.waitForElement(Comment.replyToComment, config.app.waitTime, 'replyToComment');
		Comment.replyToComment.click();
		browser.waitForElement(Comment.replyToArea, config.app.waitTime, 'replyToArea');
		Comment.replyToArea.setValue(expectedComment);
		browser.waitForElement(Comment.saveReplyToComment, config.app.waitTime, 'saveReplyToComment');
		Comment.saveReplyToComment.click();
		browser.pause(config.app.waitTime);
		let actualComment = Comment.replyToCommentView.getText();
		expect(actualComment).equals(expectedComment);
		Comment.deleteComment.click();
		browser.pause(config.app.waitTime);
		expect(Comment.replyToCommentView.isExisting()).to.be.false;

	});

});