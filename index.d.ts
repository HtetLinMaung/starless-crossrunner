export interface PythonOptions {
    venvPath?: string;
    pythonPath?: string;
    isConda?: boolean;
}
export declare const invokePython: (scriptPath: string, message: any, options: PythonOptions) => Promise<any>;
