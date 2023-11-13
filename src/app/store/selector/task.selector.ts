import { create } from 'd3';
import { AppState } from '../reducer/task.reducer';
import { createSelector } from '@ngrx/store';

export const selectAllTask = (state: AppState) => state.tasks;
export const selectTaskById = (id: number) =>
  createSelector(selectAllTask, (task) => task.find((task) => task.id === id));
