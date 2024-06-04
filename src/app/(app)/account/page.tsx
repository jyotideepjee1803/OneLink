import UserSettings from "./UserSettings";
import PlanSettings from "./PlanSettings";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";

export default async function Account() {
  await checkAuth();
  const { session } = await getUserAuth();
  const subscriptionPlan = await getUserSubscriptionPlan();
  
  return (
    <main>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold my-4">Account</h1>
      </div>
      <div className="space-y-4">
        <PlanSettings subscriptionPlan={subscriptionPlan}/>
        <UserSettings/>
      </div>
    </main>
  );
}
