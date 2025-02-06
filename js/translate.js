// translate.js
async function translateToFrench() {
    const textElements = document.querySelectorAll('[data-translate="true"]');  // Target elements with a 'data-translate' attribute.
    const textToTranslate = Array.from(textElements).map(el => el.innerText).join(' ');

    // Call the translation API
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",  // Use the relevant model
            prompt: `Translate this text to French: "${textToTranslate}"`,
            max_tokens: 1000
        })
    });

    const data = await response.json();
    const translatedText = data.choices[0].text.trim();

    // Update the text elements with the translated text
    const translatedParts = translatedText.split(' ');
    let index = 0;
    textElements.forEach(el => {
        el.innerText = translatedParts.slice(index, index + el.innerText.split(' ').length).join(' ');
        index += el.innerText.split(' ').length;
    });
}
