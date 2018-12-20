import LoginPage from '../pageobjects/login.page';
const config = require('config');


describe('FF Actions api Test', () => {

 	before(() => {
		LoginPage.login(config.app.admin.username, config.app.admin.password);
	});

	it('should work', () => {

		$('.input-search.form-control').click();
		browser.actions([{
			"actions": [
				{
					"type": "pointer",
					"id": "mouse1",
					"parameters": { "pointerType": "mouse"},
					"actions": [
						{
							"type": "pointerMove",
							"duration": 400,
							"x": 500,
							"y": 500
						},
						{"type": "pointerDown", "button": 0},
						{"type": "pause", "duration": 500},
						{"type": "pointerMove", "duration": 1000, "origin": "pointer", "x": -50, "y": 0},
						{"type": "pointerUp", "button": 0}
					]
				}
			]
 		}]);

		browser.actions();
	});

});