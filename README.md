# errant
Improved Error object for node.js that allows contextual data and inner exceptions with the stack trace.

Just require this as a commonjs module and use the result wherever you'd use an Error object:
```javascript
const Err = require('errant');
```

Instead of this:
```javascript
throw new Error("eeeeeeee");
```

You can now do this:
```javascript
throw new Err("eeeeeeee", data["recordThatCausedTheProblem"]);
```

Supplemental errors, complete with stack traces when available, can be provided for easy root cause analysis;
use these to add relevant context, especially for more complex scenarios like asynchronous throws or rejected promises.

```javascript
const Err = require('errant');

let data = {
  foo: 1,
  bar: Math.PI,
  baz: NaN
};
try {
  for (let property in data) {
    if (data[property] !== data[property]) {
      let context = {};
      context[property] = data[property];
      throw new Err("Value is not equal to itself", context);
    }
  }
}
catch (e) {
  throw new Err("catch", data, e);
}
```

Result (may vary based on REPL or debugging environment):
```
  throw new Err("catch", data, e);
  ^

Error: catch
    at Object.<anonymous> (.../file.js:18:9)
    at Module._compile (internal/modules/cjs/loader.js:675:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:689:10)
    at Module.load (internal/modules/cjs/loader.js:589:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:528:12)
    at Function.Module._load (internal/modules/cjs/loader.js:520:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:719:10)
    at startup (internal/bootstrap/node.js:228:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:576:3)
Data: { foo: 1, bar: 3.141592653589793, baz: NaN }
Error: Value is not equal to itself
    at Object.<anonymous> (.../file.js:13:13)
    at Module._compile (internal/modules/cjs/loader.js:675:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:689:10)
    at Module.load (internal/modules/cjs/loader.js:589:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:528:12)
    at Function.Module._load (internal/modules/cjs/loader.js:520:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:719:10)
    at startup (internal/bootstrap/node.js:228:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:576:3)
Data: { baz: NaN }
```
