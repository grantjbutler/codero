# codero

Codero was created in order to teach beginners computer programming concepts through a visual based programming 
environment. This project was first started as an entry in AT&T's hackathon on 4/19/2013 where we took 3rd place for
our project idea and implementation. Future aspects of this project are going to include control structures such as conditionals and loops in
order to teach these imperative concepts. 

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
