export interface HistoryResponse {
    error: boolean;
    data: HistoryData;
    page: number;
    total_pages: number;
}

export interface HistoryData {
    histories: HistoryItem[];
}

export interface HistoryItem {
    'date:': string; 
    log: LogItem[];
}

export interface LogItem {
    time: string;
    temperature: number;
    temperature_status: boolean;
    ph: number;
    ph_status: boolean;
    salinity: number;
    salinity_status: boolean;
    turbidity: number;
    turbidity_status: boolean;
}