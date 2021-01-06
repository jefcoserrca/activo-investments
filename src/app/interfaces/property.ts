import { Coords } from './coords';

export interface Property {
    id?: string;
    title: string;
    address: string;
    amenities: Array <any>;
    area: number;
    builderArea?: number;
    rooms: number;
    baths: number;
    createdAt?: Date;
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
