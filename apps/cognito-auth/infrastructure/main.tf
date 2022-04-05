terraform {
  required_providers {
    aws = {
      version: "~> 4"
    }
  }
}

provider "aws" {
  region = var.region
}

resource "aws_ssm_parameter" "api_server_host" {
  name  = "api_server_host"
  type  = "String"
  value = "http://188.166.72.214"
}

resource "aws_secretsmanager_secret" "cryptography" {
  name = "cryptography"
}