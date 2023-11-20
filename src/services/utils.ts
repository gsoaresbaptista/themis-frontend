import { get } from "./api";

export async function LoadMessages() {
    return await get('/messages');
}

