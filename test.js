function run_all_tests() {
	QUnit.test( "hello test", function( assert ) {
		assert.ok( 1 == "1", "Passed!" );
	});
}
run_all_tests();