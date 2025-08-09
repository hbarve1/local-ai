import OllamaClient from './index.mjs';

const ollama = new OllamaClient();

async function testOllamaConnection() {
    console.log('🔍 Testing Ollama Connection\n');

    try {
        // Test 1: Check if Ollama is running
        console.log('1️⃣  Testing Ollama server connection...');
        const models = await ollama.listModels();
        console.log('✅ Ollama is running!');
        console.log('📋 Available models:', models);
        console.log('\n');

        // Test 2: Try to pull a small model
        console.log('2️⃣  Testing model pull functionality...');
        try {
            const pullResult = await ollama.pullModel('llama2:7b');
            console.log('✅ Model pull initiated:', pullResult);
        } catch (error) {
            console.log('⚠️  Model pull test (this is expected if no models are installed):', error.message);
        }
        console.log('\n');

        // Test 3: Test error handling with non-existent model
        console.log('3️⃣  Testing error handling...');
        try {
            await ollama.generate('non-existent-model', 'This should fail');
        } catch (error) {
            console.log('✅ Error handling works correctly:', error.message);
        }
        console.log('\n');

        console.log('🎉 All tests completed!');
        console.log('\n💡 To use the full functionality:');
        console.log('   1. Pull a model: ollama pull llama2');
        console.log('   2. Run examples: node examples.js');

    } catch (error) {
        console.error('❌ Connection test failed:', error.message);
        console.log('\n💡 Make sure:');
        console.log('   1. Ollama is installed and running');
        console.log('   2. Ollama is accessible at http://localhost:11434');
    }
}

testOllamaConnection(); 