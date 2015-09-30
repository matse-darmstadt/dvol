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

QUnit.assert.DiversionChecker = function (diversion, neighbours, message) {
	if (diversion.equals(neighbours)) {
		this.push(true, diversion, neighbours, message);
		return;
	}
	this.push(false, diversion, neighbours, message);
};

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
					assert.ok(cheese.pour(z, x), "allow pouring")
				}
				else {
					assert.notOk(cheese.pour(z, x), "disallow pouring")
				}
				
			}
		}
	};
});

// step has no test - ask me!
//~ QUnit.test("step", function(assert) {
	//~ var cheese = new Cheese();
	
//~ });


// testing possible paths in solid cheese cube, shouldn't return any arrays
QUnit.test("getDiversions: only cheese", function(assert) {
	var cheese = new Cheese();
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	cheese.parseBooleanStructure(boolStruct);
	for (var z = 0; z < cheese.length; z++) {
		for (var y = 0; y < cheese.length; y++) {
			for (var x = 0; x < cheese.length; x++) {
				assert.ok(cheese.getDiversions(z, y, x).length == 0, "checking for no diversions");
			}
		}
	};
});

// testing possible paths in air cube, should return all valid neighbours on every coordinate
QUnit.test("getDiversions: only air", function(assert) {
	var cheese = new Cheese();
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return false;
	});
	cheese.parseBooleanStructure(boolStruct);
	
	for (var z = 0; z < cheese.length; z++) {
		for (var y = 0; y < cheese.length; y++) {
			for (var x = 0; x < cheese.length; x++) {
				var div = cheese.getDiversions(z, y, x);
				
				// the 6 neighbour segments
				var neighbours = {	"top":true, "bottom":true, 
									"back":true, "front":true,
									"left":true, "right":true
								};
								
				// setting neighbours to false at the edges				
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
				
				assert.DiversionChecker(div, neighbours, "check diversion");	
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
					assert.ok(cheese.validatePouring(z, x), "check pouring");
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
