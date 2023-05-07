module vpc {
    source ="../modules/vpc"

    aws_region = var.aws_region
    vpc_network_map = {
        cidr_block = var.vpc_cidr_block
        public_subnet = var.public_subnet_cidr_block
        private_subnet = var.private_subnet_cidr_block
    }
}

module was {
    source = "../modules/instance/was"

    vpc_map = {
        vpc_id = module.vpc.vpc_id
        public_subnet_id = module.vpc.public_subnet_id   
    }

    key_pair_to_path = {
        private = "~/.ssh/id_rsa"
        public = "~/.ssh/id_rsa.pub"
    }

    instance_map=  {
        ami = "ami-04cebc8d6c4f297a3"
        type = "t2.micro"
    }
}

module jenkins {
    source = "../modules/instance/jenkins"

    vpc_map = {
        vpc_id = module.vpc.vpc_id
        public_subnet_id = module.vpc.public_subnet_id   
    }

    key_pair_to_path = {
        private = "~/.ssh/id_rsa"
        public = "~/.ssh/id_rsa.pub"
    }

    instance_map=  {
        ami = "ami-04cebc8d6c4f297a3"
        type = "t2.micro"
    }
}

module rds {
    source = "../modules/instance/rds"

    private_subnet_id = module.vpc.private_subnet_id
}