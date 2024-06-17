import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC, PropsWithChildren, useState } from 'react';
import useToastStore from '../store/useToastStore';



const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const { toast } = useToastStore();

  const [queryClient] = useState(new QueryClient({
    defaultOptions: {
      queries: {
        enabled: true,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        toast({ message: `Error: ${error.message}`, variant: 'error' })
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        toast({ message: `Error: ${error.message}`, variant: 'error' })
      },
    })
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;