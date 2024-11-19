import React, { createContext, useState } from 'react';

export const ConnectContext = createContext({
  mrn: '',
  isAuthenticated: false,
  setMrn: (mrn: string) => {},
  setIsAuthenticated: (authenticated: boolean) => {},
});

