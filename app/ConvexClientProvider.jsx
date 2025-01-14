"use client";
import React from 'react';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { QueryClient, QueryClientProvider } from 'react-query';

function ConvexClientProvider({ children }) {
    // Instantiate the ConvexReactClient with 'new'
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL); // Use 'new' keyword
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>

        <ConvexProvider client={convex}>
            {children}
        </ConvexProvider>    

      </QueryClientProvider>
    );
}

export default ConvexClientProvider;