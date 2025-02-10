
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }
  const roleId = currentUser.roleId;
  const requestedRoute = state.url;
  if (requestedRoute === '/profile') {
    return true;
  }
  if (requestedRoute === '/demande' && roleId !== 1) {
    router.navigate(['/']);
    return false;
  }

  if ((requestedRoute === '/requestList' || requestedRoute === '/collectionsList') && roleId !== 2) {
    router.navigate(['/']);
    return false;
  }

  return true; 
};

