browser.addCommand("waitForElement", (el, wait, errMsg) => {

	browser.waitUntil(() => {
		return el.isExisting() && el.isVisible();
	}, wait, errMsg);

})
