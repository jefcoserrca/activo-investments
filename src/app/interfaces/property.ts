import { Coords } from './coords';

export interface Property {
    id?: string;
    address: string;
    amenities: Array <any>;
    area: number;
    rooms: number;
    baths: number;
    description: string;
    youtubeUrl: string;
    price: number;
    type: string;
    typeProperty: string;
    suburb: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coords: Coords;
    images: string [];
    uid: string;
}
