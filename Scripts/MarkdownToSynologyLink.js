/**
	{
		"api":1,
		"name":"Markdown to Synology Chat Link",
		"description":"Converts Markdown-style links [text](url) into Synology Chat format <url|text>.",
		"author":"ChoiWheatley",
		"icon":"link",
        "tags":"markdown,csv,conversion",
        "bias":0.0
	}
**/
/**
 * name: Markdown to Synology Chat Link
 * description: Converts Markdown-style links [text](url) into Synology Chat format <url|text>.
 * author: choiwheatley
 * tags: markdown, synology, chat, link, formatting
 */
function main(state) {
	try {
        // Use selection if available, otherwise fullText.
		const input = state.selection || state.fullText;
        // Set the entire editor text to the CSV output.
    const output = input.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<$2|$1>');
		state.fullText = output;
	}
	catch(error) {
		state.postError("Explain what went wrong here: " + error.message);
	}
}
