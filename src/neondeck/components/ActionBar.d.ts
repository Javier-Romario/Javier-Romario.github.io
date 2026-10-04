import * as React from 'react';
interface ActionBarItem {
    hotkey?: any;
    body: React.ReactNode;
    onClick?: () => void;
    selected?: boolean;
    items?: ActionBarItem[];
    openHotkey?: string;
}
interface ActionBarProps {
    items: ActionBarItem[];
}
declare const ActionBar: React.FC<ActionBarProps>;
export default ActionBar;
