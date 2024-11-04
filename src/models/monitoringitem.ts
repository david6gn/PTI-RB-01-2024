export interface Monitoringitem {
    sensorName: string;
    sensorStatus: boolean;
    sensorValue: string;
    sensorHistory: number;
    chartId: number;
}

export interface sensordata {
    datetime: string;
    value: number;
}
