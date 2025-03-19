// Get DOM elements for quote display
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");

// Main function to fetch and display random quote
async function getNewQuote() {
  try {
    // Fetch random quote from API
    const response = await fetch(
      "https://api.freeapi.app/api/v1/public/quotes/quote/random"
    );
    const data = await response.json();

    // Check if API response contains valid data
    if (data.data && data.data.content && data.data.author) {
      // Update DOM with new quote and author
      quoteText.textContent = data.data.content;
      quoteAuthor.textContent = `- ${data.data.author}`;

      // Change background when new quote loads
      setRandomBackground();
    } else {
      throw new Error("Invalid quote data");
    }
  } catch (error) {
    // Handle errors and show user feedback
    quoteText.textContent = "Failed to fetch quote. Please try again.";
    quoteAuthor.textContent = "";
    console.error(error);
  }
}

// Function to set random background image from Picsum
function setRandomBackground() {
  // Generate random number to prevent image caching
  const randomNum = Math.floor(Math.random() * 1000);
  document.body.style.backgroundImage = `url('https://picsum.photos/1920/1080?random=${randomNum}')`;
}

// Copy quote text to clipboard
function copyQuote() {
  // Combine quote and author text
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;

  // Use clipboard API to copy text
  navigator.clipboard
    .writeText(text)
    .then(() => alert("Quote copied to clipboard!"))
    .catch((err) => console.error("Failed to copy:", err));
}

// Share quote on Twitter
function tweetQuote() {
  // Encode quote text for URL
  const text = encodeURIComponent(
    `${quoteText.textContent} - ${quoteAuthor.textContent}`
  );

  // Open Twitter intent window
  window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
}

// Export quote as PNG image
async function exportQuote() {
  try {
    // Capture quote box element as canvas
    const element = document.querySelector(".quote-box");
    const canvas = await html2canvas(element);

    // Create temporary download link
    const link = document.createElement("a");
    link.download = "quote.png"; // Set filename
    link.href = canvas.toDataURL(); // Convert canvas to data URL
    link.click(); // Trigger download
  } catch (error) {
    console.error("Error exporting quote:", error);
  }
}

// Initial quote load when page first opens
getNewQuote();
