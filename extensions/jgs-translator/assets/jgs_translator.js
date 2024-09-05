function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {pageLanguage: 'en'},
    'google_translate_element'
  );
}

// Load Google Translate API asynchronously
(function() {
  var gt_script = document.createElement('script');
  gt_script.type = 'text/javascript';
  gt_script.async = true;
  gt_script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gt_script, s);
})();

// Function to hide the "Powered by" text
function hidePoweredByText() {
  var link = document.querySelector('.skiptranslate.goog-te-gadget');
  
  if (link) {
    link.childNodes.forEach(function(child) {
      if (child.nodeType === Node.TEXT_NODE && child.nodeValue.includes('Powered by')) {
        child.nodeValue = ''; // Hide the specific text
      }
    });
  }
}

// Create a MutationObserver to watch for changes in the DOM
function observeDOMChanges() {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        hidePoweredByText(); // Hide the text on new mutations
      }
    });
  });

  // Start observing the body or a specific parent element
  observer.observe(document.body, { childList: true, subtree: true });
}

// Run the observer on page load
window.addEventListener('load', observeDOMChanges);