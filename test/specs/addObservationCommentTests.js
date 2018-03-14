import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import getRandomName from '../helpers/get_random_name';
import addComment from '../pageobjects/add.comment.page';
import Comment from '../pageobjects/comment.experiment.page';
import waitForElement from '../helpers/wait_for_element';

const config = require('config');
const expectedComment = getRandomName();


describe('Add New Experiment Observation Comment Test', () => {

	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		browser.pause(2000);
	});

	it('should add a new comment to the experiment', () => {

		let isExisting;

		browser.url('experiments/tbag7H5YvaYLQXXvp');
		browser.waitUntil(() => {
			return browser.getTitle() === 'E3 | 3 - One step uploaded';
		}, config.app.waitTime, 'title takes more than 5 seconds to change');
		browser.waitForElement(Comment.sideBar, config.app.waitTime, 'sideBar');

		addComment.add(expectedComment);

		browser.waitForElement(Comment.firstCommentView, config.app.waitTime, 'firstCommentView');
		let actualComment = Comment.firstCommentView.getText();
		expect(actualComment).equals(expectedComment);
		browser.waitForElement(Comment.deleteComment, config.app.waitTime, 'deleteComment');
		Comment.deleteComment.click();
		let isGone = !Comment.firstCommentView.isExisting();
		expect(isGone).to.be.true;

	});

});