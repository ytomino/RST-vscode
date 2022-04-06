"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Python = void 0;
const vscode = require("vscode");
const child_process_1 = require("child_process");
class Python {
    constructor(logger) {
        this.logger = logger;
        this.version = null;
        this.pythonPath = vscode.workspace
            .getConfiguration("rst", null)
            .get("preview.pythonPath", "python");
        this.ready = false;
        this.setup();
    }
    isReady() {
        return this.ready;
    }
    async awaitReady() {
        return new Promise((res, rej) => {
            const int = setInterval(() => {
                if (this.ready) {
                    clearInterval(int);
                    res();
                }
            }, 500);
        });
    }
    async setup() {
        await this.getVersion();
        if (!(await this.checkDocutilsInstall())) {
            await this.installDocutils();
        }
        this.ready = true;
    }
    async installDocutils() {
        try {
            await this.exec("-m", "pip", "install", "docutils");
        }
        catch (e) {
            this.logger.log("Failed to install docutils");
            vscode.window.showErrorMessage("Could not install docutils. Please run `pip install docutils` to use this " +
                "extension, or check your python path.");
        }
    }
    async checkDocutilsInstall() {
        try {
            await this.exec("-c", '"import docutils;"');
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async getVersion() {
        if (this.version !== null) {
            return;
        }
        const version = await this.exec("-c", '"import sys; print(sys.version_info[0])"');
        switch (Number.parseInt(version)) {
            case 2:
                this.version = 2;
                return;
            case 3:
                this.version = 3;
                return;
            default:
                throw new Error("Could not get python version");
        }
    }
    exec(...args) {
        const cmd = [this.pythonPath, ...args];
        return new Promise((resolve, reject) => {
            this.logger.log(`Running cmd: python ${args.join(" ")}`);
            (0, child_process_1.exec)(cmd.join(" "), (error, stdout, stderr) => {
                if (error) {
                    let errorMessage = [
                        error.name,
                        error.message,
                        error.stack,
                        "",
                        stderr.toString()
                    ].join("\n");
                    this.logger.log(errorMessage);
                    reject(errorMessage);
                }
                else {
                    this.logger.log("Successful exec", stdout.toString());
                    resolve(stdout.toString());
                }
            });
        });
    }
}
exports.Python = Python;
//# sourceMappingURL=python.js.map