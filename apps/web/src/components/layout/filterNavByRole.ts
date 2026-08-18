export const filterNavByRole = <T>(
  items: T[],
  _roles: string[],
): T[] => items;

export const resolveUserRoles = (
  _user: unknown,
): string[] => [];