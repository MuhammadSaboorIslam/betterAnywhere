document.addEventListener('DOMContentLoaded', () => {
   const themeSelector = document.getElementById('themeSelector');
   const saveButton = document.getElementById('saveTheme');
 
   // Load the saved theme from storage
   chrome.storage.local.get('selectedTheme', (data) => {
     if (data.selectedTheme) {
       themeSelector.value = data.selectedTheme;
     }
   });
 
   // Save the selected theme to storage
   saveButton.addEventListener('click', () => {
     const selectedTheme = themeSelector.value;
     chrome.storage.local.set({ selectedTheme }, () => {
       console.log(`Theme saved: ${selectedTheme}`);
     });
 
     // Send a message to content script to apply the theme
     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
       chrome.tabs.sendMessage(tabs[0].id, { theme: selectedTheme });
     });
   });
 });