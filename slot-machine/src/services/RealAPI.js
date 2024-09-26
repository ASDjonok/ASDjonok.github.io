export default class RealAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }


    async init(uid) {
        // todo think about using other HTTP methods
        try {
            const response = await fetch(`${this.baseURL}/init?uid=${uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to initialize:', error);
            throw error;
        }
    }

    async spin(uid, bet) {
        // todo think about using other HTTP methods
        try {
            const response = await fetch(`${this.baseURL}/spin?uid=${uid}&bet=${bet}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to spin:', error);
            throw error;
        }
    }
}
