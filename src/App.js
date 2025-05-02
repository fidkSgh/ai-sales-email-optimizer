import React, { useState } from 'react';
import OpenAI from 'openai';
import SampleEmails from './SampleEmails'; // Import the new component

// Initialize OpenAI client (consider moving initialization outside component if needed)
// Ensure the API key is handled securely and not exposed client-side in production
// For CRA, environment variables need to start with REACT_APP_
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true // Necessary for client-side usage
});

function App() {
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_OPENAI_API_KEY || '');
  const [emailInput, setEmailInput] = useState('');
  const [tone, setTone] = useState('Friendly'); // Default tone
  const [optimizedEmail, setOptimizedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const tones = ['Friendly', 'Assertive', 'Persuasive', 'Formal', 'Casual']; // Example tones

  const handleOptimize = async () => {
    if (!apiKey) {
      setError('OpenAI API key is missing. Please add it to your .env file.');
      return;
    }
    if (!emailInput.trim()) {
      setError('Please enter the sales email.');
      return;
    }

    setIsLoading(true);
    setError('');
    setOptimizedEmail('');

    try {
        const prompt = `Rewrite this sales email to improve clarity, increase response rate, and apply a ${tone} tone. Keep the response concise and focused on the rewritten email text only:
\n---\n${emailInput}\n---
Optimized Email:`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Using a cost-effective and capable model
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7, // Adjust for creativity vs. predictability
            max_tokens: 500, // Limit response length
        });

        const result = response.choices[0]?.message?.content?.trim();
        if (result) {
            setOptimizedEmail(result);
        } else {
            setError('Failed to get a valid response from the AI.');
        }

    } catch (err) {
        console.error('OpenAI API Error:', err);
        setError(`Failed to optimize email. Error: ${err.message || 'Unknown error'}`);
    } finally {
        setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!optimizedEmail) return;
    navigator.clipboard.writeText(optimizedEmail)
      .then(() => {
        // Optional: Show a success message or change button text
        console.log('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        setError('Failed to copy text to clipboard.');
      });
  };

  // Function to handle selecting a sample email
  const handleSampleSelect = (sampleContent) => {
    setEmailInput(sampleContent);
    // Optional: scroll to the textarea or give focus
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 lg:p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">AI Sales Email Optimizer</h1>
      <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-white rounded-lg shadow-lg p-6 lg:p-8">
        <div className="w-full lg:w-2/3 lg:pr-6">
          {!apiKey && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded" role="alert">
              <p className="font-bold">Warning</p>
              <p>OpenAI API key not found. Please set REACT_APP_OPENAI_API_KEY in your .env file.</p>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Sales Email:
            </label>
            <textarea
              id="email-input"
              rows="8"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Paste your sales email here or use a sample..."
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="tone-select" className="block text-sm font-medium text-gray-700 mb-1">
              Select Tone:
            </label>
            <select
              id="tone-select"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              {tones.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="mb-6 text-center">
            <button
              onClick={handleOptimize}
              disabled={isLoading || !apiKey || !emailInput.trim()}
              className={`px-6 py-2.5 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
                isLoading || !apiKey || !emailInput.trim()
                  ? 'bg-indigo-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? 'Optimizing...' : 'Optimize Email'}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {optimizedEmail && (
            <div className="border-t border-gray-200 pt-4 mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Optimized Email:</h2>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 relative shadow-sm">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{optimizedEmail}</pre>
                <button
                    onClick={handleCopyToClipboard}
                    className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-600 p-1.5 rounded text-xs transition duration-150 ease-in-out"
                    title="Copy to clipboard"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>

        <SampleEmails onSampleSelect={handleSampleSelect} />
      </div>
    </div>
  );
}

export default App;
