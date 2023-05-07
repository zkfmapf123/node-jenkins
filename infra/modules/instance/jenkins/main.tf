module "jenkins_sg" {
    source ="../../sg/jenkins"
    vpc_id = var.vpc_map["vpc_id"]
    sg_name = "jenkins_sg"
}

resource "aws_eip" "jenkins_eip" {
    vpc = true
    instance = aws_instance.jenkins.id
}

resource "aws_key_pair" "jenkins_key_pair" {
    key_name = "jenkins_key_pair"
    public_key = file(var.key_pair_to_path["public"])
}

resource "aws_instance" "jenkins" {
    ami = var.instance_map["ami"]
    instance_type = var.instance_map["type"]
    subnet_id = var.vpc_map["public_subnet_id"]

    key_name = aws_key_pair.jenkins_key_pair.key_name

    vpc_security_group_ids = [module.jenkins_sg.sg_id]

    connection {
        type = "ssh"
        host = coalesce(self.public_ip, self.private_ip)
        user = "ubuntu"
        private_key = file(var.key_pair_to_path["private"])
    }

    # provisioner "remote-exec" {
    #     inline = [
    #         "sudo apt-get update",
    #         "sudo apt install openjdk-11-jdk",
    #         "wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -",
    #         "sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'",
    #         "sudo apt-get update",
    #         "sudo apt install jenkins",
    #         "sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 9B7D32F2D50582E6",
    #         "sudo systemctl start jenkins"
    #     ]
    # }

    tags ={
        Name = "jenkins_server"
    }
}