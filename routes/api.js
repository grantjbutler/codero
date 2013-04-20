exports.blocks = function(req, res) {
	res.json([
		{
			name: "Go Forward",
			id: "go-forward",
			type: "command",
			label: "Method"
			panels: [
				{
					title: "Time",
					params: [
						label: "Seconds"
						name: "time",
						type: "field",
					]
				},
				{
					title: "Rotations",
					params: [
						label: "Rotations",
						name: "rotation",
						type: "field"
					]
				},
				{
					title: "Indefinitely",
				}
			]
		},
		{
			name: "Go Backward",
			id: "go-backward",
			type: "command",
			label: "Method"
			panels: [
				{
					title: "Time",
					params: [
						label: "Seconds"
						name: "time",
						type: "field",
					]
				},
				{
					title: "Rotations",
					params: [
						label: "Rotations",
						name: "rotation",
						type: "field"
					]
				},
				{
					title: "Indefinitely",
				}
			]
		},
		{
			name: "Stop",
			id: "stop",
			type: "command"
		},
		{
			name: "Turn Left",
			id: "turn-left",
			type: "command",
			label: "Method"
			panels: [
				{
					title: "Time",
					params: [
						label: "Seconds"
						name: "time",
						type: "field",
					]
				},
				{
					title: "Heading",
					params: [
						label: "Degrees",
						name: "heading",
						type: "field"
					]
				},
				{
					title: "Indefinitely",
				}
			]
		},
		{
			name: "Turn Right",
			id: "turn-right",
			type: "command",
			label: "Method"
			panels: [
				{
					title: "Time",
					params: [
						label: "Seconds"
						name: "time",
						type: "field",
					]
				},
				{
					title: "Heading",
					params: [
						label: "Degrees",
						name: "heading",
						type: "field"
					]
				},
				{
					title: "Indefinitely",
				}
			]
		}
	]);
};

exports.run = function(req, res, sphero) {
	
};