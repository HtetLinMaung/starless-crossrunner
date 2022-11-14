const { invokePython } = require("./index");
const path = require("path");

async function main() {
  const result = await invokePython(
    "main.py",
    [Number.MIN_VALUE, Number.MIN_VALUE],
    {
      venvPath: "~/miniconda",
      isConda: true,
    }
  );
  console.log(result);
}
main();
