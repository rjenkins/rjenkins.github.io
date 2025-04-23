document.addEventListener('DOMContentLoaded', function() {
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach(function(codeBlock) {
    const copyButton = document.createElement('button');
    copyButton.classList.add('copy-button'); // You can add CSS for styling

    // SVG icon for the copy button
    copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em">
        <path d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H6C4.9 5 4 5.9 4 7v14c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H6v-9h13v9z"/>
      </svg>
    `;

    codeBlock.style.position = 'relative'; // For absolute positioning of the button
    copyButton.style.position = 'absolute';
    copyButton.style.top = '0.5em';
    copyButton.style.right = '0.5em';
    copyButton.style.padding = '0.3em'; // Adjust padding for the icon
    copyButton.style.lineHeight = '0'; // To properly align the icon
    copyButton.style.border = 'none';
    copyButton.style.background = 'transparent';
    copyButton.style.cursor = 'pointer';
    copyButton.style.opacity = '0.7';
    copyButton.style.transition = 'opacity 0.2s ease-in-out';

    copyButton.addEventListener('mouseenter', () => {
      copyButton.style.opacity = '1';
    });

    copyButton.addEventListener('mouseleave', () => {
      copyButton.style.opacity = '0.7';
    });

    codeBlock.appendChild(copyButton);

    copyButton.addEventListener('click', function() {
      const code = codeBlock.querySelector('code').textContent;
      navigator.clipboard.writeText(code)
        .then(() => {
          // Change the SVG to a checkmark or "Copied" text temporarily
          copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          `;
          setTimeout(() => {
            // Revert back to the copy SVG
            copyButton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em">
                <path d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H6C4.9 5 4 5.9 4 7v14c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H6v-9h13v9z"/>
              </svg>
            `;
          }, 1500); // Revert after 1.5 seconds
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
          `;
          setTimeout(() => {
            copyButton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em">
                <path d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H6C4.9 5 4 5.9 4 7v14c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H6v-9h13v9z"/>
              </svg>
            `;
          }, 1500);
        });
    });
  });
});

