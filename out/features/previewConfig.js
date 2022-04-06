"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSTPreviewConfigurationManager = exports.RSTPreviewConfiguration = void 0;
const vscode = require("vscode");
class RSTPreviewConfiguration {
    constructor(resource) {
        const editorConfig = vscode.workspace.getConfiguration('editor', resource);
        const rstConfig = vscode.workspace.getConfiguration('rst', resource);
        const rstEditorConfig = vscode.workspace.getConfiguration('[restructuredtext]', resource);
        this.scrollBeyondLastLine = editorConfig.get('scrollBeyondLastLine', false);
        this.wordWrap = editorConfig.get('wordWrap', 'off') !== 'off';
        if (rstEditorConfig && rstEditorConfig['editor.wordWrap']) {
            this.wordWrap = rstEditorConfig['editor.wordWrap'] !== 'off';
        }
        this.scrollPreviewWithEditor = !!rstConfig.get('preview.scrollPreviewWithEditor', true);
        this.scrollEditorWithPreview = !!rstConfig.get('preview.scrollEditorWithPreview', true);
        this.lineBreaks = !!rstConfig.get('preview.breaks', false);
        this.doubleClickToSwitchToEditor = !!rstConfig.get('preview.doubleClickToSwitchToEditor', true);
        this.rstEditorSelection = !!rstConfig.get('preview.markEditorSelection', true);
        this.pythonPath = rstConfig.get("preview.pythonPath", "python");
        this.fontFamily = rstConfig.get('preview.fontFamily', undefined);
        this.fontSize = Math.max(8, +rstConfig.get('preview.fontSize', NaN));
        this.lineHeight = Math.max(0.6, +rstConfig.get('preview.lineHeight', NaN));
        this.baseStyles = [
            "basic.css",
            "default.css",
            "rst.css"
        ];
        this.styles = rstConfig.get('styles', []);
    }
    static getForResource(resource) {
        return new RSTPreviewConfiguration(resource);
    }
    isEqualTo(otherConfig) {
        for (let key in this) {
            if (this.hasOwnProperty(key) && key !== 'styles') {
                if (this[key] !== otherConfig[key]) {
                    return false;
                }
            }
        }
        // Check styles
        if (this.styles.length !== otherConfig.styles.length) {
            return false;
        }
        for (let i = 0; i < this.styles.length; ++i) {
            if (this.styles[i] !== otherConfig.styles[i]) {
                return false;
            }
        }
        return true;
    }
}
exports.RSTPreviewConfiguration = RSTPreviewConfiguration;
class RSTPreviewConfigurationManager {
    constructor() {
        this.previewConfigurationsForWorkspaces = new Map();
    }
    loadAndCacheConfiguration(resource) {
        const config = RSTPreviewConfiguration.getForResource(resource);
        this.previewConfigurationsForWorkspaces.set(this.getKey(resource), config);
        return config;
    }
    hasConfigurationChanged(resource) {
        const key = this.getKey(resource);
        const currentConfig = this.previewConfigurationsForWorkspaces.get(key);
        const newConfig = RSTPreviewConfiguration.getForResource(resource);
        return (!currentConfig || !currentConfig.isEqualTo(newConfig));
    }
    getKey(resource) {
        const folder = vscode.workspace.getWorkspaceFolder(resource);
        return folder ? folder.uri.toString() : '';
    }
}
exports.RSTPreviewConfigurationManager = RSTPreviewConfigurationManager;
//# sourceMappingURL=previewConfig.js.map