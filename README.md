# Ollama Local JavaScript Client

A lightweight JavaScript client for interacting with a local Ollama instance. It exposes a simple API to generate completions, chat with models, and manage your local Ollama installation.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Error Handling](#error-handling)
- [Common Issues](#common-issues)
- [License](#license)

## Prerequisites
1. **Ollama** – Install and run Ollama locally. Download from [ollama.ai](https://ollama.ai).
2. **Node.js** – The client is written in modern JavaScript (ESM). Node 18+ is recommended.

## Installation
```bash
npm install
```

Make sure at least one model is pulled, e.g.:
```bash
ollama pull llama2:7b

// OR

ollama run gpt-oss:20b
```

## Usage
### Importing the client
```js
import OllamaClient from './index.mjs';
```

### Creating a client instance
```js
const ollama = new OllamaClient(); // defaults to http://localhost:11434
```

### Generating a completion
```js
const response = await ollama.generate('llama2:7b', 'Hello, how are you?');
console.log(response.response);
```

### Chatting with a model
```js
const chatResponse = await ollama.chat('llama2:7b', [
  { role: 'user', content: 'What is the capital of France?' },
  { role: 'assistant', content: 'The capital of France is Paris.' },
  { role: 'user', content: 'What is its population?' }
]);
console.log(chatResponse.response);
```

### Listing available models
```js
const models = await ollama.listModels();
console.log(models);
```

### Pulling a new model
```js
const pullStatus = await ollama.pullModel('codellama');
console.log(pullStatus);
```

### Getting model information
```js
const modelInfo = await ollama.getModelInfo('llama2:7b');
console.log(modelInfo);
```

## API Reference
### `new OllamaClient([baseUrl])`
- **baseUrl** (string, optional): Base URL of the Ollama server. Defaults to `http://localhost:11434`.

#### `generate(model, prompt, options)`
- **model** (string): Model name.
- **prompt** (string): Prompt text.
- **options** (object, optional): Generation options (`temperature`, `max_tokens`, `top_p`, etc.).
- **Returns**: Parsed JSON response.

#### `chat(model, messages, options)`
- **model** (string): Model name.
- **messages** (Array): Conversation history.
- **options** (object, optional): Chat options.
- **Returns**: Parsed JSON response.

#### `listModels()`
- **Returns**: Array of available models.

#### `pullModel(model)`
- **model** (string): Model to pull.
- **Returns**: Status of the pull operation.

#### `getModelInfo(model)`
- **model** (string): Model name.
- **Returns**: Detailed model metadata.

## Error Handling
All methods throw an `Error` when the HTTP request fails or the server returns a non‑2xx status. Wrap calls in `try/catch`:
```js
try {
  const res = await ollama.generate('llama2:7b', 'Hello');
  console.log(res);
} catch (err) {
  console.error('Error:', err.message);
}
```

## Common Issues
| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `ECONNREFUSED` | Ollama not running | Start Ollama (`ollama serve`) |
| `model not found` | Model not pulled | `ollama pull <model>` |
| Port conflict | Another process uses 11434 | Stop the other process or change `baseUrl` |

## License
ISC © 2025 hbarve1