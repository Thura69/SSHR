'use client';

import React from 'react'
import RenderGrandchildMenuList from '@/components/common/pagers/render-grandchild-list'
import isAuth from '@/components/auth/components/protected-route'

const MenuPage = () => {
    return <RenderGrandchildMenuList />
}

export default isAuth(MenuPage)
