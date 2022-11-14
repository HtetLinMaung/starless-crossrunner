"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokePython = void 0;
const child_process_1 = require("code-alchemy/child_process");
const node_path_1 = __importDefault(require("node:path"));
const invokePython = (scriptPath, message = {}, options) => __awaiter(void 0, void 0, void 0, function* () {
    const defaultOptions = Object.assign({ venvPath: "", pythonPath: "", isConda: false }, options);
    let cmd = `${defaultOptions.pythonPath || "python"} ${scriptPath} ${typeof message == "string" ? message : JSON.stringify(message)}`;
    if (defaultOptions.venvPath) {
        cmd = `source ${node_path_1.default.join(defaultOptions.venvPath, "bin", "activate")} && ${cmd} && ${defaultOptions.isConda ? "conda deactivate" : "deactivate"}`;
    }
    const { stdout, stderr } = yield (0, child_process_1.exec)(cmd);
    if (stderr) {
        throw new Error(stderr);
    }
    try {
        return JSON.parse(stdout);
    }
    catch (err) {
        return stdout;
    }
});
exports.invokePython = invokePython;
