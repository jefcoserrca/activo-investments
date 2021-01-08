export interface User {
    $key?: string;
    name: string;
    email: string;
    role: string;
    imgProfile?: string;
    billingInfo?: BillingInfo;
    description?: string;
    phone?: number;
    ranking?: number;
}

export interface BillingInfo {
    name: string;
    email: string;
    RFC: string;
    businessName: string;
    street: string;
    suburb: string;
    zipCode: string;
    city: string;
    country: string;
}
