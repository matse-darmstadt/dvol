/*
 * to be commented 
 */
QUnit.module ("other Tests");
QUnit.test("parseBooleanStructure", function(assert) {
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	var parsedCheese = new Cheese();
	parsedCheese.parseBooleanStructure(boolStruct);
	for (var z = 0; z < parsedCheese.length; z++) {
		for (var y = 0; y < parsedCheese.length; y++) {
			for (var x = 0; x < parsedCheese.length; x++) {
				assert.ok(parsedCheese[z][y][x], "100% cheese");
			}
		}
	};
});
QUnit.test("pour", function(assert) {
	var boolStruct = new Cheese();
	for (var y = 0; y < boolStruct.length; y++) {
		for (var z = 0; z < boolStruct.length; z++) {
			for (var x = 0; x < boolStruct.length; x++) {
				if (boolStruct[z][y][x] === false) {
					assert.ok(boolStruct.pour(z, x), "did flow, as expected")
				}
				else {
					assert.notOk(boolStruct.pour(z, x), "didn't flow, as expected")
				}
				
			}
		}
	};
});
QUnit.test("step", function(assert) {
	var boolStruct = new Cheese();
	for (var z = 0; z < boolStruct.length; z++) {
		for (var y = 0; y < boolStruct.length; y++) {
			for (var x = 0; x < boolStruct.length; x++) {
				assert.push(boolStruct.step(z, y, x), "stepped into cheese, eww!");
			}
		}
	};
});
QUnit.test("getDiversions", function(assert) {
	var boolStruct = new Cheese();
	for (var z = 0; z < boolStruct.length; z++) {
		for (var y = 0; y < boolStruct.length; y++) {
			for (var x = 0; x < boolStruct.length; x++) {
				assert.push(boolStruct.getDiversions(z, y, x), "possible path returned");
			}
		}
	};
});
QUnit.test("validatePouring", function(assert) {
	var boolStruct = new Cheese();
	for (var y = 0; y < boolStruct.length - 1; y++) {
		for (var z = 0; z < boolStruct.length; z++) {
			for (var x = 0; x < boolStruct.length; x++) {
				if (boolStruct[z][y][x] === false) {
					assert.ok(boolStruct.validatePouring(z, x), "valid pouring");
				}
			}
		}
	};
});
QUnit.test("isInsideCheese", function(assert) {
	var boolStruct = new Cheese();
	for (var z = -1; z <= boolStruct.length; z++) {
		console.log(z);
		for (var y = -1; y <= boolStruct.length; y++) {
			console.log(z);
			for (var x = -1; x <= boolStruct.length; x++) {
				console.log(z);
				if (z < 0 || z >= boolStruct.length || y < 0 || y >= boolStruct.length || x < 0 || x >= boolStruct.length) {
					assert.notOk(boolStruct.isInsideCheese(z, y, x), "not inside cheese");
				}
				else {
					assert.ok(boolStruct.isInsideCheese(z, y, x), "inside cheese");
				}
			}
		}
	};
});
QUnit.test("isBottom", function(assert) {
	var boolStruct = new Cheese();
	for (var z = 0; z < boolStruct.length; z++) {
		for (var y = 0; y < boolStruct.length; y++) {
			for (var x = 0; x < boolStruct.length; x++) {
				if (y == boolStruct.length - 1) {
					assert.ok(boolStruct.isBottom(z, y, x), "at the bottom");
				}
				else {
					assert.notOk(boolStruct.isBottom(z, y, x), "not at the bottom");
				}
			}
		}
	};
});
