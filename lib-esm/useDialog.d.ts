import React from 'react';
type DialogComponent = React.ComponentType<{
    open: boolean;
    onClose: () => void;
}>;
export default function useDialog<T = DialogComponent, P = React.ComponentProps<T>>(dialogComponent: T, dialogProps?: Omit<P, 'open' | 'onClose'>): {
    open: (dialogProps?: Omit<P, "open" | "onClose"> | undefined) => void;
};
export declare function DialogContextProvider({ children, }: React.PropsWithChildren<unknown>): JSX.Element;
export {};
//# sourceMappingURL=useDialog.d.ts.map