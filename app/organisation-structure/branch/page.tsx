'use client'

import isAuth from "@/components/auth/components/protected-route";
import BranchList from "@/components/organisation-structure/branch/branch-list";
import { useLegitGrandSub } from "@/hooks/use-legit-grandSub";
import { usePathname } from "next/navigation"

const page = ()=>{
    //permission 
    const pathname = usePathname();

    //permission hook
    useLegitGrandSub(pathname);

    return <BranchList/>
}

export default isAuth(BranchList)