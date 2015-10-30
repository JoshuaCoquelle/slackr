var SlackrModule = (function(win, doc, undefined) {
    // ------------------------------------
    //        Cache Dom Selectors
    // ------------------------------------
    var modal      = doc.getElementById('modal');
    var overlay    = doc.getElementById('overlay');
    var imgWrap    = doc.getElementById('image-container');
    var imgTitle   = doc.getElementById('image-title');
    var closeBtn   = doc.getElementById('close-modal');
    var input      = doc.getElementById('search-input');
    var searchBtn  = doc.getElementById('slackr-button');
    var rightArrow = doc.getElementById('right-arrow');
    var leftArrow  = doc.getElementById('left-arrow');

    // ------------------------------------
    //        Utility Variables
    // ------------------------------------
    var xhr       = new XMLHttpRequest();
    var resultArr = [];
    var imgIndex  = 0;

    // ------------------------------------
    //            Bind Events
    // ------------------------------------
    searchBtn.addEventListener('click', searchImages);
    closeBtn.addEventListener('click', toggleModal);
    rightArrow.addEventListener('click', nextImage);
    leftArrow.addEventListener('click', previousImage);
    input.addEventListener('input', hasQuery);

    // ------------------------------------
    //             API Logic
    // ------------------------------------
    function consumeAPI(query) {
        xhr.open("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyB7SYES6iuhdHSdlf1k3qAJ0iLbCrFODNM&cx=003600216563210902934:i7-f2aptjku&searchType=image&num=10&q=" + query + "", true);
        xhr.send();

        // Parse JSON on Success and Create Gallery
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4 || xhr.status != 200) return;

            var response = JSON.parse(xhr.responseText).items;

            for (var i = 0; i < response.length; i++) {
                resultArr.push({
                    title: response[i].title,
                    link: response[i].link
                });
            }

            // Build Out Image Gallery
            buildGallery();
        };
    }

    // ------------------------------------
    //        Gallery Functionality
    // ------------------------------------

    // Create Image Gallery from API Results
    function buildGallery() {
        for (var i = 0; i < resultArr.length; i++) {
            // Image Title
            imgTitle.textContent = resultArr[i].title;

            // Image Body
            var img = doc.createElement('img');
            img.src = resultArr[i].link;
            imgWrap.appendChild(img);
        }
    }

    // Display Next Image in Gallery
    function nextImage() {
        if (imgIndex < 9) {
            imgWrap.children[imgIndex].style.display = 'none';
            imgIndex++;
            imgTitle.textContent = resultArr[imgIndex].title;
        }
    }

    // Display Previous Image in Gallery
    function previousImage() {
        if (imgIndex > 0) {
            imgIndex--;
            imgTitle.textContent = resultArr[imgIndex].title;
            imgWrap.children[imgIndex].style.display = 'block';
        }
    }

    // ------------------------------------
    //        Search Images Logic
    // ------------------------------------

    // Set Button State Based on Input Field
    function hasQuery() {
        this.value.length > 0 ? searchBtn.disabled = false:
                                searchBtn.disabled = true;
    }

    // Run XHR Function and Launch Modal
    function searchImages() {
        toggleModal();
        consumeAPI(input.value);

        // Reset Variables/HTML
        resultArr         = [];
        imgWrap.innerHTML = '';
        input.value       = '';
        imgIndex          = 0;
    }

    // Toggle Modal Visibility
    function toggleModal() {
        modal.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    // Added to Smooth Transitions on Load
    doc.getElementsByTagName('body')[0].classList.add('loaded');
})(window, document);
