# OneLink

An open-source clone of LinkTree using Next.js server components, Vercel Postgres, shadcn UI, Clerk, AWS S3 and Prisma.

## Running Locally

### Cloning the repository the local machine.

```bash
https://github.com/jyotideepjee1803/OneLink.git
```

### Create a Postgres database on Vercel (optional, can use other provider)
- To get started with Vercel Postgres refer [Vercel Postgres Guide](https://vercel.com/docs/storage/vercel-postgres/quickstart)
- Add the environment variables in .env
- (This project uses Prisma as an ORM for the database)

### Create a project on Clerk

- Add the environment variables in .env
- Ensure you have the following variables:
```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL = /api/auth/user
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL = /api/auth/user
```

### Create a S3 bucket

- Add the environment variables in .env
- Ensure you have the following variables:
```
S3_BUCKET = <BUCKET_NAME>
S3_ACCESS_KEY_ID = <ACCESS_KEY>
S3_SECRET_ACCESS_KEY = <SECRET_KEY>
S3_REGION = <BUCKET_REGION>
```

### Create a product on Stripe

- Add the environment variables in .env
- Ensure you have the following variables:
```
STRIPE_SECRET_KEY= <SECRET_KEY>
STRIPE_WEBHOOK_SECRET= <WEBHOOK_SECRET>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= <PUBLIC_KEY>
NEXT_PUBLIC_STRIPE_MAX_PRICE_ID= <PRODUCT_PRICE_ID>
```
- To get the above webhook secret and simulate payments locally run :
```bash
npm run stripe:listen
or
pnpm run stripe:listen
```
- To get the webhook secret for deployment, add the following endpoint to your Stripe dashboard
```bash
YOUR_DEPLOYED_URL/api/webhooks/stripe
```

### Installing the dependencies.

```bash
npm install
or
pnpm install
```

### Running the application.

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
or
pnpm run dev
```
