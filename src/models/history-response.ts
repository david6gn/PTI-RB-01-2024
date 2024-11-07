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
    date: string; 
    log: LogItem[];
}

export interface LogItem {
    time: string;
    temperature: number;
    temperature_status: boolean;
    temperature_info: string;
    ph: number;
    ph_status: boolean;
    ph_info: string;
    salinity: number;
    salinity_status: boolean;
    salinity_info: string;
    turbidity: number;
    turbidity_status: boolean;
    turbidity_info: string;
}