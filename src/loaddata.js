import Papa from 'papaparse';

export async function loadCsvData() {
  const response = await fetch('../data.csv'); // Fetch the CSV file from the public directory
  const text = await response.text(); // Get CSV file content as text

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data); // Resolve with parsed data
      },
      error: (error) => {
        reject(error); // Reject on error
      },
    });
  });
}
