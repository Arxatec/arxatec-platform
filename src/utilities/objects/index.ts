export function mapToOptions<T extends Record<string, string>>(obj: T) {
  return Object.entries(obj).map(([value, label]) => ({
    label,
    value: String(value),
  }));
}
