resource "vercel_project" "portfolio" {
  name      = var.project_name
  framework = "nextjs"

  git_repository = {
    type              = "github"
    repo              = var.github_repo
    production_branch = var.production_branch
  }

  automatically_expose_system_environment_variables = true
}

resource "vercel_project_domain" "production" {
  count = var.custom_domain == null ? 0 : 1

  project_id = vercel_project.portfolio.id
  domain     = var.custom_domain
}
