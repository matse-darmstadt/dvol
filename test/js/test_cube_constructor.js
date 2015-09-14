/*
 * Cube Constructor tests
 * 
 * These tests create cubes of different compositions and verify edibility  
 */
QUnit.module ("Cube Constructor Tests");
QUnit.test("Test GenerateCheese", function(assert) {
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	assert.propEqual(boolStruct.length, 3, "checking cheese cube dimension");
	assert.propEqual(boolStruct[0].length, 3, "checking cheese cube dimension");
	assert.propEqual(boolStruct[0][0].length, 3, "checking cheese cube dimension");
	assert.ok(boolStruct[0][0][0], "checking cheese cube value");
});
