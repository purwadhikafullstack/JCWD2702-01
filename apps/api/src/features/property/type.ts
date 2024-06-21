export interface ISetSeasonalPrice {
    uid: string,
    price: number,
    room_types_id: number,
    start_date: Date,
    end_date: Date
}