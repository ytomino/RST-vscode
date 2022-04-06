"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = exports.getExtensionPath = void 0;
const vscode = require("vscode");
const commandManager_1 = require("./commandManager");
const commands = require("./commands/index");
const previewContentProvider_1 = require("./features/previewContentProvider");
const previewManager_1 = require("./features/previewManager");
const logger_1 = require("./logger");
const security_1 = require("./security");
const python_1 = require("./python");
const rstEngine_1 = require("./rstEngine");
let extensionPath = "";
function getExtensionPath() {
    return extensionPath;
}
exports.getExtensionPath = getExtensionPath;
async function activate(context) {
    extensionPath = context.extensionPath;
    const cspArbiter = new security_1.ExtensionContentSecurityPolicyArbiter(context.globalState, context.workspaceState);
    const logger = new logger_1.Logger();
    const python = new python_1.Python(logger);
    await python.awaitReady();
    const engine = new rstEngine_1.RSTEngine(python, logger);
    const contentProvider = new previewContentProvider_1.RSTContentProvider(context, cspArbiter, engine, logger);
    const previewManager = new previewManager_1.RSTPreviewManager(contentProvider, logger);
    context.subscriptions.push(previewManager);
    const previewSecuritySelector = new security_1.PreviewSecuritySelector(cspArbiter, previewManager);
    const commandManager = new commandManager_1.CommandManager();
    context.subscriptions.push(commandManager);
    commandManager.register(new commands.ShowPreviewCommand(previewManager));
    commandManager.register(new commands.ShowPreviewToSideCommand(previewManager));
    commandManager.register(new commands.ShowLockedPreviewToSideCommand(previewManager));
    commandManager.register(new commands.ShowSourceCommand(previewManager));
    commandManager.register(new commands.RefreshPreviewCommand(previewManager));
    commandManager.register(new commands.MoveCursorToPositionCommand());
    commandManager.register(new commands.ShowPreviewSecuritySelectorCommand(previewSecuritySelector, previewManager));
    commandManager.register(new commands.OpenDocumentLinkCommand());
    commandManager.register(new commands.ToggleLockCommand(previewManager));
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => {
        logger.updateConfiguration();
        previewManager.updateConfiguration();
    }));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map