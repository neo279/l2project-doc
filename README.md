# Welcome to L2Project Documentation

Documentation wanted! Join us on [GitHub](https://github.com/neo279/l2project-doc)!

## About L2Project Script Engine

L2Project uses plain [V8](https://v8.dev/) - JavaScript engine provided by [ClearScript](https://github.com/microsoft/ClearScript), V8 is widely used JavaScript engine by Chrome Web Brower and Node.JS platform.

As L2Project is only using V8, many things that are common to web browsers or Node.JS platform are not available. Common things you may use in JS such as DOM elements or Node.JS modules are simply not there, even something like `setTimeout`, `console.log` is not available in plain V8, but don't worry it's availabe in L2Project, but it uses custom (in-house, much simpler) implementation, you might not even notice. Good example of what you won't find in L2Project script engine are [events](https://nodejs.org/api/events.html#events), but they are [easy](https://github.com/browserify/events) to implement if needed.

You can expect [ECMAScript](https://tc39.es/ecma262/) to work flawlessly.

JavaScript really fits well for scripting L2 and better, you can even write scripts using [TypeScript](https://www.typescriptlang.org/), you can write tests for your scripts, you can run different preprocessors on your code. Whole world of [npm](https://www.npmjs.com/) packages is available to you (not all of them will work).

### Using TypeScript and L2Project Type definitions

See [examples/typescript](examples/typescript).

### Using TypeScript and ESBuild for writting scripts

[esbuild](https://github.com/evanw/esbuild) is great for building TypeScript code and guess what, it does support "neutral" platform, it can also bundle your dependencies into a single file and watch for changes as you write your script, fyi. L2Project automaticaly reloads your script if it changes, that makes really nice dev workflow.

esbuild supports TypeScript files by default, so you don't have to do anything. [VSCode](https://code.visualstudio.com/) is strongly suggested when you are working with JS/TS.

Suggested esbuild options to use:

- [`--platform=neutral`](https://esbuild.github.io/api/#platform)
  - [`--main-fields=module,main`](https://esbuild.github.io/api/#main-fields)
- [`--bundle`](https://esbuild.github.io/api/#bundle) (outputs single file)
- [``--define:process.env.NODE_ENV="\`"production\`""``](https://esbuild.github.io/api/#define) (some of the libraries are checking for this, eg. [xstate](https://xstate.js.org/))
  - watch out for `"production"` escaping as int this example it's escaped for [PowerShell](https://docs.microsoft.com/en-us/powershell/)
- [`--define:global=globalThis`](https://esbuild.github.io/api/#define) (some of the libraries are using [global](https://nodejs.org/api/globals.html#global), eg. [xstate](https://xstate.js.org/))

#### Example for PowerShell

```powershell
npx esbuild --platform=neutral --bundle --main-fields=module,main .\index.ts --outfile=bundle.js --define:process.env.NODE_ENV="\`"production\`"" --define:global=globalThis
```

## Examples

### Hello World example!
```js
// async functions cannot be run on the top level, you must wrap them inside the closure
(async () => {
    await sleep(1000);
    console.log('Hello World'); // Will show "Hello World!" in L2Project JS Console window, after 1s.
})().catch(err => console.error(err.stack)); // When something fails withtin the closure function above, you would not know without this log statement.
```
