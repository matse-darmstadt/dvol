/*
 * Cube Constructor tests
 * 
 * These tests create cubes of different compositions and verify edibility  
 */
QUnit.module ("Cube Constructor Tests");
 
// true on all segments
QUnit.test("it's all cheese, man", function(assert) {
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	assert.propEqual(boolStruct.length, 3, "checking cheese cube dimension");
	assert.propEqual(boolStruct[0].length, 3, "checking cheese cube dimension");
	assert.propEqual(boolStruct[0][0].length, 3, "checking cheese cube dimension");
	assert.ok(boolStruct[0][0][0], "checking cheese cube value");
});

// false on all segments
QUnit.test("a cube of air", function(assert) {
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return false;
	});
	assert.propEqual(boolStruct.length, 3, "checking cheese cube dimension");
	assert.propEqual(boolStruct[0].length, 3, "checking cheese cube dimension");
	assert.propEqual(boolStruct[0][0].length, 3, "checking cheese cube dimension");
	assert.notOk(boolStruct[0][0][0], "checking cheese cube value");
});

// only top layer is cheese
QUnit.test("a slice of cheese on an air cussion", function(assert) {
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		if (z == 0) return true;
		return false;
	});
	assert.propEqual(boolStruct.length, 3, "checking cheese cube dimension");
	assert.propEqual(boolStruct[0].length, 3, "checking cheese cube dimension");
	assert.propEqual(boolStruct[0][0].length, 3, "checking cheese cube dimension");
	for (var z = 0; z < boolStruct.length; z++) {
		for (var y = 0; y < boolStruct.length; y++) {
			for (var x = 0; x < boolStruct.length; x++) {
				if (z == 0) assert.ok(boolStruct[z][y][x], "a slice of cheese");
				else assert.notOk(boolStruct[z][y][x], "just air");
			}
		}
	};
});
