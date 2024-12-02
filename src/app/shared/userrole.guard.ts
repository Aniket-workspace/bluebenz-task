import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userroleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const auth = localStorage.getItem("user");
  if (!auth) {
    router.navigate(["/signin"])
    alert("You are not logged in!");
    return false;
  }

  try {
    const user = JSON.parse(auth);
    if (user && user[0].role === "user") {
      return true;
    }
    router.navigate(["/admin"])
    alert("please login with user");

    return false;
  } catch (error) {
    console.error("Error parsing user data:", error);
    alert("Invalid user data");
    return false;
  }
};
