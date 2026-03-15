# Vercel Setup

This directory already contains the Terraform configuration for deploying this repository to Vercel:

- `providers.tf`
- `variables.tf`
- `main.tf`
- `outputs.tf`
- `mattshandev.tfvars`

Use the steps below to configure and apply it.

## 1. Check prerequisites

Make sure these are installed locally:

- Node.js
- pnpm
- Terraform
- a Vercel account
- access to the GitHub repository `matthewshan/mattshandev`

Before provisioning Vercel, confirm the app builds locally from the repo root:

```bash
pnpm install
pnpm build
```

## 2. Create a Vercel API token

In Vercel:

1. Open account settings.
2. Open the tokens page.
3. Create a token for Terraform usage.
4. Keep the token value available for your shell session.

Export it before running Terraform:

```bash
export VERCEL_API_TOKEN="your_vercel_token"
```

## 3. Confirm GitHub is connected to Vercel

In Vercel:

1. Open the Vercel account that will own the project.
2. Confirm the Vercel GitHub integration is installed.
3. Confirm that integration can access `matthewshan/mattshandev`.

Terraform can create the Vercel project, but Vercel still needs the GitHub integration already installed in order to link the repo.

## 4. Review the Terraform variables file

This repo already includes `mattshandev.tfvars`.

Review that file and confirm these values:

- `project_name`: the Vercel project name you want to use
- `github_repo`: keep `matthewshan/mattshandev` unless the repository moves
- `production_branch`: keep `main` unless you deploy from another branch
- `custom_domain`: keep `mattshan.dev` if that is the production domain, or set `null` if you only want the default Vercel domain

## 5. Initialize Terraform

From the `terraform` directory, run:

```bash
terraform init
```

This downloads the Vercel provider and prepares the working directory.

## 6. Review the plan

Run:

```bash
terraform plan -var-file="mattshandev.tfvars"
```

Review that Terraform will create:

- one Vercel project
- an optional project domain attachment when `custom_domain` is set

## 7. Apply the configuration

Run:

```bash
terraform apply -var-file="mattshandev.tfvars"
```

Approve the plan when prompted.

## 8. Verify the project in Vercel

After apply finishes, verify in the Vercel dashboard:

1. the project exists
2. the linked GitHub repository is correct
3. the production branch is correct
4. the framework is detected as Next.js
5. the initial deployment has started or completed

## 9. Configure DNS if you attached a custom domain

If `custom_domain` is set, Vercel may require DNS changes.

Use the Vercel dashboard to:

1. inspect the required DNS records
2. add those records at your DNS provider
3. wait for the domain to verify

## 10. Confirm the canonical site URL in the app config

This repository currently uses `https://mattshan.dev` as the canonical base URL in `src/resources/once-ui.config.ts`.

If your production domain is different, update that file so metadata, sitemap, RSS, and Open Graph URLs stay correct.

## 11. Trigger deployments

After the project is connected:

- push to `main` for a production deployment
- push to other branches for preview deployments

## 12. Ongoing Terraform usage

Use these commands for future changes:

```bash
terraform plan -var-file="mattshandev.tfvars"
terraform apply -var-file="mattshandev.tfvars"
```

If you ever create the Vercel project manually and need Terraform to take it over later, import it with the Vercel project ID:

```bash
terraform import vercel_project.portfolio prj_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Note about DNS configuration

DNS records for your custom domain must be created or updated at your DNS provider. Use the records shown in the Vercel dashboard, then wait for DNS propagation and Vercel domain verification to complete.
