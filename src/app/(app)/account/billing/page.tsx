
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";
import { redirect} from "next/navigation";
import BillingComponent from "./BillingComponent";

export default async function Billing (){
  await checkAuth();
  const { session } = await getUserAuth();
  const subscriptionPlan = await getUserSubscriptionPlan();
  if (!session) return redirect("/");

  return (
    <BillingComponent subscriptionPlan = {subscriptionPlan}/>
  )
}