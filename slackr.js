var SlackrModule = (function(win, doc, undefined) {

    // Cache DOM Selectors
    var modal     = doc.getElementById('modal');
    var overlay   = doc.getElementById('overlay');
    var closeBtn  = doc.getElementById('close-modal');
    var input     = doc.getElementById('search-input');
    var searchBtn = doc.getElementById('slackr-button');
    var xhr       = new XMLHttpRequest();

    // Bind Events
    searchBtn.addEventListener('click', searchImages);
    closeBtn.addEventListener('click', toggleModal);
    input.addEventListener('input', hasQuery);

    // Consume Google Images API (Custom Search)
    function consumeAPI(query) {
        xhr.open("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyB7SYES6iuhdHSdlf1k3qAJ0iLbCrFODNM&cx=003600216563210902934:i7-f2aptjku&searchType=image&num=10&q=" + query + "", true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4 || xhr.status != 200) return;
            var response = JSON.parse(xhr.responseText).items;

            for (var i = 0; i < response.length; i++) {
                console.log(response[i].title);
                console.log(response[i].link);
            }
        };
    }

    // Set Button State Based on Input Field
    function hasQuery() {
        this.value.length > 0 ? searchBtn.disabled = false:
                                searchBtn.disabled = true;
    }

    // Run XHR Function and Launch Modal
    function searchImages() {
        toggleModal();
        consumeAPI(input.value);
    }

    // Toggle Modal Visibility Helper
    function toggleModal() {
        modal.classList.toggle('active');
        overlay.classList.toggle('active');
    }

})(window, document);
