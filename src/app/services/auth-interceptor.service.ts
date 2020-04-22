import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export class AuthInterceptorService implements HttpInterceptor {

    constructor(private cookie: CookieService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.cookie.get('token');
        if (!token) {
            throw new Error("Session expired!");
        }

        return next.handle(req.clone({
            headers: req.headers.append('Auth', token)
        }));
    }
}