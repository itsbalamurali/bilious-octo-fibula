//this maintains mobile apps images for spalsh, quote and color for the day etc 
exports.getCurrentConfig = function(req, res) {
	res.json({
		splash: {
			images: [],
			quotes: [],
		},
		colors: {
			
		},
		urls:{
			
		}
	});
};