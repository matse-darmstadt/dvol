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
	parsedCheese.segments = parsedCheese.parseBooleanStructure(boolStruct);
	for (var z = 0; z < parsedCheese.segments.length; z++) {
		for (var y = 0; y < parsedCheese.segments[z].length; y++) {
			for (var x = 0; x < parsedCheese.segments[z][y].length; x++) {
				assert.ok(parsedCheese.segments[z][y][x].type, "100% cheese");
			}
		}
	};
});

// testing possible paths in solid cheese cube, shouldn't return any arrays
QUnit.test("getDiversions: only cheese", function(assert) {
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	var cheese = new Cheese(boolStruct);
	for (var z = 0; z < cheese.segments.length; z++) {
		for (var y = 0; y < cheese.segments[z].length; y++) {
			for (var x = 0; x < cheese.segments[z][y].length; x++) {
				assert.ok(cheese.getDiversions(z, y, x).length == 0, "checking for no diversions");
			}
		}
	};
});

QUnit.test("validatePouring", function(assert) {
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return !(x == 1 && z == 1);
	});
	var cheese = new Cheese(boolStruct);
	for (var z = 0; z < cheese.segments.length; z++) {
		for (var x = 0; x < cheese.segments[z][0].length; x++) {
			if (!cheese.segments[z][0][x].type) {
				assert.ok(cheese.validatePouring(z, x), "check pouring");
			}
		}
	}
});

QUnit.test("isInsideCheese", function(assert) {
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return true;
	});
	var cheese = new Cheese(boolStruct);
	for (var z = -1; z <= cheese.segments.length; z++) {
		for (var y = -1; y <= cheese.segments.length; y++) {
			for (var x = -1; x <= cheese.segments.length; x++) {
				if (z < 0 || z >= cheese.segments.length || y < 0 || y >= cheese.segments.length || x < 0 || x >= cheese.segments.length) {
					assert.notOk(cheese.isInsideCheese(z, y, x), "not inside cheese");
				}
				else {
					assert.ok(cheese.isInsideCheese(z, y, x), "inside cheese");
				}
			}
		}
	};
});

QUnit.test("pour: should work.", function(assert) {
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return !(x == 1 && z == 1);
	});
	var cheese = new Cheese(boolStruct);
	assert.ok(cheese.pour(1, 1));
});

QUnit.test("pour: should NOT work.", function(assert) {
	var boolStruct = GenerateCheese(3, function(x,y,z) {
		return !(x == 1 && z == 1 && y < 2);
	});
	var cheese = new Cheese(boolStruct);
	assert.notOk(cheese.pour(1, 1));
});

QUnit.test("performance", function (assert) {
	
	var cheeses = [];
	for (var c = 0; c != 5000; ++c)
		cheeses.push(new Cheese(GenerateCheese(rInt(3, 10), function (x, y, z) {
			var dist = rInt(1, 100);
			return rInt(0, 101) <= dist;
		})));
	
	var output = [];
	var data = [];
	for (var test = 0; test != 20; ++test) {
		
		var runs = [];
		for (var run = 0; run != 20; ++run) {
			var s = new Date();
			for (var iter = 0; iter != cheeses.length; ++iter)
				try {
					cheeses[iter].pour(0, 0);
				} catch (e) {
				}
			runs.push(new Date().getTime() - s.getTime());
		}
		var sum = 0;
		for (var i = 0; i != runs.length; ++i)
			sum += runs[i];
		var avrg = sum / runs.length;
		sum = 0;
		for (var i = 0; i != runs.length; ++i) {
			var tmp = runs[i] - avrg;
			sum += tmp * tmp;
		}
		var vari = sum / runs.length;
		var std = Math.sqrt(vari);
		
		output.push(avrg + '\t' + std);
		data.push({
			average: avrg,
			standard: std
		});
		
	}
	console.log(output.join('\n'));
	
	var canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	var unit_size = 80;
	var time_size = 40;
	
	ctx.fillStyle = '#d4d4d4';
	var right = data.length * unit_size;
	var o_x = 80;
	var o_y = -80;
	var o_ux = unit_size / 2 - 4;
		
	var f_size = time_size / 4 + 2;
	var f_half = f_size / 2;
		
	var y_size = 3;
	var y_half = 1;
	var x_size = 9;
	var x_half = 4;
	
	ctx.font = f_size + 'px serif';
	
	for (var t = (canvas.height / time_size) | 0; t != 0; --t) {
		var y = canvas.height + o_y - (t * time_size);
		
		ctx.fillText(t, o_x / 2, y - 1);
		ctx.fillRect(o_x / 2, y, right + o_x / 2, 1);
	}
	
	for (var n = 0; n != data.length; ++n) {
		var rn = (n + 1);
		
		ctx.fillStyle = '#d4d4d4';
		ctx.fillRect(rn * unit_size + o_x, o_y, 1, canvas.height);
		
		var d = data[n];
		var tmp = d.average * time_size;
		
		var x = rn * unit_size - unit_size / 2;
		var y = canvas.height - tmp;
		
		tmp = d.standard * time_size;
		
		ctx.fillStyle = '#CC2529';
		ctx.fillRect(x + o_x - 1, y + o_y - tmp, 3, tmp + tmp);
		
		ctx.fillStyle = '#3e9651';
		ctx.fillRect(x + o_x - x_half, y + o_y - y_half, x_size, y_size);
		
		ctx.fillText(d.average, x + o_x - o_ux, y + o_y - 1);
		ctx.fillRect(x + o_x - o_ux, y + o_y, o_ux, 1);
	}
	ctx.fillStyle = '#000';
	ctx.fillRect(o_x, canvas.height + o_y - 1, canvas.width, 1);
	ctx.fillRect(o_x, o_y, 1, canvas.height);
});

QUnit.test("performance: less 3 secs", function (assert) {
	var cheeses = [];
	for (var c = 0; c != 5000; ++c)
		cheeses.push(new Cheese(GenerateCheese(rInt(3, 10), function (x, y, z) {
			var dist = rInt(1, 100);
			return rInt(0, 101) <= dist;
		})));
	for (var iter = 0; iter != cheeses.length; ++iter)
		try {
			cheeses[iter].pour(0, 0);
		} catch (e) {
		}
	var runs = [];
	for (var run = 0; run != 20; ++run) {
		var s = new Date();
		for (var iter = 0; iter != cheeses.length; ++iter)
			try {
				cheeses[iter].pour(0, 0);
			} catch (e) {
			}
		runs.push(new Date().getTime() - s.getTime());
	}
	var sum = 0;
	for (var i = 0; i != runs.length; ++i) {
		//runs[i] = runs[i] / cheeses.length;
		sum += runs[i];
	}
	var avrg = sum / runs.length;
	sum = 0;
	for (var i = 0; i != runs.length; ++i) {
		var tmp = runs[i] - avrg;
		sum += tmp * tmp;
	}
	var vari = sum / runs.length;
	var std = Math.sqrt(vari);
	console.log('Average: ' + avrg);
	console.log('Varianz: ' + vari);
	console.log('Standard-deviation: ' + std);
	assert.ok(avrg < 3000);
});

function rInt (min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// function time (interval) {
	// var rounds = 0;
	// var tmp = window.setInterval(function () {
		// rounds++;
	// }, interval);
	// return function () {
		// window.clearInterval(tmp);
		// return rounds * interval;
	// };
// };
