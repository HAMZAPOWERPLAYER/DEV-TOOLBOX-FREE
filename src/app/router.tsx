import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import HomePage from '@/features/home/HomePage';
import { TOOLS } from '@/lib/tool-registry';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      ...TOOLS.map((tool) => {
        const Component = tool.component;
        return {
          path: tool.path.replace(/^\//, ''),
          element: <Component />,
        };
      }),
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
