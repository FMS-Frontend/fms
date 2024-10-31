// const userRole = 'superuser';

export function checkUserRole(role: string) {
  if (role === "superuser") {
    return "superuser";
  } else if (role === "admin") {
    return "admin";
  }
}
