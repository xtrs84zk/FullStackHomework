import LinearProgress from "@mui/material/LinearProgress";
import type { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import type { GridSlotsComponent } from "@mui/x-data-grid";
import type { UncapitalizeObjectKeys } from "@mui/x-data-grid/internals";

export const LOGIN = '/login';
export const REWARDS = '/';
export const MANAGE_PATH = '/manage';

export const USER_KEY = 'user';


const initialState = { sorting: { sortModel: [{ field: 'name', sort: 'asc' }] } } satisfies GridInitialStateCommunity;

const slots = {
  loadingOverlay: LinearProgress,
} satisfies UncapitalizeObjectKeys<Partial<GridSlotsComponent>>;

export const dataGridProps = { initialState, slots };