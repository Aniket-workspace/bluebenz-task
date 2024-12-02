import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const auth = localStorage.getItem("user");
  if (!auth) {
    router.navigate(["/signin"])
    alert("You are not logged in!");
    return false;
  }

  try {
    const user = JSON.parse(auth);
    if (user && user[0].role === "admin") {
      return true;
    }
    debugger
    router.navigate(["/user"])
    alert("You don't have admin rights");

    return false;
  } catch (error) {
    console.error("Error parsing user data:", error);
    alert("Invalid user data");
    return false;
  }
};
