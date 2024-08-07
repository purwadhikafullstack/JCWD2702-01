export interface ISetSeasonalPrice {
    price: number,
    room_types_id: number,
    start_date: Date,
    end_date: Date
}

export interface ISetNonavailability {
    room_types_id: number,
    start_date: Date,
    end_date: Date
}