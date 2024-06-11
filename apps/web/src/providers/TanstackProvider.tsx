'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

<<<<<<< HEAD
export default function TanstackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
=======
function TanstackProvider({ children }: any) {
>>>>>>> 69c16e61fcb7361637902f7536d198f830ea4ed8
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
<<<<<<< HEAD
=======

export default TanstackProvider;
>>>>>>> 69c16e61fcb7361637902f7536d198f830ea4ed8
