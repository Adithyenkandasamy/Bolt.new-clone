"use client";
import React from 'react';
import { ConvexProvider, ConvexReactClient } from "convex/react";

function ConvexClientProvider({ children }) {
    // Instantiate the ConvexReactClient with 'new'
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL); // Use 'new' keyword
    
    return (
        <ConvexProvider client={convex}>
            {children}
        </ConvexProvider>    
    );
}

export default ConvexClientProvider;