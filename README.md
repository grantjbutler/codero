# codero

## API Docs

**NEEDS TO BE CHANGED TO REFLECT SOCKET.IO IMPLEMENTATION**

### GET /api/blocks

Returns an array of objects describing a block.

### POST /api/run

Runs a sequence of blocks.

Data Format:

	[
		{
			"type": "go-forward",
			"id": "<RANDOMLY GENERATED ID>",
			"params": {
				"time": 2
			}
		}
	]

### POST /api/execute

**NOT IMPLEMENTED**

Run JavaScript code to control the Sphero.