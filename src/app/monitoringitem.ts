export interface Monitoringitem {
    sensorName: string,
    sensorStatus: boolean,
    sensorValue: string,
    sensorHistory?: sensordata[]
}

export interface sensordata {
    datetime: string,
    value: number
}
