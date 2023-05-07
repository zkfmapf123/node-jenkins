variable "vpc_network_map" {
  type = map(string)

  default = {
    "cidr_block" = null,
    "public_subnet" = null,
    "private_subnet" = null
  }
}

variable "aws_region" {
  type = string
}