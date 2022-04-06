"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshPreviewCommand = void 0;
class RefreshPreviewCommand {
    constructor(webviewManager) {
        this.webviewManager = webviewManager;
        this.id = 'rst.preview.refresh';
    }
    execute() {
        this.webviewManager.refresh();
    }
}
exports.RefreshPreviewCommand = RefreshPreviewCommand;
//# sourceMappingURL=refreshPreview.js.map