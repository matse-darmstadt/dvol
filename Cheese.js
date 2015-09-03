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
	
	
	
}).prototype = {
	
	/// @fn parseBooleanStructure
	/// @brief Parses a threedimensional array (see structure-param of Cheese-class) into an array which holds air- or cheese-segments.
	///
	/// @param structure
	/// @brief see structure-param of Cheese-class.
	///
	/// @return Array
	/// @brief A threedimensional array which contains the cheese- and air-segments.
	parseBooleanStructure: function (structure) {
	
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
	/// @param m
	/// @brief The capacity of water-segments which flow into the cheese. (default: 1)
	///
	/// @return Boolean
	/// @brief Indicates whether the water flew through the cheese or not.
	pour: function (z, x) {
		
	},
	
	/// @fn step
	/// @brief Represents a step in the simulation.
	step: function (z, y, x) {
	
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
	
	},
	
	/// @fn validatePouring
	/// @brief Validates that the pouring point is on the top surface of the cheese.
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
		
	}
	
};