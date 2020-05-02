export interface Car {
    id: string;
    brand: string;
    model: string;
    colour: Colour;
    licensePlate: string;
    engineDescription: string;
    mileage: number;
    premiseId: string;
    premise: string;
    reningId: string;
    renting: string;
    colourName?:string;
    rented?:string;
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