import { exec } from "code-alchemy/child_process";
import path from "node:path";

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

  try {
    return JSON.parse(stdout);
  } catch (err) {
    return stdout;
  }
};
