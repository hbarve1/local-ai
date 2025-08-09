
import fetch from 'node-fetch';

class OllamaClient {
    constructor(baseUrl = 'http://localhost:11434') {
        this.baseUrl = baseUrl;
    }

    /**
     * Generate a completion using a specific model
     * @param {string} model
     * @param {string} prompt
     * @param {Object} options
     * @returns {Promise<Object>}
     */
    async generate(model, prompt, options = {}) {
        const requestBody = {
            model,
            prompt,
            stream: false,
            ...options,
        };
        try {
            const response = await fetch(`${this.baseUrl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error generating completion:', error);
            throw error;
        }
    }

    /**
     * List all available models
     * @returns {Promise<Object>}
     */
    async listModels() {
        try {
            const response = await fetch(`${this.baseUrl}/api/tags`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error listing models:', error);
            throw error;
        }
    }

    /**
     * Pull a model from the Ollama library (handles NDJSON response)
     * @param {string} model
     * @returns {Promise<Object>} - Last status object (usually {status: 'success'})
     */
    async pullModel(model) {
        try {
            const response = await fetch(`${this.baseUrl}/api/pull`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: model }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            const lines = text.split('\n').filter(Boolean).map(line => {
                try {
                    return JSON.parse(line);
                } catch (e) {
                    return { error: 'Invalid JSON', line };
                }
            });
            return lines[lines.length - 1];
        } catch (error) {
            console.error('Error pulling model:', error);
            throw error;
        }
    }

    /**
     * Get information about a specific model
     * @param {string} model
     * @returns {Promise<Object>}
     */
    async getModelInfo(model) {
        try {
            const response = await fetch(`${this.baseUrl}/api/show`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: model }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error getting model info:', error);
            throw error;
        }
    }

    /**
     * Create a chat completion (conversation)
     * @param {string} model
     * @param {Array} messages
     * @param {Object} options
     * @returns {Promise<Object>}
     */
    async chat(model, messages, options = {}) {
        const requestBody = {
            model,
            messages,
            stream: false,
            ...options,
        };
        try {
            const response = await fetch(`${this.baseUrl}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error in chat:', error);
            throw error;
        }
    }
}

// Example usage
async function main() {
    const ollama = new OllamaClient();
    try {
        console.log('Available models:');
        const models = await ollama.listModels();
        console.log(models);

        console.log('\nGenerating completion...');
        const completion = await ollama.generate('llama2:7b', 'Hello, how are you?', {
            temperature: 0.7,
            max_tokens: 100,
        });
        console.log('Completion:', completion);

        console.log('\nStarting chat...');
        const chatResponse = await ollama.chat('llama2:7b', [
            { role: 'user', content: 'What is the capital of France?' },
        ]);
        console.log('Chat response:', chatResponse);
    } catch (error) {
        console.error('Error in main:', error);
    }
}

export default OllamaClient;

if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}