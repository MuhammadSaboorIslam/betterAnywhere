// Inject an external script into the webpage
function injectScript(filePath, callback) {
   const script = document.createElement('script');
   script.src = chrome.runtime.getURL(filePath);
   script.type = 'text/javascript';
   script.onload = () => {
     script.remove(); // Clean up after injection
     if (callback) callback(); // Execute the callback once the script is loaded
   };
   (document.head || document.documentElement).appendChild(script);
 }
 
 // Inject the external script and apply the saved theme after injection
 injectScript('injected.js', () => {
   // Apply the saved theme after the script is loaded
   chrome.storage.local.get('selectedTheme', (data) => {
     if (data.selectedTheme) {
       console.log('Applying saved theme on page load:', data.selectedTheme);
       window.dispatchEvent(new CustomEvent('applyTheme', { detail: data.selectedTheme }));
     }
   });
 });
 
 // Listen for messages from the popup
 chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   if (request.theme) {
     console.log('Sending theme to injected script:', request.theme);
     // Dispatch a custom event to pass the theme to the injected script
     window.dispatchEvent(new CustomEvent('applyTheme', { detail: request.theme }));
   }
 });