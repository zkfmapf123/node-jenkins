module "vpc_sg" {
    source = "../sg/vpc"

    vpc_id = aws_vpc.main_vpc.id
    sg_name = null
}

# module "vpc_endpoint" {
#     source = "../endpoint"

#     vpc_id = aws_vpc.main_vpc.id
#     endpoint_service_name = join("",[var.aws_region, "a"])
#     private_subnet_id = aws_subnet.private_subnet.id
# }

locals {
    cidr_block = var.vpc_network_map.cidr_block
    public_subnet = var.vpc_network_map.public_subnet
    private_subnet = var.vpc_network_map.private_subnet
}

## VPC
resource "aws_vpc" "main_vpc" {
    cidr_block = local.cidr_block
    enable_dns_hostnames = true
    enable_dns_support = true
}

## IGW
resource "aws_internet_gateway" "main_igw" {
    vpc_id = aws_vpc.main_vpc.id
}

## Public subnet
resource "aws_subnet" "public_subnet" {
  vpc_id = aws_vpc.main_vpc.id
  cidr_block = local.public_subnet
  map_public_ip_on_launch = true
  availability_zone = join("",[var.aws_region, "a"])
}

resource "aws_route_table" "public_rt" {
    vpc_id = aws_vpc.main_vpc.id

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.main_igw.id
    }
}

resource "aws_route_table_association" "public_rt_association" {
    subnet_id = aws_subnet.public_subnet.id
    route_table_id = aws_route_table.public_rt.id
}

## Private Subnet
resource "aws_subnet" "private_subnet" {
    vpc_id = aws_vpc.main_vpc.id
    cidr_block = local.private_subnet
    availability_zone = join("",[var.aws_region,"a"])
}