export interface SensorResponse {
    error: boolean;
    data: SensorData;
}

interface SensorData {
    min: number;
    max: number;
    status: boolean;
}
