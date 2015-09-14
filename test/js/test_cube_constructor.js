/*
 * Cube Constructor tests
 * 
 * These tests create cubes of different compositions and verify edibility  
 */
 
// true on all segments
QUnit.module ("Cube Constructor Tests");
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
