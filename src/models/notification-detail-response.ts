export interface NotificationDetailResponse {
    error: boolean;
    data: NotificationDetail;
}

export interface NotificationDetail {
    id: string;
    timestamp: string;
    read: boolean;
    level: string;
    title: string;
    body: string;
}