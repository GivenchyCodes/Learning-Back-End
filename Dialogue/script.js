/* script.js */
// IMPORTANT: Replace this with your actual key from https://aistudio.google.com/
const API_KEY = 'AIzaSyCcXmowt7UqDexb5c8Y_oNcFD_9ppIP4PM';

// 1. FIXED URL: Must include the model name and action (:generateContent)
const API_URL = `https://googleapis.com{AIzaSyCcXmowt7UqDexb5c8Y_oNcFD_9ppIP4PM}`;

async function sendMessage() {
  const inputField = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const userText = inputField.value.trim();

  if (!userText) return;

  // Display User Message
  chatBox.innerHTML += `<div style="margin-bottom:10px;"><b>You:</b> ${userText}</div>`;
  inputField.value = '';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userText }] }],
      }),
    });

    const data = await response.json();

    // 2. FIXED DATA PATH: Standard Gemini response structure
    // Access: candidates -> first item [0] -> content -> parts -> first item [0] -> text
    if (data.candidates && data.candidates[0].content) {
      const aiResponse = data.candidates[0].content.parts[0].text;

      chatBox.innerHTML += `<div style="margin-bottom:10px; color:#cce1f2;"><b>Gemini:</b> ${aiResponse}</div>`;
    } else {
      // Handle blocked responses or errors from the API itself
      chatBox.innerHTML += `<div style="color:orange;">Gemini: I couldn't process that (it might be blocked).</div>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    chatBox.innerHTML += `<div style="color:red;">Error: Check your API Key or connection.</div>`;
  }
}
