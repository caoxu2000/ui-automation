browser.execute(/*Create an input element*/);
browser.setValue(".that-input-el", "your paste data");
browser.addValue(".that-input-el", ["Control", "c"]);
browser.execute(/*Remove the input element*/);


I have an List item (md-virutal-repeat) without any unique identifiers, however this element contains a span which has a unique name, how do I click the parant of this span?
you first query that span and then the parent like
const span = $(“.md-virtual-repeat span[name=’some name']”)
const parent = span.$(“..")