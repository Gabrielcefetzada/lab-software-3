import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';

import { paths } from '@/paths';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Box sx={{ mb: 3 }}>
          <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }} />
        </Box>
        <Box sx={{ maxWidth: '450px', width: '100%' }}>{children}</Box>
      </Box>
    </Box>
  );
}
