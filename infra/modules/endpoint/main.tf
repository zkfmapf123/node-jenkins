variable "vpc_id" {}
variable "endpoint_service_name" {}
variable "private_subnet_id" {}

## Todo
resource "aws_vpc_endpoint" "main_endpoint" {
    vpc_id = var.vpc_id
    service_name = join("", ["com.amazonaws.",var.endpoint_service_name, ".s3"])
    vpc_endpoint_type = "Interface"

    subnet_ids = [
        var.private_subnet_id
    ]
}