export interface NotificationResponse {
    error: boolean;
    data: NotificationData;
}

export interface NotificationData {
    notifications: NotificationItem[];
}

export interface NotificationItem {
    id: string;
    timestamp: string;
    read: boolean;
    level: string;
    title: string;
}