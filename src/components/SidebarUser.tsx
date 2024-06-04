"use client";
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'

const SidebarUser = () => {
    const {user} = useUser();
    const firstName = user?.firstName ?? "";
    const lastName = user?.lastName ?? "";
    const fullName = firstName + " " + lastName;

    return (
        <Link href="/account">
            <div className="flex items-center justify-between w-full border-t border-border pt-4 px-2">
                <div className="text-muted-foreground">
                <p className="text-xs">{fullName}</p>
                <p className="text-xs font-light pr-4">
                    {user?.emailAddresses[0].emailAddress ?? ""}
                </p>
                </div>
                {/* <Avatar className="h-10 w-10">
                <AvatarFallback className="border-border border-2 text-muted-foreground">
                    {user.name
                    ? user.name
                        ?.split(" ")
                        .map((word) => word[0].toUpperCase())
                        .join("")
                    : "~"}
                </AvatarFallback>
                </Avatar> */}
                <UserButton afterSignOutUrl="/"/>
            </div>
        </Link>
    )
}

export default SidebarUser