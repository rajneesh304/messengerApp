import PocketBase from "pocketbase";

import { writable } from "svelte/store";

const HOST = "http://127.0.0.1"
const PORT = "8090"
export const pb = new PocketBase(`${HOST}:${PORT}`);

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log('AuthStatus changed ', auth);
    currentUser.set(pb.authStore.model);
});