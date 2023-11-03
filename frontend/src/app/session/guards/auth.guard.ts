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