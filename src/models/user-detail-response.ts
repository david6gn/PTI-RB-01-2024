import { UserItem } from "./user-response";

export interface UserDetailResponse {
    error: boolean;
    data: UserItem;
}