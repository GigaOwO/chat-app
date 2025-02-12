import { Observable } from 'zen-observable-ts';

export type SubscriptionResponse<T> = Observable<{
  value: { data: T };
  provider: unknown;
}>;

export interface SubscriptionEvent<T> {
  data: T;
  provider?: unknown;
}

export type SubscriptionCallback<T> = (event: SubscriptionEvent<T>) => void;

export interface SubscriptionOptions<T> {
  query: string;
  variables?: Record<string, unknown>;
  callback: SubscriptionCallback<T>;
}
