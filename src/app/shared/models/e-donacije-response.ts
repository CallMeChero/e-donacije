export interface EDonacijeResponse<TEntry> {
  readonly error: string[];
  readonly response: {
    code: number;
    data: TEntry;
  };
}


