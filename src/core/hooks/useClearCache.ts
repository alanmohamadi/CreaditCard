import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useClearCache = () => {
    const queryClient = useQueryClient();

    const clearAllCache = useCallback(() => {
        queryClient.clear();
        
        queryClient.removeQueries();
        
        const cache = queryClient.getQueryCache();
        cache.getAll().forEach(query => {
            query.remove();
        });
    }, [queryClient]);

    const clearSpecificCache = useCallback((queryKey: string[]) => {
        queryClient.removeQueries({ queryKey });
        queryClient.invalidateQueries({ queryKey });
    }, [queryClient]);

    return { clearAllCache, clearSpecificCache };
};