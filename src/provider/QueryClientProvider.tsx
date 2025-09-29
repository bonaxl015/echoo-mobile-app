import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

interface IAppQueryProvider {
	children: ReactNode;
}

export function AppQueryProvider({ children }: IAppQueryProvider) {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
