import { StateSchema } from '@/app/providers/StoreProvider';

export const getScrollPlace = (state: StateSchema) => state.scrollPlace.scroll;

export const getScrollPlaceByPath = (state: StateSchema, path: string) =>
    state.scrollPlace.scroll[path];
