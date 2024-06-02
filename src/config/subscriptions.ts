export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  stripePriceId: string;
  price: number;
  features: Array<string>;
}

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "Basic",
    name: "Basic",
    description: "Basic tier offers you to create seamless OneLink page.",
    stripePriceId: "",
    price: 0,
    features: ["Unlimited Links", "4 Prebuilt Themes", "Multiple Pages"],
  },
  {
    id: "Pro",
    name: "Pro",
    description: "Pro tier offers greater customisation to your pages",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_MAX_PRICE_ID ?? "",
    price: 1000,
    features: ["Unlock all themes", "Social Icons"],
  },
  // {
  //   id: "ultra",
  //   name: "Ultra",
  //   description: "Ultra Pro tier that offers x, y, and z features.",
  //   stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ULTRA_PRICE_ID ?? "",
  //   price: 5000,
  //   features: ["Feature 1", "Feature 2", "Feature 3"],
  // },
];
