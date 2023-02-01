"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogContextProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var initialState = {
    dialogComponent: (function () { return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, {}); }),
    open: false,
};
function dialogContextReducer(prev, next) {
    return __assign(__assign({}, prev), next);
}
var DialogContext = react_1.default.createContext(undefined);
function useDialog(dialogComponent, dialogProps) {
    var setDialogContext = (0, react_1.useContext)(DialogContext);
    var baseDialogProps = dialogProps;
    if (typeof setDialogContext === 'undefined') {
        throw new Error('Did you forget to include <DialogContextProvider />');
    }
    var open = (0, react_1.useCallback)(function (dialogProps) {
        setDialogContext(__assign(__assign({ 
            // @ts-ignore
            dialogComponent: dialogComponent, open: true }, baseDialogProps), dialogProps));
    }, [setDialogContext]);
    return { open: open };
}
exports.default = useDialog;
function DialogContextProvider(_a) {
    var children = _a.children;
    var _b = (0, react_1.useReducer)(dialogContextReducer, initialState), _c = _b[0], setDialogContext = _b[1], DialogComponent = _c.dialogComponent, open = _c.open, props = __rest(_c, ["dialogComponent", "open"]);
    var handleClose = (0, react_1.useCallback)(function () {
        setDialogContext({ open: false });
    }, [setDialogContext]);
    return ((0, jsx_runtime_1.jsxs)(DialogContext.Provider, __assign({ value: setDialogContext }, { children: [children, (0, jsx_runtime_1.jsx)(DialogComponent, __assign({ open: open, onClose: handleClose }, props))] })));
}
exports.DialogContextProvider = DialogContextProvider;
//# sourceMappingURL=useDialog.js.map