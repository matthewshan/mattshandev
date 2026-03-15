variable "project_name" {
  description = "Vercel project name."
  type        = string
  default     = "mattshandev"
}

variable "github_repo" {
  description = "GitHub repository in owner/name format."
  type        = string
}

variable "production_branch" {
  description = "Branch that should produce Vercel production deployments."
  type        = string
  default     = "main"
}

variable "custom_domain" {
  description = "Optional production domain to attach to the Vercel project. Use null to keep only the default Vercel domain."
  type        = string
  default     = null
}
