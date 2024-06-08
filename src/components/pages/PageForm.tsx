import { z } from "zod";

import { useRef, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CircleCheckIcon, CloudUploadIcon, LockIcon,} from "lucide-react";
import { toast } from "sonner";

import { useValidatedForm } from "@/lib/hooks/useValidatedForm";
import { type Page, insertPageParams } from "@/lib/db/schema/pages";
import {
  createPageAction,
  deletePageAction,
  updatePageAction,
} from "@/lib/actions/pages";
import { type Action, cn, absoluteUrl } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/pages/useOptimisticPages";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import Loading from "@/app/loading";

const PageForm = ({
  page,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
  subscribed,
}: {
  page?: Page | null;
  subscribed? : boolean;
  openModal?: (page?: Page) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Page>(insertPageParams);
  const editing = !!page?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const fileInput = useRef<HTMLInputElement>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(page?.icon ?? null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [color, setColor] = useState<string>(page?.bgColor ?? "#000")

  // const {isSubscribed} = await getUserSubscriptionPlan()

  const router = useRouter();
  const backpath = useBackPath("pages");
  const defaultSrc = "/user.jpg";

  const themes = [
    {gradient: "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 16%, rgba(0,212,255,1) 100%)", available : true},
    {gradient:"linear-gradient(45deg, #FFC371 0%, #FF5F6D 50%, #FFC371 100%)",available : true},
    {gradient:"linear-gradient(90deg, #16BFFD 0%, #CB3066 100%)",available : true},
    {gradient:"linear-gradient(0deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",available : subscribed},
    {gradient:"linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",available : subscribed},
    {gradient:"linear-gradient(90deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",available : subscribed},
    {gradient:"linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%)",available : subscribed},
  ];

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Page }
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Page ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file){
      const data = new FormData();
      data.set('file', file);
      try {
        setUploading(true);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });

        if (response.ok) {
          const link = await response.json();
          toast.success('Uploaded!');
          setDataUrl(link);
          setUploading(false);
        } else {
          setUploading(false);
          throw new Error('Upload error!');
        }
      } catch (error) {
        toast.error('Upload error!');
        throw error;
      }
    }
  }

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const pageParsed = await insertPageParams.safeParseAsync({ ...payload,icon:dataUrl,bgColor:color, public: page?.public});
    if (!pageParsed.success) {
      setErrors(pageParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = pageParsed.data;
    const pendingPage: Page = {
      updatedAt: page?.updatedAt ?? new Date(),
      createdAt: page?.createdAt ?? new Date(),
      id: page?.id ?? "",
      userId: page?.userId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic &&
          addOptimistic({
            data: pendingPage,
            action: editing ? "update" : "create",
          });

        const error = editing
          ? await updatePageAction({ ...values, id: page.id })
          : await createPageAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingPage,
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8"}>
      {/* Schema fields start */}
      <div className="flex items-center">
        <div className="relative w-[80px] h-[80px] shrink-0 mr-2">
          <div className="overflow-hidden h-full rounded-full border-2 border-zinc-200 dark:border-secondary/80 shadow shadow-black/50">
            <Image
              className="w-full h-full object-cover"
              src={dataUrl ?? defaultSrc}
              alt={'avatar'}
              width={80} height={80} />
            
          </div>
        </div>
        
        <div className="space-y-xs w-full">
         
          <div className="mb-2 w-full">
            <label htmlFor="avatarIn">
              <div className="flex h-10 w-full items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-full p-2"> 
                {uploading ? (
                <>
                  <Loading/>
                </>
                ) : (<>
                <span>{"Upload Icon"}</span> 
                <CloudUploadIcon className="h-6 ml-2"/>
                </>
              )}
              </div>
            </label>
            <input onChange={handleFileChange} id="avatarIn" type="file" className="hidden" disabled={uploading}/>
            <input type="hidden" name="avatar" value={dataUrl?? "" }/>
          </div>
          <label>
            {dataUrl ? 
              (<div className="w-full flex h-10 w-full items-center justify-center bg-secondary text-secondary-foreground hover:bg-zinc-200 dark:hover:bg-secondary/80 rounded-full p-2" onClick={() => setDataUrl(null)}> 
              {"Remove Icon"} 
              </div>):
              (
                <Button disabled={true} className="w-full flex h-10 w-full items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary rounded-full">Remove Icon</Button>
              )
            }
          </label>
          
        </div>
        
      </div>

      <div>
        <Label
          className={cn(
            "mb-1 inline-block",
            errors?.name ? "text-destructive" : ""
          )}
        >
          Name
        </Label>
        <Input
          type="text"
          name="name"
          className={cn(errors?.name ? "ring ring-destructive" : "")}
          defaultValue={page?.name ?? ""}
        />
        {errors?.name ? (
          <p className="text-xs text-destructive mt-2">{errors.name[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>

      <div>
        <Label
          className={cn(
            "mb-1 inline-block",
            errors?.description ? "text-destructive" : ""
          )}
        >
          Description
        </Label>
        <Input
          type="text"
          name="description"
          className={cn(errors?.description ? "ring ring-destructive" : "")}
          defaultValue={page?.description ?? ""}
        />
        {errors?.description ? (
          <p className="text-xs text-destructive mt-2">
            {errors.description[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>

      <div className="flex flex-row items-center">
        <Label className={cn("mb-1 mr-4", errors?.bgColor && "text-destructive")}>Background</Label>
          <div className="flex flex-row items-center overflow-x-auto w-72">
          {themes.map((theme, index) => (
            <div key={index}>
            {theme.available ? (
              <div onClick={() => setColor(theme.gradient)} className="mr-4">
                <div className={`h-16 w-16 shadow-md text-white flex justify-center items-center rounded-full cursor-pointer ${color === theme.gradient ? 'opacity-50' : ''}`} style={{ background: theme.gradient }}>
                  {color === theme.gradient && <CircleCheckIcon/>}
                </div>
              </div>
            ) : (
              <TooltipBlock
                trigger={
                  <div className="mr-4">
                    <div className={`h-16 w-16 shadow-md text-white flex justify-center items-center rounded-full ${!theme.available ? 'opacity-50' : ''}`} style={{ background: theme.gradient }}>
                      <LockIcon/>
                    </div>
                  </div>
                }
                content={<p>Subscribe to unlock</p>}
              />
            )}
          </div>
          ))}
          </div>
        </div>
        <Label
          className={cn(
            "mb-1 inline-block",
            errors?.slug ? "text-destructive" : ""
          )}
        >
          Slug
        </Label>

        <div tabIndex={0} className="max-w-sm flex flex-row items-center pl-4 text-gray-400 border border-input rounded-md focus:ring-2 focus:ring-ring focus-visible:ring-offset-2">
          <p className="text-sm">{("onelink/share/")}</p>
          <input
            type="text"
            name="slug"
            defaultValue={page?.slug ?? ""}
            className="h-10 bg-background focus:outline-none truncate text-sm font-bold text-primary"
          />
        </div>

        {errors?.slug ? (
          <p className="text-xs text-destructive mt-2">{errors.slug[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic && addOptimistic({ action: "delete", data: page });
              const error = await deletePageAction(page.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: page,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default PageForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};

const TooltipBlock = ({trigger,content, } : {trigger: React.ReactNode; content : React.ReactNode;}) =>{
  return (
  <TooltipProvider>
    <Tooltip>
     <TooltipTrigger asChild>
      {trigger}
     </TooltipTrigger>
     <TooltipContent>
      {content}
     </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}
