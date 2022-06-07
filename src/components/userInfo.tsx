import * as React from 'react';
import { Typography } from "@mui/material";
import { useContext } from 'react';
import { AuthContext } from '../context/context';

const UserInfo = ({ message }: any) => {
    const auth = useContext(AuthContext)
    return (
        <>
            {auth && (
                <Typography variant='h4' component='h1' align='center'>
                    Вы вошли!
                </Typography>
            )
            }
            {!auth && (
                <Typography variant='h4' component='h1' align='center'>
                    {message}
                </Typography>
            )
            }

        </>
    )
}


export default UserInfo;