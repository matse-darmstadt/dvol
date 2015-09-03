/*
 * testing a cube 
 */
QUnit.test("Test GenerateCheese", function(assert) {
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	assert.propEqual(boolStruct.length, 3, "checking cheese cube dimension");
	assert.propEqual(boolStruct[0].length, 3, "checking cheese cube dimension");
	assert.propEqual(boolStruct[0][0].length, 3, "checking cheese cube dimension");
	assert.ok(boolStruct[0][0][0], "checking cheese cube value");
});

QUnit.test("parseBooleanStructure", function(assert) {
	assert.ok(new Cheese().parseBooleanStructure != undefined,
			"check if object.function exists")
});
QUnit.test("pour", function(assert) {
	assert.ok(new Cheese().pour != undefined, "Exists")
});
QUnit.test("step", function(assert) {
	assert.ok(new Cheese().step != undefined, "Exists")
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

// var iMax = 20;
// var jMax = 10;
// var f = new Array();
//
// for (i=0;i<iMax;i++) {
// f[i]=new Array();
// for (j=0;j<jMax;j++) {
// f[i][j]=0;
// }
// }
