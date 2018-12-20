const Application = require('spectron').Application

function clickNewButton() {
  document.querySelector('search-field')
    .shadowRoot
    .querySelector('.new-button')
    .click()
}

app = new Application({...})
app.client.execute(clickNewButton)