import { createContext, useState, useContext, useCallback } from 'react';
import { LoaderCircle } from 'lucide-react';
import { TailChase } from 'ldrs/react'
import 'ldrs/react/TailChase.css'


const LoadingContext = createContext();

const LoadingOverlay = () => (
    <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-70 z-[9999] flex flex-col items-center justify-center text-white"
        style={{ backdropFilter: 'blur(4px)' }}
    >
        <TailChase
            size="40"
            speed="1.75"
            color="white"
        />
        <p className="text-lg font-semibold">Loading Page...</p>
    </div>
);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const withLoading = useCallback(async (action) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Jeda dummy 500ms
        action();
        setIsLoading(false);
    }, []);

    return (
        <LoadingContext.Provider value={{ withLoading }}>
            {isLoading && <LoadingOverlay />}
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);

