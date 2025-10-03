import type { ReactNode } from "react";

type Props<T> = {
  isLoading: boolean;
  isError: boolean;
  data: T | undefined;
  LoadingComponent?: ReactNode;
  ErrorComponent?: ReactNode;
  children: (data: T) => ReactNode;
  EmptyComponent?: ReactNode;
};

export const AsyncBoundary = <T,>({
  isLoading,
  isError,
  data,
  LoadingComponent,
  ErrorComponent,
  EmptyComponent,
  children,
}: Props<T>): React.ReactElement | null => {
  const isEmpty = Array.isArray(data) && data.length === 0;
  if (isLoading) return <>{LoadingComponent}</>;
  if (isError || !data) return <>{ErrorComponent}</>;
  if (isEmpty) return <>{EmptyComponent}</>;
  return <>{children(data)}</>;
};
