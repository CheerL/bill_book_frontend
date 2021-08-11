import React from 'react'

import { Login } from "./login";
import { Forget } from "./forget";
import { Register } from "./register";
import { SwitchRoute } from '../../router'

export const User = () => <SwitchRoute router_map={[
    {path: '/user/login', component: Login},
    {path: '/user/forget', component: Forget},
    {path: '/user/register', component: Register},
    {path: '/user/login'}
]} />