import Page from './page';

class ContextMenu extends Page {

	get layers() { return $('.layers'); }
	get canvas() { return $('.canvas'); }

	get moveToTrash() {
		return $('a*=Move to Trash');
	}
	get restore() { return $('a*=Restore'); }
	get removeFromMyLibrary() {
		return $('a*=Remove from my library');
	}
	get deletePermanently() {
		return $('a*=DeletePermanently');
	}
	get addOrRemove() {
		return $('a*=Add/Remove Tag');
	}

	get tagName() {
		return $('input.search-box');
	}

	get tagUpdateBtn() {
		return $('button.tag-button');
	}

	get tagPill() { return $('.tag-pill'); }
	get tagsTitle() { return $('.no-hover.title'); }
	get removeTag() { return $('.remove-review-pill'); }

}

export default new ContextMenu();