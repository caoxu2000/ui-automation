import Comment from '../pageobjects/comment.experiment.page';
import waitForElement from '../helpers/wait_for_element';
const config = require('config');


class addComment {

	add(comment) {
		browser.waitForElement(Comment.observationsTab, config.app.waitTime, 'wait for observationsTab');
		Comment.observationsTab.click();
		Comment.addComment.setValue(comment);
		browser.waitForElement(Comment.saveComment, config.app.waitTime, 'wait for saveComment');
		Comment.saveComment.click();
		browser.waitForElement(Comment.firstCommentView, config.app.waitTime, 'wait for firstCommentView');
	}

}

export default new addComment();