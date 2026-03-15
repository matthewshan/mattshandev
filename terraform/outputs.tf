output "vercel_project_id" {
  description = "The Vercel project ID."
  value       = vercel_project.portfolio.id
}

output "vercel_project_name" {
  description = "The Vercel project name."
  value       = vercel_project.portfolio.name
}

output "vercel_project_domain" {
  description = "The configured production domain, if one was attached through Terraform."
  value       = try(vercel_project_domain.production[0].domain, null)
}
