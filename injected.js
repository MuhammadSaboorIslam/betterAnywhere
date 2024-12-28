// injected.js
window.addEventListener('applyTheme', (event) => {
   const theme = event.detail;
   console.log('Applying theme via injected script:', theme);
 
   if (window.Anywhere && Anywhere.Editor && Anywhere.Editor.editor) {
     Anywhere.Editor.editor.setTheme('ace/theme/' + theme);
   } else {
     console.error('Anywhere.Editor.editor is not available.');
   }
 });