import styled from 'styled-components';

export const AuthContainer = styled.div`
width: 100vw;
height: 100vh;
position: fixed;
top: 0;
left: 0;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: #e7ebf0;
`

export const headerStyle = {
  width: '50%',
  maxWidth: 500,
  minWidth: 320,
  height: 130,
  backgroundColor: 'primary.dark',
  borderRadius: '4px 4px 0 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const FormWrapper = styled.div`
display: flex;
justify-content: center;
align-items: flex-end;
flex-direction: column;
width: 50%;
max-width: 500px;
min-width: 320px;
height: 50%;
max-height: 320px;
min-height: 230px;
padding: 50px;
border-radius: 0 0 4px 4px;
background-color: rgba(255, 255, 255, 1);
`

export const formStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  marginBottom: 3,
  '& > :not(style)': {
    margin: '8px 0',
    width: '100%',
    maxWidth: 500,
    minWidth: 200,

  },
}