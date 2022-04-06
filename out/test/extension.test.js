"use strict";
//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'assert' provides assertion methods from node
const assert = require("assert");
const rstEngine_1 = require("../rstEngine");
const path = require("path");
const fs = require("fs");
const initialize_1 = require("./initialize");
const python_1 = require("../python");
// Defines a Mocha test suite to group tests of similar kind together
let engine;
let python;
let logger = {
    log: () => void 0,
    updateConfiguration: () => void 0
};
suite("Extension Tests", function () {
    suiteSetup(async function () {
        this.timeout(30000);
        try {
            await (0, initialize_1.initialize)();
            python = new python_1.Python(logger);
            await python.awaitReady();
            engine = new rstEngine_1.RSTEngine(python, logger);
        }
        catch (e) {
            throw e;
        }
    });
    suiteTeardown(function (done) {
        (0, initialize_1.closeActiveWindows)().then(done, done);
    });
    teardown(function (done) {
        (0, initialize_1.closeActiveWindows)().then(done, done);
    });
    // test("Example 1 open", function(done) {
    // const vm = new myExtension.ViewManager();
    //     openFile(path.join(samplePath, "example1.rst")).then(editor => {
    //         vm.preview(editor.document.uri, false);
    //         done();
    //     });
    // });
    test("Example 1 full preview", async function () {
        this.timeout(30000);
        const editor = await (0, initialize_1.openFile)(path.join(initialize_1.samplePath, "example1.rst"));
        const val = await engine.preview(editor.document);
        // await vscode.commands.executeCommand("rst.showPreviewToSide");
        // await wait(2000);
        // if (!vscode.window.activeTextEditor) {
        //   throw new Error("Failed to preview");
        // }
        // const val = (vscode.window.activeTextEditor as vscode.TextEditor).document.getText();
        return new Promise((res, rej) => {
            fs.readFile(path.join(initialize_1.samplePath, "example1Full.html"), "utf8", (err, expected) => {
                if (err) {
                    rej(err);
                }
                assert.equal(val.split(/\r?\n/).join("\n"), expected.split(/\r?\n/).join("\n"), "Preview Generated HTML does not match expected");
                res();
            });
        });
    });
    test("Example 1 to HTML", async function () {
        this.timeout(30000);
        const editor = await (0, initialize_1.openFile)(path.join(initialize_1.samplePath, "example1.rst"));
        const val = await engine.compile(path.join(initialize_1.samplePath, "example1.rst"), editor.document.uri);
        return new Promise((res, rej) => {
            fs.readFile(path.join(initialize_1.samplePath, "example1.html"), "utf8", (err, expected) => {
                if (err) {
                    rej(err);
                }
                assert.equal(val.split(/\r?\n/).join("\n"), expected.split(/\r?\n/).join("\n"), "Generated HTML does not match expected");
                res();
            });
        });
    });
});
//# sourceMappingURL=extension.test.js.map