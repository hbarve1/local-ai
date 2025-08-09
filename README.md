# Ollama Local JavaScript Client

A JavaScript client for interacting with a local Ollama setup. This package provides a simple interface to generate completions, chat with models, and manage your local Ollama installation.

## Prerequisites

1. **Install Ollama**: Make sure you have Ollama installed and running locally. You can download it from [ollama.ai](https://ollama.ai)

2. **Start Ollama**: Ensure Ollama is running on your system. By default, it runs on `http://localhost:11434`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure you have at least one model pulled. For example:
```bash
ollama pull llama2:7b
```

## Usage

### Basic Usage

```javascript
import OllamaClient from './index.js';

const ollama = new OllamaClient();

// Generate a completion
const response = await ollama.generate('llama2:7b', 'Hello, how are you?');
console.log(response.response);
```

### Available Methods

#### 1. Generate Completions
```javascript
const completion = await ollama.generate('llama2:7b', 'Your prompt here', {
    temperature: 0.7,
    max_tokens: 100,
    top_p: 0.9
});
```

#### 2. Chat Conversations
```javascript
const chatResponse = await ollama.chat('llama2:7b', [
    { role: 'user', content: 'What is the capital of France?' },
    { role: 'assistant', content: 'The capital of France is Paris.' },
    { role: 'user', content: 'What is its population?' }
]);
```

#### 3. List Available Models
```javascript
const models = await ollama.listModels();
console.log(models);
```

#### 4. Pull a New Model
```javascript
const pullStatus = await ollama.pullModel('codellama');
console.log(pullStatus);
```

#### 5. Get Model Information
```javascript
const modelInfo = await ollama.getModelInfo('llama2:7b');
console.log(modelInfo);
```

### Running the Example

```bash
npm start
```

This will run the example code that demonstrates all the available methods.

## Configuration

You can customize the Ollama server URL when creating the client:

```javascript
const ollama = new OllamaClient('http://your-ollama-server:11434');
```

## API Reference

### OllamaClient Constructor
- `baseUrl` (string, optional): The base URL of your Ollama server. Defaults to `http://localhost:11434`

### Methods

#### `generate(model, prompt, options)`
Generates a completion using the specified model.

- `model` (string): The model name to use
- `prompt` (string): The input prompt
- `options` (object, optional): Additional generation options like temperature, max_tokens, etc.

#### `chat(model, messages, options)`
Creates a chat completion with conversation history.

- `model` (string): The model name to use
- `messages` (array): Array of message objects with `role` and `content`
- `options` (object, optional): Additional chat options

#### `listModels()`
Returns a list of all available models.

#### `pullModel(model)`
Pulls a model from the Ollama library.

- `model` (string): The model name to pull

#### `getModelInfo(model)`
Gets detailed information about a specific model.

- `model` (string): The model name

## Error Handling

All methods include proper error handling and will throw descriptive errors if something goes wrong. Make sure to wrap your calls in try-catch blocks:

```javascript
try {
    const response = await ollama.generate('llama2:7b', 'Hello');
    console.log(response);
} catch (error) {
    console.error('Error:', error.message);
}
```

## Common Issues

1. **Connection refused**: Make sure Ollama is running on your system
2. **Model not found**: Pull the model first using `ollama pull <model-name>`
3. **Port already in use**: Check if Ollama is running on a different port

## License

ISC 