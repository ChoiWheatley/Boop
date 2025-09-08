/**
	{
		"api":1,
		"name":"Markdown Table to CSV (Improved)",
		"description":"Converts a markdown table to CSV format, preserving blank cells.",
		"author":"Your Name",
		"icon":"table",
        "tags":"markdown,csv,conversion",
        "bias":0.0
	}
**/

/**
 * Splits a markdown table row into cells.
 * It trims the row, removes any leading or trailing pipe,
 * then splits the row on the remaining pipes while preserving blank cells.
 *
 * @param {string} line - A single line from the markdown table.
 * @returns {string[]} Array of trimmed cell values.
 */
function splitMarkdownLine(line) {
    let trimmed = line.trim();
    // Remove starting pipe if present.
    if (trimmed.startsWith('|')) {
        trimmed = trimmed.slice(1);
    }
    // Remove ending pipe if present.
    if (trimmed.endsWith('|')) {
        trimmed = trimmed.slice(0, -1);
    }
    // Split on pipe; do not filter out blank cells.
    return trimmed.split('|').map(cell => cell.trim());
}

/**
 * Determines if a given line is a markdown table separator row.
 * The separator row typically contains only dashes and optional colons.
 *
 * @param {string} line - The line to check.
 * @returns {boolean} True if the line is a separator row, false otherwise.
 */
function isSeparatorRow(line) {
    const cells = splitMarkdownLine(line);
    return cells.every(cell => /^:?-+:?$/.test(cell));
}

/**
 * Converts a markdown table into CSV.
 *
 * @param {string} markdown - The markdown text containing the table.
 * @returns {string} The CSV formatted string.
 */
function convertMarkdownTableToCSV(markdown) {
    // Split input into non-empty lines.
    const lines = markdown.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) {
        // Not a valid table; return original text.
        return markdown;
    }
    
    // Process the header row.
    let headers = splitMarkdownLine(lines[0]);
    const csvRows = [];
    csvRows.push(headers.map(escapeCsv).join(','));
    
    // Determine if the second line is a separator.
    let startIndex = 1;
    if (isSeparatorRow(lines[1])) {
        startIndex = 2;
    }
    
    // Process each row of the table.
    for (let i = startIndex; i < lines.length; i++) {
        let rowCells = splitMarkdownLine(lines[i]);
        csvRows.push(rowCells.map(escapeCsv).join(','));
    }
    
    // Join all rows with newline characters.
    return csvRows.join('\n');
}

/**
 * Escapes a cell for CSV formatting.
 * If the cell contains commas, quotes, or newlines, it wraps the cell in quotes.
 * Any quotes inside the cell are escaped by doubling them.
 *
 * @param {string} cell - The cell content.
 * @returns {string} The escaped cell.
 */
function escapeCsv(cell) {
    if (cell.indexOf(',') !== -1 || cell.indexOf('"') !== -1 || cell.indexOf('\n') !== -1) {
        cell = cell.replace(/"/g, '""');
        return `"${cell}"`;
    }
    return cell;
}

function main(state) {
	try {
        // Use selection if available, otherwise fullText.
		const input = state.selection || state.fullText;
        // Convert the Markdown table to CSV.
		const csvOutput = convertMarkdownTableToCSV(input);
        // Set the entire editor text to the CSV output.
		state.fullText = csvOutput;
	}
	catch(error) {
		state.postError("Explain what went wrong here: " + error.message);
	}
}
