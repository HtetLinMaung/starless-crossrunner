import { exec } from "code-alchemy/child_process";
import path from "node:path";
import fs from "node:fs";
export interface PythonOptions {
  venvPath?: string;
  pythonPath?: string;
  isConda?: boolean;
}

export const invokePython = async (
  scriptPath: string,
  message: any = {},
  options: PythonOptions
) => {
  const defaultOptions: PythonOptions = {
    venvPath: "",
    pythonPath: "",
    isConda: false,
    ...options,
  };

  let cmd = `${defaultOptions.pythonPath || "python"} ${scriptPath} ${
    typeof message == "string" ? message : JSON.stringify(message)
  }`;
  if (defaultOptions.venvPath) {
    if (process.platform == "win32") {
      cmd = ` ${path.join(
        ".",
        defaultOptions.venvPath,
        "Scripts",
        "Activate"
      )} && ${cmd} && ${
        defaultOptions.isConda ? "conda deactivate" : "deactivate"
      }`;
    } else {
      cmd = `source ${path.join(
        defaultOptions.venvPath,
        "bin",
        "activate"
      )} && ${cmd} && ${
        defaultOptions.isConda ? "conda deactivate" : "deactivate"
      }`;
    }
  }

  const { stdout, stderr } = await exec(cmd);

  if (stderr) {
    throw new Error(stderr);
  }

  const stdouts = stdout.includes("\n")
    ? stdout.split("\n").filter((s) => s)
    : [stdout];
  if (stdouts.length > 1) {
    return stdouts.map((stdout) => {
      try {
        return JSON.parse(stdout);
      } catch (err) {
        return stdout;
      }
    });
  } else {
    try {
      return JSON.parse(stdouts[0]);
    } catch (err) {
      return stdout;
    }
  }
};

// export interface RustOptions {
//   cargoTomlPath?: string;
// }

export const invokeRust = async (
  scriptOrFolderPath: string,
  message: any = {}
) => {
  // const defaultOptions: RustOptions = {
  //   ...options,
  // };
  let cmd = "";
  if (fs.statSync(scriptOrFolderPath).isDirectory()) {
    cmd = `cargo run --release ${
      typeof message == "string"
        ? " -- " + message
        : " -- " + JSON.stringify(message)
    }`;
  } else {
    cmd = `rustc ${scriptOrFolderPath} && ${
      process.platform == "win32" ? ".\\" : "./"
    }${path
      .basename(scriptOrFolderPath)
      .replace(path.extname(scriptOrFolderPath), "")} ${
      typeof message == "string" ? message : JSON.stringify(message)
    }`;
  }

  const { stdout, stderr } = await exec(cmd, {
    cwd: fs.statSync(scriptOrFolderPath).isDirectory()
      ? scriptOrFolderPath
      : process.cwd(),
  });

  // if (stderr) {
  //   throw new Error(stderr);
  // }
  const stdouts = stdout.includes("\n")
    ? stdout.split("\n").filter((s) => s)
    : [stdout];
  if (stdouts.length > 1) {
    return stdouts.map((stdout) => {
      try {
        return JSON.parse(stdout);
      } catch (err) {
        return stdout;
      }
    });
  } else {
    try {
      return JSON.parse(stdouts[0]);
    } catch (err) {
      return stdout;
    }
  }
};
