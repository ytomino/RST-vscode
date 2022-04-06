/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./preview-src/csp.ts":
/*!****************************!*\
  !*** ./preview-src/csp.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CspAlerter = void 0;
const settings_1 = __webpack_require__(/*! ./settings */ "./preview-src/settings.ts");
const strings_1 = __webpack_require__(/*! ./strings */ "./preview-src/strings.ts");
/**
 * Shows an alert when there is a content security policy violation.
 */
class CspAlerter {
    constructor() {
        this.didShow = false;
        this.didHaveCspWarning = false;
        document.addEventListener('securitypolicyviolation', () => {
            this.onCspWarning();
        });
        window.addEventListener('message', (event) => {
            if (event && event.data && event.data.name === 'vscode-did-block-svg') {
                this.onCspWarning();
            }
        });
    }
    setPoster(poster) {
        this.messaging = poster;
        if (this.didHaveCspWarning) {
            this.showCspWarning();
        }
    }
    onCspWarning() {
        this.didHaveCspWarning = true;
        this.showCspWarning();
    }
    showCspWarning() {
        const strings = (0, strings_1.getStrings)();
        const settings = (0, settings_1.getSettings)();
        if (this.didShow || settings.disableSecurityWarnings || !this.messaging) {
            return;
        }
        this.didShow = true;
        const notification = document.createElement('a');
        notification.innerText = strings.cspAlertMessageText;
        notification.setAttribute('id', 'code-csp-warning');
        notification.setAttribute('title', strings.cspAlertMessageTitle);
        notification.setAttribute('role', 'button');
        notification.setAttribute('aria-label', strings.cspAlertMessageLabel);
        notification.onclick = () => {
            this.messaging.postCommand('rst.showPreviewSecuritySelector', [settings.source]);
        };
        document.body.appendChild(notification);
    }
}
exports.CspAlerter = CspAlerter;


/***/ }),

/***/ "./preview-src/settings.ts":
/*!*********************************!*\
  !*** ./preview-src/settings.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSettings = exports.getData = void 0;
let cachedSettings = undefined;
function getData(key) {
    const element = document.getElementById('vscode-rst-preview-data');
    if (element) {
        const data = element.getAttribute(key);
        if (data) {
            return JSON.parse(data);
        }
    }
    throw new Error(`Could not load data for ${key}`);
}
exports.getData = getData;
function getSettings() {
    if (cachedSettings) {
        return cachedSettings;
    }
    cachedSettings = getData('data-settings');
    if (cachedSettings) {
        return cachedSettings;
    }
    throw new Error('Could not load settings');
}
exports.getSettings = getSettings;


/***/ }),

/***/ "./preview-src/strings.ts":
/*!********************************!*\
  !*** ./preview-src/strings.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getStrings = void 0;
function getStrings() {
    const store = document.getElementById('vscode-rst-preview-data');
    if (store) {
        const data = store.getAttribute('data-strings');
        if (data) {
            return JSON.parse(data);
        }
    }
    throw new Error('Could not load strings');
}
exports.getStrings = getStrings;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!****************************!*\
  !*** ./preview-src/pre.ts ***!
  \****************************/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
const csp_1 = __webpack_require__(/*! ./csp */ "./preview-src/csp.ts");
window.cspAlerter = new csp_1.CspAlerter();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDJCQUEyQixHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFWRCwwQkFVQztBQUVELFNBQWdCLFdBQVc7SUFDMUIsSUFBSSxjQUFjLEVBQUU7UUFDbkIsT0FBTyxjQUFjLENBQUM7S0FDdEI7SUFFRCxjQUFjLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzFDLElBQUksY0FBYyxFQUFFO1FBQ25CLE9BQU8sY0FBYyxDQUFDO0tBQ3RCO0lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFYRCxrQ0FXQzs7Ozs7Ozs7Ozs7O0FDeENEOzs7Z0dBR2dHOzs7QUFFaEcsU0FBZ0IsVUFBVTtJQUN6QixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDakUsSUFBSSxLQUFLLEVBQUU7UUFDVixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hELElBQUksSUFBSSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO0tBQ0Q7SUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDM0MsQ0FBQztBQVRELGdDQVNDOzs7Ozs7O1VDZEQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7QUN0QkE7OztnR0FHZ0c7O0FBRWhHLHVFQUFtQztBQVFuQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksZ0JBQVUsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnN0LXZzY29kZS8uL3ByZXZpZXctc3JjL2NzcC50cyIsIndlYnBhY2s6Ly9yc3QtdnNjb2RlLy4vcHJldmlldy1zcmMvc2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vcnN0LXZzY29kZS8uL3ByZXZpZXctc3JjL3N0cmluZ3MudHMiLCJ3ZWJwYWNrOi8vcnN0LXZzY29kZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yc3QtdnNjb2RlLy4vcHJldmlldy1zcmMvcHJlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgeyBNZXNzYWdlUG9zdGVyIH0gZnJvbSAnLi9tZXNzYWdpbmcnO1xuaW1wb3J0IHsgZ2V0U2V0dGluZ3MgfSBmcm9tICcuL3NldHRpbmdzJztcbmltcG9ydCB7IGdldFN0cmluZ3MgfSBmcm9tICcuL3N0cmluZ3MnO1xuXG4vKipcbiAqIFNob3dzIGFuIGFsZXJ0IHdoZW4gdGhlcmUgaXMgYSBjb250ZW50IHNlY3VyaXR5IHBvbGljeSB2aW9sYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBDc3BBbGVydGVyIHtcblx0cHJpdmF0ZSBkaWRTaG93ID0gZmFsc2U7XG5cdHByaXZhdGUgZGlkSGF2ZUNzcFdhcm5pbmcgPSBmYWxzZTtcblxuXHRwcml2YXRlIG1lc3NhZ2luZz86IE1lc3NhZ2VQb3N0ZXI7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2VjdXJpdHlwb2xpY3l2aW9sYXRpb24nLCAoKSA9PiB7XG5cdFx0XHR0aGlzLm9uQ3NwV2FybmluZygpO1xuXHRcdH0pO1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcblx0XHRcdGlmIChldmVudCAmJiBldmVudC5kYXRhICYmIGV2ZW50LmRhdGEubmFtZSA9PT0gJ3ZzY29kZS1kaWQtYmxvY2stc3ZnJykge1xuXHRcdFx0XHR0aGlzLm9uQ3NwV2FybmluZygpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHVibGljIHNldFBvc3Rlcihwb3N0ZXI6IE1lc3NhZ2VQb3N0ZXIpIHtcblx0XHR0aGlzLm1lc3NhZ2luZyA9IHBvc3Rlcjtcblx0XHRpZiAodGhpcy5kaWRIYXZlQ3NwV2FybmluZykge1xuXHRcdFx0dGhpcy5zaG93Q3NwV2FybmluZygpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgb25Dc3BXYXJuaW5nKCkge1xuXHRcdHRoaXMuZGlkSGF2ZUNzcFdhcm5pbmcgPSB0cnVlO1xuXHRcdHRoaXMuc2hvd0NzcFdhcm5pbmcoKTtcblx0fVxuXG5cdHByaXZhdGUgc2hvd0NzcFdhcm5pbmcoKSB7XG5cdFx0Y29uc3Qgc3RyaW5ncyA9IGdldFN0cmluZ3MoKTtcblx0XHRjb25zdCBzZXR0aW5ncyA9IGdldFNldHRpbmdzKCk7XG5cblx0XHRpZiAodGhpcy5kaWRTaG93IHx8IHNldHRpbmdzLmRpc2FibGVTZWN1cml0eVdhcm5pbmdzIHx8ICF0aGlzLm1lc3NhZ2luZykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmRpZFNob3cgPSB0cnVlO1xuXG5cdFx0Y29uc3Qgbm90aWZpY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdG5vdGlmaWNhdGlvbi5pbm5lclRleHQgPSBzdHJpbmdzLmNzcEFsZXJ0TWVzc2FnZVRleHQ7XG5cdFx0bm90aWZpY2F0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnY29kZS1jc3Atd2FybmluZycpO1xuXHRcdG5vdGlmaWNhdGlvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgc3RyaW5ncy5jc3BBbGVydE1lc3NhZ2VUaXRsZSk7XG5cblx0XHRub3RpZmljYXRpb24uc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xuXHRcdG5vdGlmaWNhdGlvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBzdHJpbmdzLmNzcEFsZXJ0TWVzc2FnZUxhYmVsKTtcblx0XHRub3RpZmljYXRpb24ub25jbGljayA9ICgpID0+IHtcblx0XHRcdHRoaXMubWVzc2FnaW5nIS5wb3N0Q29tbWFuZCgncnN0LnNob3dQcmV2aWV3U2VjdXJpdHlTZWxlY3RvcicsIFtzZXR0aW5ncy5zb3VyY2VdKTtcblx0XHR9O1xuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uKTtcblx0fVxufVxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJldmlld1NldHRpbmdzIHtcblx0c291cmNlOiBzdHJpbmc7XG5cdGxpbmU6IG51bWJlcjtcblx0bGluZUNvdW50OiBudW1iZXI7XG5cdHNjcm9sbFByZXZpZXdXaXRoRWRpdG9yPzogYm9vbGVhbjtcblx0c2Nyb2xsRWRpdG9yV2l0aFByZXZpZXc6IGJvb2xlYW47XG5cdGRpc2FibGVTZWN1cml0eVdhcm5pbmdzOiBib29sZWFuO1xuXHRkb3VibGVDbGlja1RvU3dpdGNoVG9FZGl0b3I6IGJvb2xlYW47XG59XG5cbmxldCBjYWNoZWRTZXR0aW5nczogUHJldmlld1NldHRpbmdzIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YShrZXk6IHN0cmluZyk6IFByZXZpZXdTZXR0aW5ncyB7XG5cdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndnNjb2RlLXJzdC1wcmV2aWV3LWRhdGEnKTtcblx0aWYgKGVsZW1lbnQpIHtcblx0XHRjb25zdCBkYXRhID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KTtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0dGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgbG9hZCBkYXRhIGZvciAke2tleX1gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNldHRpbmdzKCk6IFByZXZpZXdTZXR0aW5ncyB7XG5cdGlmIChjYWNoZWRTZXR0aW5ncykge1xuXHRcdHJldHVybiBjYWNoZWRTZXR0aW5ncztcblx0fVxuXG5cdGNhY2hlZFNldHRpbmdzID0gZ2V0RGF0YSgnZGF0YS1zZXR0aW5ncycpO1xuXHRpZiAoY2FjaGVkU2V0dGluZ3MpIHtcblx0XHRyZXR1cm4gY2FjaGVkU2V0dGluZ3M7XG5cdH1cblxuXHR0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBsb2FkIHNldHRpbmdzJyk7XG59XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0cmluZ3MoKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB7XG5cdGNvbnN0IHN0b3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZzY29kZS1yc3QtcHJldmlldy1kYXRhJyk7XG5cdGlmIChzdG9yZSkge1xuXHRcdGNvbnN0IGRhdGEgPSBzdG9yZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3RyaW5ncycpO1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcblx0XHR9XG5cdH1cblx0dGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgbG9hZCBzdHJpbmdzJyk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmltcG9ydCB7IENzcEFsZXJ0ZXIgfSBmcm9tICcuL2NzcCc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcblx0aW50ZXJmYWNlIFdpbmRvdyB7XG5cdFx0Y3NwQWxlcnRlcjogQ3NwQWxlcnRlcjtcblx0fVxufVxuXG53aW5kb3cuY3NwQWxlcnRlciA9IG5ldyBDc3BBbGVydGVyKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9