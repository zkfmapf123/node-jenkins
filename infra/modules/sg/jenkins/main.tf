variable "vpc_id" {}
variable "sg_name" {}

resource "aws_security_group" "jenkins_sg" { 
  name = var.sg_name
  vpc_id = var.vpc_id

  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port = 8080
    to_port   = 8080
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "jenkins_sg"
  }
}

output "sg_id" {
    value = aws_security_group.jenkins_sg.id
}