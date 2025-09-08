
/**
  {
    "api":1,
    "name":"Json to Markdown Table",
    "description":"What does your script do?",
    "author":"ChoiWheatley",
    "icon":"broom",
        "tags":"place,tags,here",
        "bias":0.0
  }
**/

//function jsonToMarkdownTable(json) {
//  const headers = ['key', 'value'];
//
//  // Generate header row
//  let markdownTable = `| ${headers.join(" | ")} |\n`;
//  markdownTable += `| ${headers.map(() => "---").join(" | ")} |\n`;
//
//  // Generate data rows
//  Object.entries(json).forEach(([key, value]) => {
//    markdownTable += `| ${key} | ${value} |\n`;
//  });
//
//  return markdownTable;
//}
//
//
//function main(state) {
//  try {
//    state.text = jsonToMarkdownTable(JSON.parse(state.fullText))
//  }
//  catch (error) {
//    state.postError(error)
//  }
//
//}
//

function jsonToMarkdownTable(json) {
    if (Array.isArray(json)) {
        if (json.length === 0) {
            throw new Error("Input should be a non-empty array of objects.");
        }

        const headers = Object.keys(json[0]);

        if (headers.length === 0) {
            throw new Error("Objects should have at least one key.");
        }

        // Generate header row
        let markdownTable = `| ${headers.join(" | ")} |\n`;
        markdownTable += `| ${headers.map(() => "---").join(" | ")} |\n`;

        // Generate data rows
        json.forEach(row => {
            let rowData = headers.map(header => (row[header] !== undefined ? row[header] : "N/A"));
            markdownTable += `| ${rowData.join(" | ")} |\n`;
        });

        return markdownTable;
    } 
    
    else if (typeof json === "object" && json !== null) {
        // Single object: format as a key-value table
        let markdownTable = `| Key | Value |\n`;
        markdownTable += `| --- | --- |\n`;

        Object.entries(json).forEach(([key, value]) => {
            markdownTable += `| ${key} | ${value !== undefined ? value : "N/A"} |\n`;
        });

        return markdownTable;
    } 
    
    else {
        throw new Error("Input should be a JSON object or an array of objects.");
    }
}

function main(state) {
    try {
        if (!state.text || state.text.trim() === "") {
            throw new Error("No input provided. Please enter a valid JSON object or array.");
        }

        let parsedJson;
        try {
            parsedJson = JSON.parse(state.text);
        } catch (e) {
            throw new Error("Invalid JSON format. Please ensure the input is correctly formatted.");
        }

        state.text = jsonToMarkdownTable(parsedJson);
    } catch (error) {
        state.postError(error.message);
    }
}
