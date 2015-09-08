/*
 * to be commented 
 */
QUnit.module ("other Tests");
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
