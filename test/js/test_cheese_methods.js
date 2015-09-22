/*
 * testing methods of the cheese class
 */
QUnit.module ("Method Tests");

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}  

QUnit.test("array equals", function(assert) {
	var test = [1, 2, 3];
	assert.ok(test.equals([1, 2, 3]), "array test SUCCESS");
});

QUnit.assert.arrayContains = function (haystack, needle, message) {
    for (var key in haystack) {
		if (haystack[key] instanceof Array) {
			if (haystack[key].equals(needle)) {
				this.push( true, haystack, needle, message );
				return;
			}
		} else if (haystack[key] === needle) {
			this.push( true, haystack, needle, message );
			return;
		}
	}
    this.push( false, haystack, needle, message );
};

QUnit.test("array contains", function(assert) {
	var test = [1, 2, 3];
	assert.arrayContains(test, 2, "array test");
	
	test = [[], [1,2], [3,4]];
	assert.arrayContains(test, [1,2], "array test");
});

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
	var cheese = new Cheese();
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	cheese.parseBooleanStructure(boolStruct);
	for (var y = 0; y < cheese.length; y++) {
		for (var z = 0; z < cheese.length; z++) {
			for (var x = 0; x < cheese.length; x++) {
				if (cheese[z][y][x] === false) {
					assert.ok(cheese.pour(z, x), "did flow, as expected")
				}
				else {
					assert.notOk(cheese.pour(z, x), "didn't flow, as expected")
				}
				
			}
		}
	};
});

QUnit.test("step", function(assert) {
	var cheese = new Cheese();
	for (var z = 0; z < cheese.length; z++) {
		for (var y = 0; y < cheese.length; y++) {
			for (var x = 0; x < cheese.length; x++) {
				assert.push(cheese.step(z, y, x), "stepped into cheese, eww!");
			}
		}
	};
});

QUnit.test("getDiversions 1", function(assert) {
	var cheese = new Cheese();
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	cheese.parseBooleanStructure(boolStruct);
	for (var z = 0; z < cheese.length; z++) {
		for (var y = 0; y < cheese.length; y++) {
			for (var x = 0; x < cheese.length; x++) {
				assert.ok(cheese.getDiversions(z, y, x).length == 0, "empty path: ok");
			}
		}
	};
});

QUnit.test("getDiversions 2", function(assert) {
	var cheese = new Cheese();
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return false;
	});
	cheese.parseBooleanStructure(boolStruct);
	
	for (var z = 0; z < cheese.length; z++) {
		for (var y = 0; y < cheese.length; y++) {
			for (var x = 0; x < cheese.length; x++) {
				var div = cheese.getDiversions(z, y, x);
				var neighbours = {	"top":true, "bottom":true, 
									"back":true, "front":true,
									"left":true, "right":true
								};
				switch (z) {
					case 0:
						neighbours["top"] = false;
					
					case cheese.length - 1:
						neighbours["bottom"] = false;
						break;
					}
				switch (y) {
					case 0:
						neighbours["back"] = false;
					case cheese.length - 1:
						neighbours["front"] = false;
				}
				switch (x) {
					case 0:
						neighbours["left"] = false;
					case cheese.length - 1:
						neighbours["right"] = false;
				}
				
				switch (neighbours) {
					case 0:
						if (z != cheese.length) {
							assert.arrayContains(div, cheese[z][y1][x1], "array test");
						}
					case cheese.length - 1:
						bottom = false;
						break;
					default:
						top = true;
						bottom = true;
					}
				switch (y) {
					case 0:
						back = false;
					case cheese.length - 1:
						front = false;
						break;
					default:
						back = true;
						front = true;
				}
				switch (x) {
					case 0:
						left = false;
					case cheese.length - 1:
						right = false;
						break;
					default:
						left = true;
						right = true;
				}		
				
				
				assert.arrayContains(div, cheese[z1][y1][x1], "array test");
			}
		}
	};
});

QUnit.test("validatePouring", function(assert) {
	var cheese = new Cheese();
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	cheese.parseBooleanStructure(boolStruct);
	for (var y = 0; y < cheese.length - 1; y++) {
		for (var z = 0; z < cheese.length; z++) {
			for (var x = 0; x < cheese.length; x++) {
				if (cheese[z][y][x] === false) {
					assert.ok(cheese.validatePouring(z, x), "valid pouring");
				}
			}
		}
	};
});

QUnit.test("isInsideCheese", function(assert) {
	var cheese = new Cheese();
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	cheese.parseBooleanStructure(boolStruct);
	for (var z = -1; z <= cheese.length; z++) {
		console.log(z);
		for (var y = -1; y <= cheese.length; y++) {
			console.log(z);
			for (var x = -1; x <= cheese.length; x++) {
				console.log(z);
				if (z < 0 || z >= cheese.length || y < 0 || y >= cheese.length || x < 0 || x >= cheese.length) {
					assert.notOk(cheese.isInsideCheese(z, y, x), "not inside cheese");
				}
				else {
					assert.ok(cheese.isInsideCheese(z, y, x), "inside cheese");
				}
			}
		}
	};
});

QUnit.test("isBottom", function(assert) {
	var cheese = new Cheese();
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	cheese.parseBooleanStructure(boolStruct);
	for (var z = 0; z < cheese.length; z++) {
		for (var y = 0; y < cheese.length; y++) {
			for (var x = 0; x < cheese.length; x++) {
				if (y == cheese.length - 1) {
					assert.ok(cheese.isBottom(z, y, x), "at the bottom");
				}
				else {
					assert.notOk(cheese.isBottom(z, y, x), "not at the bottom");
				}
			}
		}
	};
});
