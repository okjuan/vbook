document.addEventListener('DOMContentLoaded', function() {
    const stacks = document.querySelectorAll('.stack');
    const modal = document.getElementById('stack-modal');
    const modalContent = document.querySelector('.modal-content');
    const modalTitle = document.getElementById('modal-title');
    const entriesContainer = document.getElementById('entries-container');

    // Image preloading cache
    const preloadedImages = new Map();

    // Function to preload an image
    function preloadImage(src) {
        return new Promise((resolve, reject) => {
            if (preloadedImages.has(src)) {
                resolve(preloadedImages.get(src));
                return;
            }

            const img = new Image();
            img.onload = () => {
                preloadedImages.set(src, img);
                resolve(img);
            };
            img.onerror = reject;
            img.src = src;
        });
    }

    // Preload all images on page load
    stacks.forEach(stack => {
        const hasEntries = stack.dataset.hasEntries === 'true';
        if (hasEntries) {
            try {
                const entries = JSON.parse(stack.dataset.entries);
                entries.forEach(entry => {
                    if (entry.image_url) {
                        preloadImage(entry.image_url).catch(error => {
                            console.warn('Failed to preload image:', entry.image_url, error);
                        });
                    }
                });
            } catch (error) {
                console.error('Error parsing entries data for preloading:', error);
            }
        }
    });

    // Get the background color of the document body
    const bodyStyles = window.getComputedStyle(document.body);
    const bodyBgColor = bodyStyles.backgroundColor;

    // Apply the background color to the modal content
    if (bodyBgColor && bodyBgColor !== 'rgba(0, 0, 0, 0)' && bodyBgColor !== 'transparent') {
        modalContent.style.backgroundColor = bodyBgColor;
    }

    // Function to show modal with animation
    function showModal() {
        modal.style.display = 'block';
        // Force a reflow to ensure the initial state is applied
        modal.offsetHeight;
        modal.classList.add('show');
    }

    // Function to hide modal with animation
    function hideModal() {
        modal.classList.remove('show');
        // Wait for animation to complete before hiding
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match the CSS transition duration
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            hideModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });

    stacks.forEach(stack => {
        stack.setAttribute('tabindex', '0');  // Make focusable with keyboard
        stack.setAttribute('role', 'button'); // ARIA role for accessibility

        // Handle click events
        stack.addEventListener('click', function() {
            const description = this.dataset.description;
            const hasEntries = this.dataset.hasEntries === 'true';

            // Set modal title
            modalTitle.textContent = description;

            // Clear previous entries
            entriesContainer.innerHTML = '';

            // If this stack has entries, display them
            if (hasEntries) {
                try {
                    const entries = JSON.parse(this.dataset.entries);

                    entries.forEach(entry => {
                        const exampleItem = document.createElement('div');
                        exampleItem.className = 'entry-item';

                        if (entry.image_url) {
                            if (preloadedImages.has(entry.image_url)) {
                                const preloadedImg = preloadedImages.get(entry.image_url);
                                const imgElement = preloadedImg.cloneNode(true);
                                imgElement.alt = `Image for ${entry.title}`;
                                imgElement.className = 'entry-image';
                                exampleItem.appendChild(imgElement);
                            } else {
                                const imgElement = document.createElement('img');
                                imgElement.src = entry.image_url;
                                imgElement.alt = `Image for ${entry.title}`;
                                imgElement.className = 'entry-image';
                                exampleItem.appendChild(imgElement);
                            }
                        }

                        let html = '';
                        if (entry.title) {
                            const title = document.createElement('div');
                            title.className = 'entry-title';
                            title.innerHTML = `${entry.title}`;
                            exampleItem.appendChild(title);
                        }
                        if (entry.subtitle) {
                            const subtitle = document.createElement('div');
                            subtitle.className = 'entry-subtitle';
                            subtitle.innerHTML = `${entry.subtitle}`;
                            exampleItem.appendChild(subtitle);
                        }
                        if (entry.commentary) {
                            const commentary = document.createElement('p');
                            commentary.className = 'entry-commentary';
                            commentary.innerHTML = `${entry.commentary}`;
                            exampleItem.appendChild(commentary);
                        }

                        entriesContainer.appendChild(exampleItem);
                    });

                    // Show the modal with animation
                    showModal();
                } catch (error) {
                    console.error('Error parsing entries data:', error);
                }
            }
        });

        // Handle keyboard events (enter/space to click)
        stack.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});