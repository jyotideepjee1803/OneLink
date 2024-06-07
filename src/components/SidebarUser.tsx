"use client";
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'

const SidebarUser = () => {
    const {user} = useUser();

    return (
        <Link href="/account">
            <div className="flex items-center justify-between w-full border-t border-border pt-4 px-2">
                <div className="text-muted-foreground">
                <p className="text-xs font-light pr-4">
                    {user?.emailAddresses[0].emailAddress ?? ""}
                </p>
                </div>
                <UserButton afterSignOutUrl="/"/>
            </div>
        </Link>
    )
}

export default SidebarUser