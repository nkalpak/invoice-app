/**
 * Use to extract the inner type of a promise.
 *
 * ## Example
 *
 * ```
 *  type StringPromise = Promise<string>;
 *  // type of 'UnwrappedString' is 'string'
 *  type UnwrappedString = UnwrapPromise<StringPromise>;
 * ```
 * */
import { UseMutationOptions, UseQueryOptions } from "react-query";

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

/**
 * Generic callable function.
 * Use instead of 'Function' because 'Function' is less type safe
 * and accepts class declarations as well as normal, callable functions.
 * */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericFn = (...args: any[]) => any;

/**
 * Use to extract the mutation options from a mutation function.
 * Useful when you wrap `useMutation` in a custom hook, and want to pass options.
 *
 * ## Example
 *
 * ```
 *  function makeApiCall(args: string[]): string {}
 *  function useCustomMutation(options: InferMutationOptions<typeof makeApiCall>) {
 *    // 'options' will be inferred to be the type of React Query's mutation options
 *    options
 *  }
 * ```
 * */
export type InferMutationOptions<
  T extends GenericFn,
  TError = Error,
  TContext = unknown
> = UseMutationOptions<
  UnwrapPromise<ReturnType<T>>,
  TError,
  Parameters<T>[0],
  TContext
>;

export type InferQueryOptions<T extends GenericFn> = Omit<
  UseQueryOptions<
    UnwrapPromise<ReturnType<T>>,
    Error,
    UnwrapPromise<ReturnType<T>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >,
  "queryFn" | "queryKey"
>;
