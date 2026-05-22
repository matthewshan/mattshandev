# Cloud Infrastructure Repo Split Plan

## Goal

Move the Terraform-based Vercel infrastructure configuration out of this application repository and into the new `matthewshan/cloud-infrastructure` repository, while keeping `matthewshan/mattshandev` focused on site code, content, and app-specific documentation.

## Scope Decisions

- `matthewshan/cloud-infrastructure` becomes the source of truth for Terraform infrastructure code.
- `matthewshan/mattshandev` keeps only application code, content, and documentation that directly describes the site itself.
- The Vercel project should continue deploying the `matthewshan/mattshandev` application repo even after Terraform moves.
- This split should preserve the current production domain, Vercel project linkage, and deployment behavior.
- References in this repo that currently point to local Terraform files should be updated to the new repository so docs and blog content stay accurate.

## Implementation Plan

### 1. Establish the repository boundary

- Confirm that the new infrastructure repo will own the current Terraform files from `terraform/`.
- Decide whether the new repo will contain only Vercel provisioning or also future shared infrastructure and environment documentation.
- Keep the app repo out of Terraform state management concerns other than documented usage expectations.

### 2. Move the Terraform configuration into the new repo

- Copy `terraform/main.tf`, `providers.tf`, `variables.tf`, `outputs.tf`, `.terraform.lock.hcl`, and setup documentation into `matthewshan/cloud-infrastructure`.
- Preserve the current variable contract, especially the `github_repo` input that points at `matthewshan/mattshandev`.
- Recreate any needed repo structure in the new repo so Terraform commands and documentation stay straightforward.

### 3. Rework infrastructure documentation around the new location

- Update the setup guide so it is authored and maintained in the infrastructure repo instead of this repo.
- Make sure the setup steps still describe the current Vercel integration, domain attachment, and production branch behavior.
- Clarify that Terraform provisions infrastructure for the app repo rather than replacing the app repo itself.

### 4. Update application-repo references

- Remove or replace Terraform-specific guidance in this repo's docs where it implies the infrastructure code still lives here.
- Update blog links and any README references that currently point into `mattshandev/terraform/*` so they point to the new repo.
- Update architecture docs in this repo to describe infrastructure ownership accurately once the move is complete.

### 5. Remove duplicated infrastructure code from this repo

- Delete the local `terraform/` directory from `mattshandev` after the new repo is verified and the app repo references have been updated.
- Keep only minimal documentation in this repo about how the app is deployed and where the infrastructure source of truth now lives.

## Primary Files Affected

- `terraform/main.tf`
- `terraform/providers.tf`
- `terraform/variables.tf`
- `terraform/outputs.tf`
- `terraform/.terraform.lock.hcl`
- `terraform/SETUP.md`
- `terraform/mattshandev.tfvars`
- `README.md`
- `src/app/blog/posts/building-portfolio-site.mdx`
- `docs/technical-overview.md`

## Verification

1. Confirm the Terraform config in `matthewshan/cloud-infrastructure` still plans against the existing Vercel project settings.
2. Confirm the app repo no longer contains stale links or instructions that reference local Terraform files.
3. Confirm documentation in both repos clearly identifies which repo owns app code versus infrastructure code.
4. Confirm the Vercel project still targets `matthewshan/mattshandev` for deployments after the repo split.

## Risks to Watch

- Moving Terraform files without updating links in the blog post and docs will leave readers with broken references.
- Copying configuration before deciding long-term repo boundaries may create duplicate ownership and drift.
- Removing the local Terraform directory too early could lose setup context if the new repo documentation is not complete.
