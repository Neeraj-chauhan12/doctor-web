const BASE_URL = process.env.BASE_URL || 'http://localhost:4000/api';

interface ApiResponse<T=any>{
    success: boolean;
    data:T,
    message?:string,
    meta?:any,
}

interface RequestOptions{
    headers?: Record<string, string>;
}

class HttpService{
    private getAuthHeaders() : Record<string,string>{
        const token=localStorage.getItem('token');
        return{
            'Content-Type':'application/json',
            ...(token && {'Authorization':`Bearer ${token}`})
        }
    }

    private getHeaders(auth:boolean=true):Record<string,string>{
        if(auth){
            return this.getAuthHeaders();
        }
        return {
            'Content-Type': 'application/json'
        };
    }

    private async makeRequest<T =any>(
        endpoint:string,
        method:string,
        body?:any,
        auth: boolean=true,
        options?:RequestOptions)
        : Promise<ApiResponse<T>>{
            try {
                const url=`${BASE_URL}/${endpoint}`;
                const headers={
                    ...this.getHeaders(auth),
                    ...options?.headers
                }

                const config:RequestInit={
                    method,
                    headers,
                    ...(body && {body: JSON.stringify(body)})
                }


                const response= await fetch(url, config);

                const data: ApiResponse<T>=await response.json();
                if(!response.ok){
                    throw new Error(data.message ||  `HTTP ${response.status} :${response.statusText}`)
                }
                return data;

                
            } catch (error) {
                console.error(`HTTP request failed [${method} ${endpoint}]:`,error);
                throw error;
                
            }
        }


        async getWithAuth<T=any>(endpoint:string, options?:RequestOptions):Promise<ApiResponse<T>>{
            return this.makeRequest<T>(endpoint, 'GET',null,true,options)
        }

           async postWithAuth<T= any>(endpoint:string,body:any, options?:RequestOptions):Promise<ApiResponse<T>>{
            return this.makeRequest<T>(endpoint, 'POST',body,true,options)
        }

           async putWithAuth<T= any>(endpoint:string,body:any, options?:RequestOptions):Promise<ApiResponse<T>>{
            return this.makeRequest<T>(endpoint, 'PUT',body,true,options)
        }

           async deleteWithAuth<T= any>(endpoint:string, options?:RequestOptions):Promise<ApiResponse<T>>{
            return this.makeRequest<T>(endpoint, 'DELETE',null,true,options)
        }
    
         async postWithOutAuth<T= any>(endpoint:string,body:any, options?:RequestOptions):Promise<ApiResponse<T>>{
            return this.makeRequest<T>(endpoint, 'POST',body,false,options)
        }

         async getWithOutAuth<T=any>(endpoint:string, options?:RequestOptions):Promise<ApiResponse<T>>{
            return this.makeRequest<T>(endpoint, 'GET',null,false,options)
        }
}


export const httpService=new HttpService();


export const getWithAuth=httpService.getWithAuth.bind(httpService);
export const postWithAuth=httpService.postWithAuth.bind(httpService);
export const putWithAuth=httpService.putWithAuth.bind(httpService);

export const deleteWithAuth=httpService.deleteWithAuth.bind(httpService);
export const postWithOutAuth =httpService.postWithOutAuth.bind(httpService);
export const getWithOutAuth=httpService.getWithOutAuth.bind(httpService);


export default httpService