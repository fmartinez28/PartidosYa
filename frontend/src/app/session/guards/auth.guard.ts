import { inject } from "@angular/core";
import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { tap, of, Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

export const isUserLogged: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    return of(authService.checkIfLoggedIn())
        .pipe(
            tap((isLogged) => {
                if (!isLogged) router.navigate(['/session/login']);
            })
        );
}

export const isUserNotLogged: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    return of(!authService.checkIfLoggedIn())
        .pipe(
            tap((isLogged) => {
                if (!isLogged) router.navigate(['/']);
            })
        );
}

export const isNotUserAdmin: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    return of(authService.checkIfAdmin())
        .pipe(
            tap((isAdmin) => {
                if (!isAdmin) router.navigate(['/']);
            })
        );
}

export const isNotUserJugador: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    return of(authService.checkIfJugador())
        .pipe(
            tap((isJugador) => {
                if (!isJugador) router.navigate(['/']);
            })
        );
}

export const isNotUserPropietario: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    return of(authService.checkIfPropietario())
        .pipe(
            tap((isPropietario) => {
                if (!isPropietario) router.navigate(['/']);
            })
        );
}