export default class Client {
    static url = "http://localhost:5000/";

    static async get(route: string): Promise<any> {
        const response = await fetch(this.url + route);
        return await response.json();
    }
    static async post(route: string, requestBody: any): Promise<Response> {
        return await fetch(
            this.url + route,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
        );
    }
    static async update(route: string, requestBody: any): Promise<Response> {
        return await fetch(
            this.url + route,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
        );
    }
    static async delete(route: string): Promise<Response> {
        return await fetch(
            this.url + route,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}