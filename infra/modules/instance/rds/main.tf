resource "aws_db_subnet_group" "db_subnet_group" {
    name = "rds_subnet_group"
    subnet_ids = [var.private_subnet_id]
}

resource "aws_db_instance" "auth_rds" {
    engine = "mysql"
    instance_class ="db.t2.micro"
    db_name = "auth"
    username = "admin"
    password = "1234"
    db_subnet_group_name = aws_db_subnet_group.db_subnet_group.name
    allocated_storage = 10
    storage_type = "gp2"
}