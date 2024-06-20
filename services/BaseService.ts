import storage, {mmkvStorage} from "../store/storage";


class AppService {

    static getHeaders = (isFile?: boolean): Headers => {
        const headers: Headers = new Headers();
        if (!isFile) {
            headers.append('Content-Type', 'application/json');
        }
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Origin', '*');
        headers.append('Credentials', 'same-origin');

        const lang = mmkvStorage.getString('lang') || 'fr';
        headers.append('lang', lang);
        return headers;
    };


    static getHeadersAuth = (isFile?: boolean): Headers => {
        const headers = AppService.getHeaders(isFile);
        const token = mmkvStorage.getString('token') ? mmkvStorage.getString('token') : '';
        if (!token) {
            window.location.reload();
        }
        headers.append('Authorization', `Bearer ${token}`);
        return headers;
    };


    static handleRequest = async (
        method: string,
        url: string,
        body: object | FormData | null,
        required_auth: boolean
    ) => {
        const headers = required_auth ? AppService.getHeadersAuth(body instanceof FormData) : AppService.getHeaders(body instanceof FormData);

        const requestOptions: RequestInit = {
            method: method.toUpperCase(),
            headers: headers,
            mode: 'cors',
            cache: 'default',
            ...(method.toUpperCase() === 'GET'  ? {} : {body: body instanceof FormData ? body : JSON.stringify(body)} ),
        };

        try {
            const response = await fetch(url, requestOptions);
            return response;
        } catch (error) {
            console.error('Request failed:', error);
            throw error;
        }
    };

    static getRequest = async (url: string, required_auth: boolean) => {
        return AppService.handleRequest('GET', url, null, required_auth);
    };

    static postRequest = async (
        url: string,
        body: object,
        required_auth: boolean
    ) => {
        return AppService.handleRequest('POST', url, body, required_auth);
    };

    static postFileRequest = async (
        url: string,
        body: FormData,
        required_auth: boolean
    ) => {
        return AppService.handleRequest('POST', url, body, required_auth);
    };

    static putRequest = async (
        url: string,
        body: object,
        required_auth: boolean
    ) => {
        return AppService.handleRequest('PUT', url, body, required_auth);
    };

    static putFileRequest = async (
        url: string,
        body: FormData,
        required_auth: boolean
    ) => {
        return AppService.handleRequest('PUT', url, body, required_auth);
    };

    static patchRequest = async (
        url: string,
        body: object,
        required_auth: boolean
    ) => {
        return AppService.handleRequest('PATCH', url, body, required_auth);
    };

    static deleteRequest = async (
        url: string,
        body: object,
        required_auth: boolean
    ) => {
        return AppService.handleRequest('DELETE', url, body, required_auth);
    };

    static getToken = (): string => {
        return mmkvStorage.getString('token') || '';
    };
}

export default AppService;