"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/pages/useOptimisticPages";
import { type Page } from "@/lib/db/schema/pages";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import PageForm from "@/components/pages/PageForm";
import Image from "next/image";


export default function OptimisticPage({ 
  page,
  subscribed,
}: { 
  page: Page; 
  subscribed : boolean;
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Page) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticPage, setOptimisticPage] = useOptimistic(page);
  const updatePage: TAddOptimistic = (input) =>
    setOptimisticPage({ ...input.data });

  const defaultSrc = "/user.jpg"
  return (
    <div className="mb-4 border rounded-lg p-4">
      <Modal open={open} setOpen={setOpen} title={"Edit Page"}>
        <PageForm
          page={optimisticPage}
          subscribed = {subscribed}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updatePage}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticPage.name}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>

      <div className={`py-4 mt-4 min-h-[200px] flex justify-center items-center bg-cover rounded-t-lg bg-center relative`} style={{background:page.bgColor}}/>
      <div className="flex justify-center mb-2">
          <div className="relative -top-12 w-[128px] h-[128px]">
            <div className="overflow-hidden h-full rounded-full border-4 border-zinc-200 dark:border-secondary/80 shadow shadow-black/50">
              <Image
                className="w-full h-full object-cover"
                src={page.icon ?? defaultSrc}
                alt={'avatar'}
                width={128} height={128} />
            </div>
          </div>
      </div>
      
      <div className="p-0">
          <label className="input-label uppercase text-muted-foreground text-xs mb-2 font-semibold" htmlFor="nameIn">Display name</label>
          <input
            type="text"
            id="nameIn"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 w-full block py-2 px-2 mb-2 rounded-md"
            name="displayName"
            disabled
            value={page.name}
            placeholder="John Doe"/>
          <label className="input-label uppercase text-muted-foreground text-xs mb-2 font-semibold" htmlFor="bioIn">Bio</label>
          <input
            name="bio"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 w-full block py-2 px-2 mb-2 rounded-md"
            value={page.description}
            disabled
            id="bioIn"
          />
      </div>

    </div>
  );
}
