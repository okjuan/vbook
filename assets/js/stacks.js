document.addEventListener('DOMContentLoaded', function() {
    const stacks = document.querySelectorAll('.stack');
    const modal = document.getElementById('stack-modal');
    const modalContent = document.querySelector('.modal-content');
    const modalTitle = document.getElementById('modal-title');
    const entriesContainer = document.getElementById('entries-container');

    // Caches keyed by stack element so each stack's data is parsed only once.
    const parsedEntriesCache = new WeakMap();
    // Tracks image URLs we've already kicked off a preload for.
    const preloadedImages = new Set();

    // Parse (and cache) the entries for a given stack.
    function getEntries(stack) {
        if (stack.dataset.hasEntries !== 'true') {
            return null;
        }
        if (parsedEntriesCache.has(stack)) {
            return parsedEntriesCache.get(stack);
        }
        try {
            const entries = JSON.parse(stack.dataset.entries);
            parsedEntriesCache.set(stack, entries);
            return entries;
        } catch (error) {
            console.error('Error parsing entries data:', error);
            parsedEntriesCache.set(stack, null);
            return null;
        }
    }

    // Hint the browser to fetch an image. Done lazily on intent-to-open
    // (hover/focus) instead of eagerly for every stack on page load.
    function preloadImage(src) {
        if (!src || preloadedImages.has(src)) {
            return;
        }
        preloadedImages.add(src);
        const img = new Image();
        img.src = src;
    }

    function preloadStackImages(stack) {
        const entries = getEntries(stack);
        if (!entries) {
            return;
        }
        for (const entry of entries) {
            preloadImage(entry.image_url);
        }
    }

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
        modal.scrollTo(0, 0);
        // Force a reflow so the browser registers the pre-animation state,
        // then add the class on the next frame so the transition always plays.
        void modal.offsetWidth;
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
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

    // Build the DOM for a single entry into the given fragment.
    function buildEntry(entry, fragment) {
        const exampleItem = document.createElement('div');
        exampleItem.className = 'entry-item';

        if (entry.image_url) {
            const imgElement = document.createElement('img');
            imgElement.src = entry.image_url;
            imgElement.alt = `Image for ${entry.title}`;
            imgElement.className = 'entry-image';
            imgElement.loading = 'lazy';
            imgElement.decoding = 'async';
            exampleItem.appendChild(imgElement);
        }

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
            const commentaryContainer = document.createElement('div');
            commentaryContainer.className = 'entry-commentary-container';

            const paragraphs = entry.commentary.split(/\n\s*\n/);
            paragraphs.forEach(paragraphText => {
                const trimmedText = paragraphText.trim();
                if (trimmedText) {
                    const pContainer = document.createElement('div');
                    pContainer.className = 'paragraph';
                    const p = document.createElement('p');
                    p.className = 'entry-commentary';
                    p.innerHTML = trimmedText;
                    pContainer.appendChild(p);
                    commentaryContainer.appendChild(pContainer);
                }
            });

            exampleItem.appendChild(commentaryContainer);
        }

        fragment.appendChild(exampleItem);
    }

    stacks.forEach(stack => {
        stack.setAttribute('tabindex', '0');  // Make focusable with keyboard
        stack.setAttribute('role', 'button'); // ARIA role for accessibility

        // Preload images only when the user signals intent to open a stack.
        stack.addEventListener('mouseenter', function() {
            preloadStackImages(this);
        });
        stack.addEventListener('focus', function() {
            preloadStackImages(this);
        });

        // Handle click events
        stack.addEventListener('click', function() {
            const entries = getEntries(this);

            // Set modal title
            modalTitle.innerHTML = this.dataset.description;

            // Clear previous entries
            entriesContainer.innerHTML = '';

            if (!entries) {
                return;
            }

            // Build all entries off-DOM in a fragment to avoid repeated reflows.
            const fragment = document.createDocumentFragment();
            for (const entry of entries) {
                buildEntry(entry, fragment);
            }
            entriesContainer.appendChild(fragment);

            // Show the modal with animation
            showModal();
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