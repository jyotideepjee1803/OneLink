"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import getStripe from "@/utils/getStripe";

interface ManageUserSubscriptionButtonProps {
  userId: string;
  email: string;
  isCurrentPlan: boolean;
  isSubscribed: boolean;
  stripeCustomerId?: string | null;
  stripePriceId: string;
}

export function ManageUserSubscriptionButton({
  userId,
  email,
  isCurrentPlan,
  isSubscribed,
  stripeCustomerId,
  stripePriceId,
}: ManageUserSubscriptionButtonProps) {
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const res = await fetch("/api/billing/manage-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            userId,
            isSubscribed,
            isCurrentPlan,
            stripeCustomerId,
            stripePriceId,
          }),
        });

        const checkoutSession = await res.json().then((value) => {
          return value.session;
        });
    
        const stripe = await getStripe();
        const { error } = await stripe!.redirectToCheckout({
          sessionId: checkoutSession.id,
        });
    
        console.warn(error.message);
        
      } catch (err) {
        console.error((err as Error).message);
        toast.error("Something went wrong, please try again later.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Button
        disabled={isPending}
        className="w-full"
        variant={isCurrentPlan ? "default" : "outline"}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isCurrentPlan ? "Manage Subscription" : "Subscribe"}
      </Button>
    </form>
  );
}
