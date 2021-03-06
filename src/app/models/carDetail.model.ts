export interface CarDetail {
    id: string;
    brand: string;
    model: string;
    colour: Colour;
    licensePlate: string;
    engineDescription: string;
    mileage: number;
    premiseName: string;
    rented: boolean | string;
    imagePath: string;
    colourName?: string;
    premiseId?: string;
}

export enum Colour {
    None = 0,
    Red,
    Green,
    Blue,
    Purple,
    Yellow,
    TurmericYellow,
    Orange,
    Brown,
    Gray,
    Pink,
    White,
    Black
}