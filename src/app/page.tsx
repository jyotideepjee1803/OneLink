/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PmwTvNfrVgf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Integrations } from "@/components/landing/Integration";
import { ListCard } from "@/components/landing/ListsCard";
import { OrbitCard } from "@/components/landing/OrbitCard";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/sign-in"
          >
            Sign In
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full dark:bg-black bg-white  dark:bg-grid-white/[0.07] bg-grid-black/[0.2] relative p-5">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="mx-auto aspect-video object-fit sm:w-full lg:order-last lg:aspect-square xs:hidden">
                {/* <CardContainer still={false} className="">
                  <CardBody>
                  <CardItem translateZ="100" className="w-full mt-4">
                      <Image
                        src="/landing2.png"
                        height="500"
                        width="500"
                        className="h-4/6 w-4/6 object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                      />
                    </CardItem>
                  </CardBody>
                </CardContainer> */}
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-extrabold sm:text-5xl xl:text-6xl/none">
                    Link All of You, <br />
                    In One link. 
                  </h1>
                  <p className="max-w-[600px] text-neutral-500 md:text-xl dark:text-neutral-400">
                    One link to help you share your Instagram, TikTok, Twitter, 
                    YouTube and other social media profiles. One link to connect
                    with millions of people.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-8 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
                    href="/sign-in"
                  >
                    Get Started for free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container md:px-6 flex flex-col">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-neutral-100 px-3 py-1 text-sm dark:bg-neutral-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Faster sharing. More innovation.
                </h2>
                <p className="max-w-[900px] text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
                  Create and customize your Onelink in minutes. Connect all your profiles at one stop.
                  It all comes together in a link in bio landing page designed to convert.
                </p>
              </div>
            </div>
            <div className="flex self-center mt-4 grid gap-3 lg:grid-cols-3 lg:gap-7 md:grid-cols-2 md:gap-5 sm:grid-cols-1 sm:gap-4">
                <div className="rounded-xl py-5 shadow-md flex flex-col justify-center items-center max-w-[19rem] max-h-[32rem]">
                  <OrbitCard/>
                  <p className="text-neutral-500 dark:text-neutral-400 my-6 text-center">
                    Share your content in limitless ways on your Onelink.
                  </p>
                </div>
                <div className="rounded-xl py-5 shadow-md flex flex-col justify-center items-center max-w-[19rem] max-h-[32rem]">
                  <ListCard/>
                  <p className="text-neutral-500 dark:text-neutral-400 my-3 text-center">
                    Customize your OneLink to match your brand. Make it feel like you.
                  </p>
                </div>
                <div className="rounded-xl py-5 shadow-md flex flex-col justify-center items-center max-w-[19rem] max-h-[32rem]">
                  <Integrations/>
                  <p className="text-neutral-500 dark:text-neutral-400 my-3 text-center">
                    Seamlessly connect your Onelink with the tools you already use.
                  </p>
                </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Sign Up for Updates
                </h2>
                <p className="max-w-[600px] text-neutral-500 md:text-xl dark:text-neutral-400">
                  Stay updated with the latest product news and updates.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex sm:flex-row flex-col space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    className="max-w-lg flex-1 px-4 py-2 border-border border rounded-md "
                    placeholder="Enter your email"
                    type="email"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          © 2024 Acme Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
