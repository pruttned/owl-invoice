import { AppStore } from './app-store';
import React from 'react';

export interface AppContextValue {
    appStore: AppStore,
}

export const AppContext = React.createContext<AppContextValue>(null as any);
