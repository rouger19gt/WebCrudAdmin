class Utiles{

    static getCookie = (name: string): string | null => {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [key, val] = cookie.split("=");
            if (key === name) return decodeURIComponent(val);
        }
        return null;
    };

    static  deleteCookie = (name: string) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };
}

export default Utiles;