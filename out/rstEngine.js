"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSTEngine = void 0;
const vscode = require("vscode");
const path = require("path");
class RSTEngine {
    constructor(python, logger) {
        this.python = python;
        this.logger = logger;
    }
    errorSnippet(error) {
        return `<html><body>${error}</body></html>`;
    }
    async compile(fileName, uri) {
        this.logger.log(`Compiling file: ${fileName}`);
        const rstConfig = vscode.workspace.getConfiguration('rst', uri);
        const writer = rstConfig.get('preview.docutilsWriter', 'html');
        const writerPart = rstConfig.get('preview.docutilsWriterPart', 'html_body');
        return this.python.exec(path.join(__dirname, "..", "python", "preview.py"), fileName, writer, writerPart);
    }
    async preview(doc) {
        try {
            return this.compile(doc.fileName, doc.uri);
        }
        catch (e) {
            return this.errorSnippet(String(e));
        }
    }
}
exports.RSTEngine = RSTEngine;
//# sourceMappingURL=rstEngine.js.map