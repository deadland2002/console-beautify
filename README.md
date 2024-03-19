
# Beautify-Console

this npm package is designed to help developer have formal looking console logs.




## Installation


## Installation

```bash
  npm install @satvikshukla/beautify-console
  yarn add @satvikshukla/beautify-console
```
    
## Features

- Easy to set up for real, you can make it work in less than 10sec!
- Super easy to customize
- Professional look 👌
- Global initial configuration
- And much more !


## Example

```javascript
const {SimpleLog} = require("@satvikshukla/beautify-console")
SimpleLog.info("Hi there");
```


## SimpleLog

Simple log is a synchronous log which can use used in place of the traditional console.log() with various customizations.

```javascript
const {SimpleLog} = require("@satvikshukla/beautify-console")

SimpleLog.info("Info Log");
SimpleLog.warn("Warn log");
SimpleLog.success("Success Log");
SimpleLog.error("Error Log");
SimpleLog.log("Default Log");
```

### Output

![simpleLog]("/public/simpleLog.png")


### Customizations

```typescript
Color: "Red" | "Green" | "Yellow" | "Blue" | "Magenta" | "Cyan" | "White" | "Reset";
Type: "SUCCESS" | "ERROR" | "INFO" | "WARN" | "COMMON";
```

### Uses


```javascript
const {SimpleLog} = require("@satvikshukla/beautify-console")

SimpleLog.log("Info Green",{Color:"Green",Type:"INFO"});
SimpleLog.log("Success Red",{Color:"Red",Type:"SUCCESS"});
```
## AsyncLog

Async log is a asynchronous log which can use used to get logs in file with promises.

```javascript
const {AsyncLog} = require("@satvikshukla/beautify-console")

AsyncLog.log("AsyncLog file")
```

### Customizations
By default the path is taken as root -> Output -> AsyncLog"

```typescript
path ?: string;
type ?: "SUCCESS" | "ERROR" | "INFO" | "WARN";
delimiter ?: string;
```

### Uses


```javascript
const {AsyncLog} = require("@satvikshukla/beautify-console")

AsyncLog.log("AsyncLog Log")
AsyncLog.success("AsyncLog Success")
AsyncLog.log("AsyncLog Custom",{delimiter:"="})
```

### Output
Inside txt file.
```text
[ DEFAULT    ] : 2024-03-19T12:58:54.158Z : AsyncLog Log
[ SUCCESS    ] : 2024-03-19T12:58:54.158Z : AsyncLog Success
[ DEFAULT    ] = 2024-03-19T12:58:54.158Z = AsyncLog Custom

```