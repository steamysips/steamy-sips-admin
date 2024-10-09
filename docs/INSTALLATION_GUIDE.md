# Installation Guide


## Prerequisites

- Git
- [Steamy Sips API](https://github.com/steamysips/steamy-sips) must up and running

## Instructions

Install the project locally:

```bash
git clone git@github.com:steamysips/steamy-sips-admin.git
```

Navigate to the client directory and install dependencies:

```bash
cd steamy-sips-admin
npm install
```

Create a `.env.local` file in the root directory with the following contents:

```
NEXT_PUBLIC_DEMO_EMAIL=""
NEXT_PUBLIC_DEMO_PASSWORD=""
NEXT_PUBLIC_API_BASE_URL = "http://steamy.localhost/api/v1"
NEXT_PUBLIC_STEAMY_IMG_URL = "http://steamy.localhost/assets/img/product"
```