import React from 'react'
import { Container } from '@mui/material';

export const WithPageContainer = (Child: React.ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    return (
      <Container
        maxWidth='lg'
        sx={{
          marginBottom: 10,
          position: 'relative',
          marginTop: '0',
          minHeight: '100vh',
          // minHeight: 'calc(100vh - 182px)',
        }}
      >
        <Child {...props} />
      </Container>
    )
  }
}