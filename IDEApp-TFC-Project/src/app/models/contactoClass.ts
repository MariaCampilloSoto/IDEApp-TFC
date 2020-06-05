import { ContactInterface } from './contacto';

export class Contacto implements ContactInterface{
    $key: string;
    tutor: string;
    address: string;
    phone: string;
    email: string;
}