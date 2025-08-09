
import OllamaClient from './ollamaClient.mjs';


describe('OllamaClient API', () => {
  const ollama = new OllamaClient();

  test('should list available models', async () => {
    const models = await ollama.listModels();
    expect(models).toHaveProperty('models');
    expect(Array.isArray(models.models)).toBe(true);
  });

  test('should generate a completion', async () => {
    const response = await ollama.generate('llama2:7b', 'Say hello', { max_tokens: 10 });
    expect(response).toHaveProperty('response');
    expect(typeof response.response).toBe('string');
  });

  test('should chat with the model', async () => {
    const chatResponse = await ollama.chat('llama2:7b', [
      { role: 'user', content: 'What is 2+2?' }
    ]);
    expect(chatResponse).toHaveProperty('message');
    expect(chatResponse.message).toHaveProperty('content');
  });

  test('should get model info', async () => {
    const info = await ollama.getModelInfo('llama2:7b');
    expect(info).toHaveProperty('modelfile');
  });

  test('should handle error for non-existent model', async () => {
    await expect(ollama.generate('non-existent-model', 'test')).rejects.toThrow();
  });
});
