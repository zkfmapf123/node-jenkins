variable "vpc_map" {
    type = map(string)

    default = {
        vpd_id = null
        subnet_id = null
    }
}

variable "key_pair_to_path" {
    type = map(string)
}

variable "instance_map" {
    type = map(string)

    default = {
        type = null
        ami = null
    }
}

