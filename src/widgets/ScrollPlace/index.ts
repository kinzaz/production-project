export { ScrollPlace } from './ui/ScrollPlace';
export type { ScrollPlaceSchema } from './model/types/ScrollPlaceSchema';
export { getScrollPlace, getScrollPlaceByPath } from './model/selectors';
export {
  scrollPlaceReducer,
  scrollPlaceActions,
} from './model/slices/ScrollPlaceSlice';
