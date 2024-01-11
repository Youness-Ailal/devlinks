import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "./store";

type DispatchFn = () => AppDispatch;

export const useAppDispatch: DispatchFn = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
