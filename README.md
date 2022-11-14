# Starless Cross Runner

Cross runner for communication with other languages.

## Installation

If this is a brand new project, make sure to create a package.json first with the `npm init` command.

Installation is done using the npm install command:

```
npm install starless-crossrunner
```

## Running Python Script

```js
const { invokePython } = require("starless-crossrunner");

invokePython("main.py", "Hello to python");
```

## Sending Message To Python

```js
invokePython("main.py", { name: "hlm", hobby: "coding" });
```

```py
import sys
import json

info = json.loads(sys.argv[1]) # { name: "hlm", hobby: "coding" }
```

## Receiving Result From Python

```py
import sys
import json

info = json.loads(sys.argv[1]) # { name: "hlm", hobby: "coding" }
print(info) # send result back to js
```

```js
const result = await invokePython("main.py", { name: "hlm", hobby: "coding" });
console.log(result); // { name: "hlm", hobby: "coding" }
```
