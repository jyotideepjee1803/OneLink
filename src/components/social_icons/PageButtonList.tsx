"use client";

import { useOptimistic, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { OptimisticAction, cn } from "@/lib/utils";
import { type PageButton, } from "@/lib/db/schema/pageButtons";
import Modal from "@/components/shared/Modal";
import { type Page, type PageId } from "@/lib/db/schema/pages";
import { useOptimisticPageButtons } from "./useOptimisticPageButton";
import { Button } from "@/components/ui/button";
import PageButtonForm from "./ButtonForm";
import { ChevronRight, PlusIcon, Search, X } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { FaInstagram, FaSnapchat, FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import { LiaTelegramPlane } from "react-icons/lia";
import { AiOutlineDiscord } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import { Input } from "../ui/input";

type TOpenModal = (pageButton?: PageButton) => void;

export default function PageButtonList({
  pageButtons,
  pages,
  pageId 
}: {
  pageButtons: PageButton[];
  pages: Page[];
  pageId?: PageId 
}) {
  const { optimisticPageButtons, addOptimisticPageButton } = useOptimisticPageButtons(
    pageButtons,
    pages 
  );
  const [open, setOpen] = useState(false);
  
  const [activePageButton, setActivePageButton] = useState<PageButton | null>(null);
  const openModal = (pageButton?: PageButton) => {
    setOpen(true);
    pageButton ? setActivePageButton(pageButton) : setActivePageButton(null);
  };
  const closeModal = () => setOpen(false);

  const [openCreate, setOpenCreate] = useState(false);
  const [buttonTitle, setButtonTitle] = useState({title:"", example:""});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const openCreateModal = (pageButton?: PageButton) => {
    setOpenCreate(true);
    pageButton ? setActivePageButton(pageButton) : setActivePageButton(null);
  };
  const closeCreateModal = () => setOpenCreate(false);

  const SocialButtons = [
    {title : 'LinkedIn', icon : <SlSocialLinkedin/>, example : "https://linkedin.com/in/username"},
    {title : 'Github', icon : <FiGithub/>, example : " https://www.github.com/username"},
    {title : 'Instagram', icon : <FaInstagram/>, example : "https://www.instagram.com/handle"},
    {title : 'Facebook', icon : <CiFacebook/>, example : "https://facebook.com/facebookpageurl"},
    {title : 'Telegram', icon : <LiaTelegramPlane/>, example : "https://t.me/"},
    {title : 'Snapchat', icon : <FaSnapchat/>, example : "https://www.snapchat.com/add/yourusername"},
    {title : 'Twitter', icon : <FaXTwitter/>, example : "https://x.com/handle"},
    {title : 'Discord', icon : <AiOutlineDiscord/>, example: "https://discord.com/invite/yourchannel"}
  ]

  //filtering not selected buttons, among them filtering search query
  const filteredSocialButtons = SocialButtons.filter(socialButton =>
    !pageButtons.map(pageButton => pageButton.title).includes(socialButton.title)
  ).filter((pageButton) =>
    pageButton.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Modal
        open={openCreate}
        setOpen={setOpenCreate}
        title={activePageButton ? "Edit Button" : "Create Page Button"}
      >
        <PageButtonForm
          pageButton={activePageButton}
          addOptimistic={addOptimisticPageButton}
          openModal={openCreateModal}
          closeCreateModal={closeCreateModal}
          closeModal={closeModal}
          pages={pages}
          title={activePageButton ? activePageButton.title : buttonTitle.title}
          byline={buttonTitle.example}
          pageId={pageId}
        />
      </Modal>

      <Modal
        open={open}
        setOpen={setOpen}
        title={"Create Page Button"}
      >
        <div className="h-[300px] overflow-y-hidden">
          <div className="flex cursor-pointer items-center justify-between p-3">
            <Input
            startIcon={Search}
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"/>
          </div>
          <div className="overflow-y-scroll h-[250px]">
            {
              filteredSocialButtons.length === 0 ?
              <div className="flex justify-center">
                <p> No icons found. Try something else? </p> 
              </div>:
              (<>
              {filteredSocialButtons.map((item, index)=>{
                return(
                  <div 
                  key={index} 
                  className="flex cursor-pointer items-center justify-between p-3 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] h-15 text-secondary-foreground hover:bg-secondary dark:border-white/[0.2] border-black/[0.1] rounded-lg m-2"
                  onClick={()=>{
                    setButtonTitle({title : item.title, example : item.example});
                    openCreateModal();
                  }}
                  >
                      <div className="flex items-center">
                        <div className="mr-3">{item.icon}</div>
                        <div>{item.title}</div>
                      </div>
                      <div><ChevronRight className="h-5 w-5"/></div>
                  </div>
                )
              })}
              </>
            )
          }
          </div>
        </div>
      </Modal>

      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} >
          +
        </Button>
      </div>
      {optimisticPageButtons.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticPageButtons.map((pageButton) => {
            const optimistic = pageButton.id === "optimistic";
            const deleting = pageButton.id === "delete";
            const mutating = optimistic || deleting;

            return (
              <div 
              key={pageButton.id} 
              className={cn("p-2 inline-block rounded-lg w-full",
                mutating ? "opacity-0 animate-pulse" : "",
                deleting ? "text-destructive" : "",)} 
                style={{
                  pointerEvents: mutating||deleting ? "none" : "auto",
                  cursor : 'pointer'
                }}
                aria-disabled={mutating || deleting} 
                onClick={()=>{
                setActivePageButton(pageButton);
                setOpenCreate(true);
              }}>
                <CardContainer className="inter-var">
                  <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-lg p-3 border flex justify-center items-center">
                    <CardItem
                      translateZ="50" 
                      className="text-xl text-black dark:text-white w-full flex justify-center items-center min-w-80"
                    >
                        {pageButton.title}
                    </CardItem> 
                  </CardBody>
                </CardContainer>
              </div>
            )
          })}
        </ul>
      )}
    </div>
  );
}

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center mb-5">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No page buttons
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new page button.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Page Buttons </Button>
      </div>
    </div>
  );
};
