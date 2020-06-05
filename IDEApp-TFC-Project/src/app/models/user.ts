import { ContactInterface } from './contacto';
import {Department} from './department';

export interface Role {
    editor?: boolean; // crear usuario, editar info de contacto
    admin?: boolean; // todos los permisos
    teacher?: boolean;
    // si no tiene ninguno de estos es que es student
}

export interface UserInterface {
    $key: string;
    name: string;
    surname1: string;
    surname2: string;
    email: string;
    password: string;
    // strudent info
    contactInformation?: ContactInterface[];
    // teacher info
    dni?: string;
    phone?: string;
    address?: string;
    department?: Department;
    active?: boolean;
    role: Role;
}