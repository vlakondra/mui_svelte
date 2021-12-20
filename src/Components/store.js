import { writable } from 'svelte/store';

export const section_url = writable("");
export const is_run = writable(true);
export const section_data = writable([])
export const finded = writable("");