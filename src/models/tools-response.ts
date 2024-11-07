export interface ToolsResponse {
    error: boolean;
    data: ToolsData;
}

interface ToolsData {
    aerator: AeratorData;
    feeder: FeederData;
}

interface AeratorData {
    off_minutes_before: number;
    on_minutes_after: 25;
}

interface FeederData {
    schedule_1: FeederSchedule;
    schedule_2: FeederSchedule;
    schedule_3: FeederSchedule;
    schedule_4: FeederSchedule;
}

interface FeederSchedule {
    amount: number;
    time: string;
}