import React from "react"
import { IAuthContext } from './authContextTypes';

export const AuthContext = React.createContext<IAuthContext>(null!);
