"use client";

import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updatePageAction } from "@/lib/actions/pages";
import { Page } from "@/lib/db/schema/pages";
import { absoluteUrl } from "@/lib/utils";

export default function TogglePublic({
  isSubscribed,
  page,
}: {
  isSubscribed: boolean;
  page: Page;
}) {
  const pageLink = absoluteUrl("/share/") + page.slug;
  return (
    <div className="relative">
      <Card>
        <CardHeader>
          <CardTitle>Share this page</CardTitle>
          <CardDescription>
            Anyone with the link can view this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* {page.public ? ( */}
            <div className="flex space-x-2">
              <Input value={pageLink} readOnly disabled={!isSubscribed} />
              <Button
                variant="secondary"
                className="shrink-0"
                onClick={() => {
                  navigator.clipboard.writeText(pageLink);
                  toast.success("Copied to clipboard");
                }}
              >
                Copy Link
              </Button>
            </div>
            {!page.public ? (
            <div className="mt-2">
              <Button
                onClick={async () =>
                  await updatePageAction({ ...page, public: true })
                }
              >
                Make public
              </Button>
            </div>
            ):(
            <div className="mt-2">
              <Button
                onClick={async () =>
                  await updatePageAction({ ...page, public: false })
                }
              >
                Hide Page
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
