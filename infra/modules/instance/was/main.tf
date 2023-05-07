module "was_sg" {
    source = "../../sg/vpc"
    vpc_id =var.vpc_map["vpc_id"]
    sg_name = "node_was_sg"
}

resource "aws_eip" "was_eip" {
    vpc = true
    instance = aws_instance.node_was.id
}

resource "aws_key_pair" "was_key_pair" {
    key_name = "was_key_pair"
    public_key = file(var.key_pair_to_path["public"])
}

resource "aws_instance" "node_was" {
    ami = var.instance_map["ami"]
    instance_type = var.instance_map["type"]
    subnet_id = var.vpc_map["public_subnet_id"]

    key_name = aws_key_pair.was_key_pair.key_name

    vpc_security_group_ids = [module.was_sg.sg_id]

    connection {
      type = "ssh"
      host = coalesce(self.public_ip, self.private_ip)
      user = "ubuntu"
      private_key = file(var.key_pair_to_path["private"])
    }

    provisioner "remote-exec" {
      inline = [
            "sudo apt-get update",

            ## NginX
            "sudo apt-get install -y nginx",
            "sudo systemctl enable nginx",
            "sudo systemctl start nginx",

            ## Docker
            "sudo apt-get install -y docker.io",
            "sudo service docker start",

            ## Node
            "curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -",
            "sudo apt install -y nodejs",

            ## Git
            "sudo apt install -y git",
      ]
    }

    tags = {
        Name = "was_server"
    }
}
