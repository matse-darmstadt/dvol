/// @class Cheese
/// @brief Represents a cheese which is made of cheese- and air-segments.
///
/// @param structure
/// @brief A threedimensional array like this:
///		[ <-- The cheese array, which holds the z-layers
///			[ <-- A z-layer Z: 0
///				[ false, true, true ], <-- X: 0 - 2, Y: 0
///				[ true, false, false ], <-- X: 0 - 2, Y: 1
///				[ true, true, true ]  <-- X: 0 - 2, Y: 2
///			],
///			[ <-- Z: 1
///				[ false, false, true ],
///				[ true, false, false ],
///				[ true, false, true ]
///			],
///			[ <-- Z: 2
///				[ false, false, true ],
///				[ true, false, false ],
///				[ true, false, true ]
///			]
///		]
///		
/// 	true -> cheese
/// 	false -> air
/// 	
///		Access:
///			array[z][y][x] = true | false
(Cheese = function (structure) {
	
	if (structure == void 0)
		return;
	
	if (!(structure instanceof Array))
		throw 'Cheese -> ArgumentException: structure';
	
	this.structure = structure;
	
	this.segments = this.parseBooleanStructure(this.structure);
	
}).prototype = {
	
	structure: null,
	
	segments: null,
	
	/// @fn parseBooleanStructure
	/// @brief Parses a threedimensional array (see structure-param of Cheese-class) into an array which holds air- or cheese-segments.
	///
	/// @param structure
	/// @brief see structure-param of Cheese-class.
	///
	/// @return Array
	/// @brief A threedimensional array of the same sizes as the input array which contains segments representing air or cheese.
	/// 	A segment is an object which holds the following properties:
	///			type -> Indicates whether the segment is cheese or air (true/false).
	parseBooleanStructure: function (structure) {
		
		if (!(structure instanceof Array))
			throw 'parseBooleanStructure -> ArgumentException: structure';
		
		var parsedArray = new Array(structure.length);
		
		for (var zIndex = 0; zIndex < structure.length; zIndex++) {
		
			if (!(structure[zIndex] instanceof Array))
				throw 'parseBooleanStructure -> ArgumentException: structure[' + zIndex + ']';
			
			parsedArray[zIndex] = new Array(structure[zIndex].length);
			
			for (var yIndex = 0; yIndex < structure[zIndex].length; yIndex++) {
			
				if (!(structure[zIndex][yIndex] instanceof Array))
					throw 'parseBooleanStructure -> ArgumentException: structure[' + zIndex + '][' + yIndex + ']';
				
				parsedArray[zIndex][yIndex] = new Array(structure[zIndex][yIndex].length);
				
				for (var xIndex = 0; xIndex < structure[zIndex][yIndex].length; xIndex++)
					parsedArray[zIndex][yIndex][xIndex] = {
					
						type: !!structure[zIndex][yIndex][xIndex],
						
						visited: false
					
					};
			
			}
			
		}
		
		return parsedArray;
		
	},
	
	/// @fn pour
	/// @brief Simulates a water flow from a start position. The given coordinates have to point to an air-segment at the surface of the cheese.
	/// 
	/// @param z
	/// @brief The z coordinate where the water flows into the cheese.
	/// 
	/// @param x
	/// @brief The x coordinate where the water flows into the cheese.
	///
	/// @return Boolean
	/// @brief Indicates whether the water flew through the cheese or not.
	pour: function (z, x) {
		
		if (!this.validatePouring(z, x))
			throw 'pour -> ArgumentException: z, x';
		
		return this.step(z, 0, x);
		
	},
	
	/// @fn step
	/// @brief Represents a step in the simulation.
	step: function (z, y, x) {
	
		if (!this.isInsideCheese(z, y, x))
			throw 'step -> ArgumentException: z, y, x';
	
		if (this.segments[z][y][x].visited)
			return false;
		this.segments[z][y][x].visited = true;
	
		if (y == this.segments[z].length - 1)
			return true;
	
		var diversions  = this.getDiversions(z, y, x);
		
		if (diversions.length == 0)
			return false;
		
		var orderedDiversions = this.orderDiversions(diversions, {
		
			z: z,
			
			y: y,
			
			x: x
		
		});
		
		for (var index = 0; index < orderedDiversions.length; index++) {
			
			var d = orderedDiversions[index];
			
			if (this.step(d.z, d.y, d.x))
				return true;
		
		}
	
		return false;
	
	},
	
	/// @fn orderDiversions
	/// @brief Returns the given diversions ordered by prioraty, which means bottom comes first and top last.
	///
	/// @param diversions
	/// @brief An array of coordinates which represent the diversions.
	///
	/// @param center
	/// @brief The coordinates which represent the center of the diversions.
	///
	/// @return Array
	/// @brief An array which contains the diversions in the priorized order.
	orderDiversions: function (diversions, center) {
	
		if (!(diversions instanceof Array))
			throw 'orderDiversions -> ArgumentException: diversions';
	
		var orderedDiversions = new Array(diversions.length);
	
		var bottomIndex = -1, topIndex = -1;
	
		for (var index = 0; index < diversions.length; index++) {
		
			var d = diversions[index];
			
			if (d.x != center.x || d.z != center.z)
				continue;
			
			if (d.y == center.y - 1) {
			
				orderedDiversions[0] = d;
			
				bottomIndex = index;
			
			} else if (d.y == center.y + 1) {
			
				orderedDiversions[orderedDiversions.length - 1] = d;
				
				topIndex = index;
			
			}
		
		}
		
		var count = bottomIndex != -1 ? 1 : 0;
		
		for (var index = 0; index < diversions.length; index++)
			if (index != bottomIndex && index != topIndex) {
				
				orderedDiversions[count] = diversions[index];
				
				count++;
				
			}
		
		return orderedDiversions;
	
	},
	
	/// @fn getDiversions
	/// @brief Returns the possible directions from a specific coordinate, where water can flow.
	/// 
	/// @param z
	/// @brief The z coordinate from where the water comes.
	/// 
	/// @param x
	/// @brief The x coordinate from where the water comes.
	///
	/// @return Array
	/// @brief An array of coordinates where the water can flow.
	getDiversions: function (z, y, x) {
	
		var diversions = [];
		
		for (var i = 0; i < 6; i++) {
		
			var pos = i >> 1;
			
			var factor = 1 - 2 * (i & 1);
			
			var dy = pos % 2;
			
			var dz = (pos / 2) | 0;
			
			var _x = x + !(dy ^ dz) * -factor;
			
			var _y = y + dy * factor;
			
			var _z = z + dz * factor;
			
			if (!this.isInsideCheese(_z, _y, _x))
				continue;
			
			if (!this.segments[_z][_y][_x].type)
				diversions.push({
				
					z: _z,
					
					y: _y,
					
					x: _x
				
				});
		
		}
	
		return diversions;
	
	},
	
	/// @fn validatePouring
	/// @brief Validates that the pouring point is on the top surface of the cheese and that the segment at the pouring point represents air.
	/// 
	/// @param z
	/// @brief The z coordinate from where the water comes.
	/// 
	/// @param x
	/// @brief The x coordinate from where the water comes.
	///
	/// @return Boolean
	/// @brief Indicates if the pouring point is valid.
	validatePouring: function (z, x) {
		
		if (this.segments == void 0)
			throw 'validatePouring -> InvalidOperationException';
		
		if (z < 0 || z >= this.segments.length)
			throw 'validatePouring -> IndexOutOfRangeException: z = ' + z;
		
		if (x < 0 || x >= this.segments[z][0].length)
			throw 'validatePouring -> IndexOutOfRangeException: x = ' + x;
		
		return !this.segments[z][0][x].type;
		
	},
	
	/// @fn isInsideCheese
	/// @brief Returns if the given coordinates are inside the cheese.
	/// 
	/// @param z
	/// @brief The z coordinate from where the water comes.
	/// 
	/// @param y
	/// @brief The y coordinate from where the water comes.
	/// 
	/// @param x
	/// @brief The x coordinate from where the water comes.
	///
	/// @return Boolean
	/// @brief Indicates whether the coordinates represent an element in the cheese or not.
	isInsideCheese: function (z, y, x) {
		
		if (z < 0 || y < 0 || x < 0)
			return false;
		
		if (z >= this.segments.length)
			return false;
		
		if (y >= this.segments[z].length)
			return false;
		
		if (x >= this.segments[z][y].length)
			return false;
		
		return true;
		
	}
	
};

function GenerateCheese (dim, segmentTypeSelector) {
	
	var boolStruct = new Array(dim);

	for (var z = 0; z < dim; z++) {
		boolStruct[z] = new Array(dim);		
		for (var y = 0; y < dim; y++) {
			boolStruct[z][y] = new Array(dim);
			for (var x = 0; x < dim; x++) {
				boolStruct[z][y][x] = segmentTypeSelector(x,y,z);
			}
		}
	}
	return boolStruct;
}
