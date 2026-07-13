import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

import App from "./App";

import "./index.css";

const queryClient =
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 1,
      },
      mutations: {
        retry: 1,
      },
    },
  });

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>

    <QueryClientProvider
      client={queryClient}
    >

      <BrowserRouter>

        <ThemeProvider>

          <AuthProvider>

            <App />

            <Toaster
              position="top-right"
            />

          </AuthProvider>

        </ThemeProvider>

      </BrowserRouter>

    </QueryClientProvider>

  </React.StrictMode>
);