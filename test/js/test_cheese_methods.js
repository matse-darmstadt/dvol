/*
 * to be commented 
 */
QUnit.module ("other Tests");
QUnit.test("parseBooleanStructure", function(assert) {
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	var parsedCheese = Cheese.parseBooleanStructure(boolStruct);
	for (var z = 0; z < parsedCheese.length; z++) {
		for (var y = 0; y < parsedCheese.length; y++) {
			for (var x = 0; x < parsedCheese.length; x++) {
				assert.ok(parsedCheese[z][y][x], "100% cheese");
			}
		}
	};
});
QUnit.test("pour", function(assert) {
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	for (var y = 0; y < boolStruct.length; y++) {
		for (var z = 0; z < boolStruct.length; z++) {
			for (var x = 0; x < boolStruct.length; x++) {
				if (boolStruct[z][y][x] === true) {
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
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	for (var z = 0; z < boolStruct.length; z++) {
		for (var y = 0; y < boolStruct.length; y++) {
			for (var x = 0; x < boolStruct.length; x++) {
				assert.push(boolStruct.step(z, y, x), "stepped into cheese, eww!");
			}
		}
	};
});
QUnit.test("getDiversions", function(assert) {
	assert.ok(new Cheese().getDiversions != undefined, "Exists")
});
QUnit.test("validatePouring", function(assert) {
	assert.ok(new Cheese().validatePouring != undefined, "Exists")
});
QUnit.test("isInsideCheese", function(assert) {
	assert.ok(new Cheese().isInsideCheese != undefined, "Exists")
});
QUnit.test("isBottom", function(assert) {
	assert.ok(new Cheese().isBottom != undefined, "Exists")
});
