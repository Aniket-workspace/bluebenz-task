import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const signinGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject the Router
  const auth = localStorage.getItem("user");

  if (auth) {
    try {
      const user = JSON.parse(auth); // Parse the user object
      if (user.role === "admin") {
        router.navigate(['/admin']); // Redirect to admin dashboard
      } else {
        router.navigate(['/user']); // Redirect to user dashboard
      }
      return false; // Prevent access to the route
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user"); // Clear corrupted data
    }
  }

  return true;
};
