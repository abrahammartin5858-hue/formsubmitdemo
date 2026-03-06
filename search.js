/**
 * Initializes search functionality for the Rhapsody of Realities website
 */
function intiSearchform() {
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('.search-input');
  
  if (!searchForm || !searchInput) {
    console.warn('Search form or input not found');
    return;
  }

  // Add search functionality
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
      performSearch(searchTerm);
    }
  });

  // Add real-time search as user types
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    
    if (searchTerm.length >= 3) {
      // Debounce search to avoid too many requests
      clearTimeout(searchInput.dataset.timeout);
      searchInput.dataset.timeout = setTimeout(() => {
        performSearch(searchTerm);
      }, 500);
    }
  });
}

/**
 * Performs search functionality
 * @param {string} searchTerm - The term to search for
 */
function performSearch(searchTerm) {
  try {
    // Get current devotional content
    const title = document.getElementById('clean_title')?.textContent || '';
    const body = document.getElementById('body')?.textContent || '';
    const date = document.getElementById('devo_date')?.textContent || '';
    
    // Create search results
    const results = [];
    
    // Search in title
    if (title.toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push({
        type: 'Title',
        content: title,
        match: searchTerm
      });
    }
    
    // Search in body content
    if (body.toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push({
        type: 'Content',
        content: body.substring(0, 200) + '...',
        match: searchTerm
      });
    }
    
    // Search in date
    if (date.toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push({
        type: 'Date',
        content: date,
        match: searchTerm
      });
    }
    
    // Display results or highlight matches
    if (results.length > 0) {
      highlightSearchMatches(searchTerm);
      console.log(`Found ${results.length} results for: "${searchTerm}"`);
    } else {
      console.log(`No results found for: "${searchTerm}"`);
      // Optionally show a message to the user
      alert(`No matches found for "${searchTerm}". Try searching for keywords from the devotional content.`);
    }
    
  } catch (error) {
    console.error('Error performing search:', error);
  }
}

/**
 * Highlights search matches in the content
 * @param {string} searchTerm - The term to highlight
 */
function highlightSearchMatches(searchTerm) {
  const bodyElement = document.getElementById('body');
  const titleElement = document.getElementById('clean_title');
  
  if (!bodyElement || !titleElement) return;
  
  // Remove previous highlights
  const highlights = document.querySelectorAll('.search-highlight');
  highlights.forEach(h => {
    const parent = h.parentElement;
    parent.replaceChild(document.createTextNode(h.textContent), h);
  });
  
  // Highlight in title
  if (titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
    const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
    titleElement.innerHTML = titleElement.textContent.replace(regex, '<span class="search-highlight">$1</span>');
  }
  
  // Highlight in body
  if (bodyElement.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
    const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
    bodyElement.innerHTML = bodyElement.innerHTML.replace(regex, '<span class="search-highlight">$1</span>');
  }
}

/**
 * Escapes special regex characters in a string
 * @param {string} string - The string to escape
 * @returns {string} The escaped string
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', intiSearchform);