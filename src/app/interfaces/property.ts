import { Coords } from 'ngx-owl-carousel-o/lib/services/carousel.service';

export interface Property {
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
