import { GraphQLSubscription } from '@aws-amplify/api';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

export function subscribe<T>(options: {
  query: string;
  variables?: Record<string, any>;
  onNext: (value: T) => void;
  onError?: (error: any) => void;
}) {
  const { query, variables, onNext, onError } = options;

  return client.graphql({
    query,
    variables,
  } as GraphQLSubscription<T>).subscribe({
    next: (result: { data: T }) => onNext(result.data),
    error: onError
  });
}
