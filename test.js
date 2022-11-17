const { invokePython, invokeRust } = require("./index");
const path = require("path");

async function main() {
  // const result = await invokePython(
  //   "main.py",
  //   [Number.MIN_VALUE, Number.MIN_VALUE],
  //   {
  //     venvPath: "~/miniconda",
  //     isConda: true,
  //   }
  // );
  // const result = await invokeRust(path.join(__dirname, "hello"), {
  //   message: "hello from js",
  // });
  // console.log(result);
  // const result = await invokeRust("main.rs", {
  //   message: "hello from js",
  // });
  // console.log(result);

  const result = await invokePython("main.py", {
    message: "hello from js",
  });
  console.log(result);
}
main();
