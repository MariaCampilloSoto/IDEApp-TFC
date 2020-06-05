import { UserInterface } from './user';

export class User implements UserInterface{
    $key: string;
    name: string;
    surname1: string;
    surname2?: string;
    email: string;
    password: string;
    contactInformation?: import("./contacto").ContactInterface[];
    dni?: string;
    phone?: string;
    address?: string;
    department?: import("./department").Department;
    active?: boolean;
    role: import("./user").Role;
}