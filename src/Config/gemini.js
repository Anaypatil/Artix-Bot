import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
import Papa from 'papaparse';

// Load the CSV data
async function loadCsvData() {
  const response = await fetch('/data.csv'); // Fetch the CSV file from the public directory
  const text = await response.text(); // Get CSV file content as text

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log('Parsed CSV Data:', result.data); // Log the parsed data
        resolve(result.data); // Resolve with parsed data
      },
      error: (error) => {
        reject(error); // Reject on error
      },
    });
  });
}

const apiKey = "AIzaSyAzHbFc_Goze1EEFNoMT_ensH1CbCm11kU";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Function to check if the response is related to museums
function isMuseumRelated(response) {
  const lowercaseResponse = response.toLowerCase();
  const museumKeywords = [
    "museum", "exhibition", "art gallery", "ticket",
    "price", "entry fee", "opening hours", "location",
    "art", "artifact"
  ];
  return museumKeywords.some((keyword) =>
    lowercaseResponse.includes(keyword)
  );
}

async function run(prompt) {
  // Load the CSV data
  const dataset = await loadCsvData();

  const chatSession = model.startChat({
    generationConfig,
    history: [], // Clearing history or keeping it limited
  });

  const result = await chatSession.sendMessage(prompt);
  const responseText = await result.response.text();

  // Log raw response text and dataset for debugging
  console.log('Raw response:', responseText);
  console.log('Dataset:', dataset);

  // Check if the response is related to museums
  if (isMuseumRelated(responseText)) {
    console.log('Museum-related response detected.');

    // Filter response based on the dataset
    const filteredData = dataset.filter(item =>
      responseText.toLowerCase().includes(item['Museum Name'].toLowerCase())
    );

    // Log filtered data to understand what matched
    console.log('Filtered Data:', filteredData);

    if (filteredData.length > 0) {
      const responseOutput = filteredData.map(item => 
        `<div>
          <h4>About Museum</h4>
          <p><strong>Museum Name</strong>: ${item['Museum Name']}</p>
          <p><strong>Morning Slot</strong>: ${item['Morning Slots']}</p>
          <p><strong>Afternoon Slot</strong>: ${item['Afternoon Slots']}</p>
          <p><strong>Evening Slot</strong>: ${item['Evening Slots']}</p>
          <p><strong>City</strong>: ${item['City']}</p>
          <p><strong>Ticket Price</strong>: ₹${item['Ticket Price']}</p>
          <p><strong>Description</strong>: ${item['Description']}</p>
        </div>`
      ).join('\n') + '\n\n' +
      `<div class="result-button"><button onclick="bookTickets()">Book Tickets</button></div>`; // Add button to output

      console.log('Final Output:', responseOutput);
      return responseOutput;
    } else {
      const restrictedMessage =
        "This bot only provides information related to museums, ticket prices, and exhibitions.";
      console.log(restrictedMessage);
      return restrictedMessage;
    }
  } else {
    const restrictedMessage =
      "This bot only provides information related to museums, ticket prices, and exhibitions.";
    console.log(restrictedMessage);
    return restrictedMessage;
  }
}

function bookTickets() {
  // Function to handle the "Book Tickets" button click
  // You can implement ticket booking logic here
  alert("Redirecting to the ticket booking page...");
  // Example: window.location.href = 'https://example.com/tickets';
}

export default run;
