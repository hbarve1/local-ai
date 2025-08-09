import OllamaClient from './ollamaClient.mjs';

// Create an instance of the Ollama client
const ollama = new OllamaClient();

async function runExamples() {
    console.log('🚀 Starting Ollama JavaScript Client Examples\n');

    try {
        // Example 1: List available models
        console.log('📋 Example 1: Listing available models');
        console.log('=====================================');
        const models = await ollama.listModels();
        console.log('Available models:', JSON.stringify(models, null, 2));
        console.log('\n');

        // Example 2: Simple text generation
        console.log('💬 Example 2: Simple text generation');
        console.log('===================================');
        const simpleResponse = await ollama.generate('llama2:7b', 'Write a haiku about programming');
        console.log('Response:', simpleResponse.response);
        console.log('\n');

        // Example 3: Generation with parameters
        console.log('⚙️  Example 3: Generation with custom parameters');
        console.log('==============================================');
        const customResponse = await ollama.generate('llama2:7b', 'Explain quantum computing in simple terms', {
            temperature: 0.3,
            max_tokens: 150,
            top_p: 0.9,
            top_k: 40
        });
        console.log('Response:', customResponse.response);
        console.log('\n');

        // Example 4: Chat conversation
        console.log('💭 Example 4: Chat conversation');
        console.log('===============================');
        const chatResponse = await ollama.chat('llama2:7b', [
            { role: 'user', content: 'What are the benefits of learning JavaScript?' },
            { role: 'assistant', content: 'JavaScript is a versatile programming language that runs in browsers and on servers. It\'s essential for web development.' },
            { role: 'user', content: 'What about TypeScript?' }
        ]);
        console.log('Chat response:', chatResponse.message.content);
        console.log('\n');

        // Example 5: Multi-turn conversation
        console.log('🔄 Example 5: Multi-turn conversation');
        console.log('=====================================');
        let conversation = [
            { role: 'user', content: 'Let\'s play a game. I\'m thinking of a number between 1 and 10.' }
        ];
        
        const firstTurn = await ollama.chat('llama2:7b', conversation);
        console.log('AI:', firstTurn.message.content);
        
        conversation.push(firstTurn.message);
        conversation.push({ role: 'user', content: 'Is it 7?' });
        
        const secondTurn = await ollama.chat('llama2:7b', conversation);
        console.log('AI:', secondTurn.message.content);
        console.log('\n');

        // Example 6: Creative writing
        console.log('✍️  Example 6: Creative writing');
        console.log('===============================');
        const creativeResponse = await ollama.generate('llama2:7b', 
            'Write a short story about a robot who discovers emotions. Make it touching and under 100 words.', {
            temperature: 0.8,
            max_tokens: 200
        });
        console.log('Creative story:', creativeResponse.response);
        console.log('\n');

        // Example 7: Code generation
        console.log('💻 Example 7: Code generation');
        console.log('=============================');
        const codeResponse = await ollama.generate('llama2:7b', 
            'Write a JavaScript function that reverses a string without using the built-in reverse method', {
            temperature: 0.2,
            max_tokens: 150
        });
        console.log('Code:', codeResponse.response);
        console.log('\n');

        // Example 8: Error handling demonstration
        // console.log('⚠️  Example 8: Error handling');
        // console.log('=============================');
        // try {
        //     await ollama.generate('non-existent-model', 'This should fail');
        // } catch (error) {
        //     console.log('Caught error:', error.message);
        // }
        // console.log('\n');

        console.log('✅ All examples completed successfully!');

    } catch (error) {
        console.error('❌ Error running examples:', error.message);
        console.log('\n💡 Make sure:');
        console.log('   1. Ollama is running on your system');
        console.log('   2. You have at least one model pulled (e.g., ollama pull llama2)');
        console.log('   3. The model name in the examples matches your available models');
    }
}

// Example of using a different Ollama server
async function customServerExample() {
    console.log('\n🌐 Custom Server Example');
    console.log('========================');
    
    // Example with a different server URL
    const customOllama = new OllamaClient('http://localhost:11434');
    
    try {
        const response = await customOllama.generate('llama2:7b', 'Hello from custom server!');
        console.log('Custom server response:', response.response);
    } catch (error) {
        console.error('Custom server error:', error.message);
    }
}

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runExamples().then(() => {
        return customServerExample();
    }).catch(console.error);
}

export { runExamples, customServerExample }; 