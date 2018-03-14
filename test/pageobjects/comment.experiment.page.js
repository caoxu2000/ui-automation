class Comment{

	get observationsTab() {
		return $('[data-tab-name="Observations"]');
	}
	get sideBar() {
		return $('.side-bar');
	}
	get addComment() { return $('textarea.add-comment'); }
	get saveComment() { return $('.save-comment'); }
	get saveReplyToComment() { return $('.save-comment.reply'); }
	get updateComment() { return $('.update-comment'); }
	get editComment() { return $('.edit-comment'); }
	get replyToComment() { return $('.reply-comment'); }
	get editCommentArea() { return $('textarea.add-comment.original'); }
	get replyToArea() { return $('.add-comment.reply'); }
	get deleteComment() { return $('.delete-comment'); }
	get firstCommentView() { return $('.content-row.comment .activity-comment.view'); }
	get replyToCommentView() { return $('.comment-reply .activity-comment.view'); }

}

export default new Comment();