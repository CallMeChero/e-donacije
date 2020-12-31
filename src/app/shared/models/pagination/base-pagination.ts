export interface IBasePagination<TEntry> {
  readonly count: number;
  readonly previous: string;
  readonly next: string;
  readonly results: TEntry[];
}
