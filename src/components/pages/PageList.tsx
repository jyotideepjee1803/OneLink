"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Page, CompletePage } from "@/lib/db/schema/pages";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { PlaceholdersAndVanishInput } from "@/components/ui/page-search";

import { useOptimisticPages } from "@/app/(app)/pages/useOptimisticPages";

import PageForm from "./PageForm";

type TOpenModal = (page?: Page) => void;

export default function PageList({
  pages,
  subscribed,
}: {
  pages: Page[];
  subscribed : boolean
}) {
  const { optimisticPages, addOptimisticPage } = useOptimisticPages(
    pages,
     
  );
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const placeholders = [
    "Search your page",
    "Click on the page",
  ];
 
  const openModal = (page?: Page) => {
    setOpen(true);
    page ? setActivePage(page) : setActivePage(null);
  };
  const closeModal = () => setOpen(false);

  const filteredPages = optimisticPages.filter((page) =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () =>{
    setSearchQuery("");
  }

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activePage ? "Edit Page" : "Create Page"}
      >
        <PageForm
          page={activePage}
          addOptimistic={addOptimisticPage}
          openModal={openModal}
          closeModal={closeModal}
          subscribed={subscribed}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      <div className="h-[20rem] flex flex-col justify-center  items-center px-4">
        <h2 className="mb-5 sm:mb-10 text-xl text-center sm:text-5xl dark:text-white text-black">
          Search your pages here
        </h2>
        <PlaceholdersAndVanishInput 
            placeholders={placeholders}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={handleSubmit}
        />
      </div>
      {optimisticPages.length === 0 ? (
      <EmptyState openModal={openModal} />
      ) : (
      <>
        {filteredPages.length === 0 ? (
          <p className="text-center">No pages found</p>
        ) : (
          <ul>
            {filteredPages.map((page) => (
              <Page
                page={page}
                key={page.id}
                openModal={openModal}
              />
            ))}
          </ul>
        )}
      </>
    )}
    </div>
  );
}

const Page = ({
  page,
  openModal,
}: {
  page: Page;
  openModal: TOpenModal;
}) => {
  const optimistic = page.id === "optimistic";
  const deleting = page.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("pages")
    ? pathname
    : pathname + "/pages/";


  return (
      <Link 
        className={cn("p-2 inline-block rounded-lg w-full",
        mutating ? "opacity-0 animate-pulse" : "",
        deleting ? "text-destructive" : "",)} 
        href={ basePath + "/" + page.id }
        style={{
          pointerEvents: mutating||deleting ? "none" : "auto",
        }}
        aria-disabled={mutating || deleting}
      >
        <CardContainer className="inter-var">
          <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-full p-3 border flex justify-center items-center">
            <CardItem
              translateZ="50" 
              className="text-xl text-black dark:text-white w-full flex justify-center items-center min-w-80"
            >
              {page.name}
            </CardItem>
          </CardBody>
        </CardContainer>
      </Link>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No pages
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new page.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Pages </Button>
      </div>
    </div>
  );
};
