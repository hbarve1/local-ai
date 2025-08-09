import fetch from 'node-fetch';

class OllamaClient {
  constructor(baseUrl = 'http://localhost:11434') {
    this.baseUrl = baseUrl;
  }

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

export default OllamaClient;
