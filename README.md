# codero

## API Docs

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

__NOT IMPLEMENTED__

Run JavaScript code to control the Sphero.