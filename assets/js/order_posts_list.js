document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('post-order-controls');
    form.addEventListener('change', reorderPosts);

    function reorderPosts() {
        const selectedOption = document.querySelector('input[name="option"]:checked').value;
        const postList = document.getElementById('post-list');
        const postElements = Array.from(postList.querySelectorAll('li')).sort((a, b) => {
            const dateA = getDateFromElement(a, selectedOption);
            const dateB = getDateFromElement(b, selectedOption);
            return dateB - dateA;
        });
        postList.innerHTML = '';
        postElements.forEach(post => postList.appendChild(post));
    }

    function getDateFromElement(element, dateType) {
        let dateElement = element.querySelector(`time[itemprop="${dateType}"]`);
        if (dateElement === null) {
            if (dateType === "dateModified") {
                // fallback to published date when modified date is not defined
                dateElement = element.querySelector(`time[itemprop="datePublished"]`);
            } else if (dateType === "datePublished") {
                throw new Error(`'datePublished' prop not found for element ${element}. It should always be defined`);
            } else {
                throw new Error(`Unexpected dateType: '${dateType}'`);
            }
        }
        return new Date(dateElement.getAttribute('datetime'));
    }
});