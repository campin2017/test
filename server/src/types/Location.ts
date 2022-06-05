export interface InputGetLocation {
    zip_code: string;
}

interface Location {
    zip_code: string;
    city: string;
    country: string;
}

export interface InputCreateLocation {
    data: Location
}

