import fetch from 'node-fetch';

class OllamaClient {
    constructor(baseUrl = 'http://localhost:11434') {
        this.baseUrl = baseUrl;
    }

    /**
     * Generate a completion using a specific model
     * @param {string} model - The model name to use
     * @param {string} prompt - The input prompt
     * @param {Object} options - Additional options for generation
     * @returns {Promise<Object>} - The generated response
     */
    async generate(model, prompt, options = {}) {
        const requestBody = {
            model: model,
            prompt: prompt,
            stream: false, // Disable streaming for simpler response handling
            ...options
        };

        try {
            const response = await fetch(`${this.baseUrl}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
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
     * @returns {Promise<Object>} - List of models
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
     * Pull a model from the Ollama library
     * @param {string} model - The model name to pull
     * @returns {Promise<Object>} - Pull status
     */
async pullModel(model) {
    try {
        const response = await fetch(`${this.baseUrl}/api/pull`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: model })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        // Split by newlines, filter out empty lines, and parse each as JSON
        const lines = text.split('\n').filter(Boolean).map(line => {
            try {
                return JSON.parse(line);
            } catch (e) {
                return { error: 'Invalid JSON', line };
            }
        });

        // Return the last status (usually {"status":"success"})
        return lines[lines.length - 1];
    } catch (error) {
        console.error('Error pulling model:', error);
        throw error;
    }
}

    /**
     * Get information about a specific model
     * @param {string} model - The model name
     * @returns {Promise<Object>} - Model information
     */
    async getModelInfo(model) {
        try {
            const response = await fetch(`${this.baseUrl}/api/show`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: model })
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
     * @param {string} model - The model name to use
     * @param {Array} messages - Array of message objects with role and content
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} - The chat response
     */
    async chat(model, messages, options = {}) {
        const requestBody = {
            model: model,
            messages: messages,
            stream: false, // Disable streaming for simpler response handling
            ...options
        };

        try {
            const response = await fetch(`${this.baseUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
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
        // List available models
        console.log('Available models:');
        const models = await ollama.listModels();
        console.log(models);

        // Example: Generate a simple completion
        console.log('\nGenerating completion...');
        const completion = await ollama.generate('llama2:7b', 'Hello, how are you?', {
            temperature: 0.7,
            max_tokens: 100
        });
        console.log('Completion:', completion);

        // Example: Chat conversation
        console.log('\nStarting chat...');
        const chatResponse = await ollama.chat('llama2:7b', [
            { role: 'user', content: 'What is the capital of France?' }
        ]);
        console.log('Chat response:', chatResponse);

    } catch (error) {
        console.error('Error in main:', error);
    }
}

// Export the class for use in other modules
export default OllamaClient;

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
} 