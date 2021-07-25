
/**
 * This function is used to get unique array from existing array
 * @param {Array} arr - Array of objects
 * @param {String[]} props - Array of properties on which we need to apply distinct
 */
const GetUniqueArray = (arr, props = []) => [...new Map(arr.map(entry => [props.map(k => entry[k]).join('|'), entry])).values()];

/**
 * This function is used to get HTML decoded string
 * @param {string} input - HTML Encoded string
 */
function htmlDecode(input) {
    let DecodeTextArea = $('<textarea id="txtDecode" style="display: none;" />');
    DecodeTextArea.html(input);
    $("body").append(DecodeTextArea);

    let returnResult = $("#txtDecode").val();
    $("#txtDecode").remove();

    return returnResult;
}

/**
 * This function is used to get Thumb image url from original image url. It will replace "original/" to "thumb/" and "-org-" to "-thumb-"
 * @param {string} originalImgPath - Original Image Path
 */
function GetThumbImgPath(originalImgPath) {
    return originalImgPath.replaceAll("original/", "thumb/").replaceAll("-org-", "-thumb-");
}

/**
 * This function is used to get sorted JSON Array
 * @param {Array} objJson - Json Array
 * @param {string} sortDirection - "ASC" or "DESC"
 */
function GetSortedJson(objJson, sortDirection) {
    if (sortDirection == "ASC") { objJson.sort(function (a, b) { return a.sortorder - b.sortorder; }); }
    else if (sortDirection == "DESC") { objJson.sort(function (a, b) { return a.sortorder - b.sortorder; }).reverse(); }

    return objJson;
}

/**
 * This function is used to get JSON object from encoded json string
 * @param {string} encodedStrJson - Encoded Json in string format
 */
function GetJsonFromStringVariable(encodedStrJson) {
    let decodedStr = htmlDecode(encodedStrJson);

    if ($.trim(decodedStr) != "") {
        // get json
        let decodedJson = JSON.parse('{"jsonbody":' + decodedStr + '}').jsonbody;

        return decodedJson;
    }
}

/**
 * This function is used to load PRODUCTS in Products page
 * @param {object} ProductJSON - Products JSON Array
 */
function loadProducts(ProductJSON) {
    if ($.trim(ProductJSON) != "") {
        // sort JSON
        ProductJSON = GetSortedJson(ProductJSON, "ASC");

        // convert json to HTML and append in page
        $(ProductJSON).each(function (index, elem) {
            $("#divProducts").append(
                $('<div/>', { 'class': 'col-lg-3 col-md-6 wow fadeInUp', 'data-wow-delay': '0.0s' }).append(
                    $('<div/>', { 'class': 'team-item px-0 pt-0' }).append(
                        $('<div/>', { 'class': 'team-img' }).append(
                            $('<img/>', { 'src': defaultImgFolderPath + GetThumbImgPath(elem.imgpath), 'alt': elem.description })
                        )
                    ).append(
                        $('<div/>', { 'class': 'team-text' }).append(
                            $('<h2/>', { 'text': elem.description })
                        ).append(
                            $('<p/>', { 'text': elem.subdescription })
                        )
                    )
                )
            )
        });
    }
}

/**
 * This function is used to load PRODUCTS in Products page
 * @param {string} encodedProductJson - Encoded Products JSON
 */
function loadProductsWithJsonString(encodedProductJson) {
    let ProductJSON = GetJsonFromStringVariable(encodedProductJson, "ASC");
    loadProducts(ProductJSON);
}

/**
 * This function is used to load PRODUCTS in Products page
 */
function loadProductsFromFile() {
    $.getJSON("json/products.json", function (json) {
        loadProducts(json);
    });
}

/**
 * This function is used to Gallery section in Gallery page
 * @param {object} GalleryJSON - Gallery JSON Array
 */
function loadGallery(GalleryJSON) {
    if ($.trim(GalleryJSON) != "") {
        // sort JSON
        GalleryJSON = GetSortedJson(GalleryJSON, "DESC");

        // convert json to HTML and append in page
        // Add Filters
        let GalleryFilterJSON = GetUniqueArray(GalleryJSON, ["classname", "classdescription"]);
        $(GalleryFilterJSON).each(function (index, elem) {
            $("#divGallery ul#portfolio-filter").append(
                $('<li/>', { 'data-filter': '.' + elem.classname, 'text': elem.classdescription })
            );
        });

        // Add images
        $.when(
            $(GalleryJSON).each(function (index, elem) {
                $("#divGallery .portfolio-container").append(
                    $('<div/>', { 'class': 'col-lg-4 col-md-6 col-sm-12 portfolio-item ' + elem.classname + ' wow fadeInUp', 'data-wow-delay': '0.1s' }).append(
                        $('<div/>', { 'class': 'portfolio-wrap' }).append(
                            $('<a/>', { 'href': defaultImgFolderPath + elem.imgpath, 'data-lightbox': 'portfolio' }).append(
                                $('<img/>', { 'src': defaultImgFolderPath + GetThumbImgPath(elem.imgpath), 'alt': elem.description })
                            )
                        )
                    )
                );
            })
        ).then(function () {
            // Portfolio filter
            var portfolioIsotope = $('.portfolio-container').isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });

            $('#portfolio-filter li').on('click', function () {
                $("#portfolio-filter li").removeClass('filter-active');
                $(this).addClass('filter-active');
                portfolioIsotope.isotope({ filter: $(this).data('filter') });
            });

            $(".all-photos-filter").trigger("click");
        });
    }
}

/**
 * This function is used to Gallery section in Gallery page
 * @param {string} encodedGalleryJson - Encoded Gallery JSON
 */
function loadGalleryWithJsonString(encodedGalleryJson) {
    let GalleryJSON = GetJsonFromStringVariable(encodedGalleryJson);
    loadGallery(GalleryJSON);
}

/**
 * This function is used to Gallery section in Gallery page
 */
function loadGalleryFromFile() {
    $.getJSON("json/gallery.json", function (json) {
        loadGallery(json);
    });
}

/**
 * This function is used to load MASALA BENEFIT in Home page
 * @param {object} MasalaBenefitJSON - Masala Benefit JSON Array
 */
function loadMasalaBenefits(MasalaBenefitJSON) {
    if ($.trim(MasalaBenefitJSON) != "") {
        // sort JSON
        MasalaBenefitJSON = GetSortedJson(MasalaBenefitJSON, "ASC");

        // convert json to HTML and append in page
        $(MasalaBenefitJSON).each(function (index, elem) {
            $("#divMasalaBenefits").append(
                $('<div/>', { 'class': 'col-lg-4 col-md-6 wow fadeInUp', 'data-wow-delay': '0.0s' }).append(
                    $('<div/>', { 'class': 'service-item' }).append(
                        $('<div/>', { 'class': 'service-icon' }).append(
                            $('<img/>', { 'src': defaultImgFolderPath + elem.imgpath, 'alt': elem.description })
                        )
                    ).append(
                        $('<h2/>', { 'text': elem.description })
                    ).append(
                        $('<p/>', { 'text': elem.subdescription })
                    )
                )
            )
        });
    }
}

/**
 * This function is used to load MASALA BENEFIT in Home page
 * @param {string} encodedMasalaBenefitJson - Encoded Masala Benefit JSON
 */
function loadMasalaBenefitsWithJsonString(encodedMasalaBenefitJson) {
    let MasalaBenefitsJSON = GetJsonFromStringVariable(encodedMasalaBenefitJson);
    loadMasalaBenefits(MasalaBenefitsJSON);
}

/**
 * This function is used to load MASALA BENEFIT in Home page
 */
function loadMasalaBenefitsFromFile() {
    $.getJSON("json/masala-benefits.json", function (json) {
        loadMasalaBenefits(json);
    });
}

/**
 * This function is used to load PRODUCTS in Home page
 * @param {object} HomeProductsJSON - Home Products JSON Array
 */
function loadHomeProducts(HomeProductsJSON) {
    if ($.trim(HomeProductsJSON) != "") {
        // sort JSON
        HomeProductsJSON = GetSortedJson(HomeProductsJSON, "ASC");

        // convert json to HTML and append in page
        $.when(
            $(HomeProductsJSON).each(function (index, elem) {
                $("#divHomeProducts").append(
                    $('<div/>', { 'class': 'blog-item' }).append(
                        $('<div/>', { 'class': 'blog-img' }).append(
                            $('<img/>', { 'src': defaultImgFolderPath + elem.imgpath, 'alt': elem.description })
                        )
                    ).append(
                        $('<div/>', { 'class': 'blog-text' }).append(
                            $("<h2/>", { 'text': elem.description })
                        ).append(
                            $("<div/>", { 'class': 'blog-meta' }).append(
                                $("<p/>", { 'text': elem.subdescription }).prepend(
                                    $("<i/>", { 'class': 'far fa-list-alt' })
                                )
                            )
                        ).append(
                            $('<a/>', { 'class': 'btn', 'href': ProductsUrl, 'text': 'View All Products ' }).append(
                                $('<i/>', { 'class': 'fa fa-angle-right' })
                            )
                        )
                    )
                )
            })
        ).then(function () {
            // Blogs carousel
            $(".blog-carousel").owlCarousel({
                autoplay: true,
                dots: false,
                loop: true,
                nav: true,
                navText: [
                    '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                    '<i class="fa fa-angle-right" aria-hidden="true"></i>'
                ],
                responsive: {
                    0: {
                        items: 1
                    },
                    576: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3
                    }
                }
            })
        });
    }
}

/**
 * This function is used to load PRODUCTS in Home page
 * @param {string} encodedHomeProductsJson - Encoded Home Products JSON
 */
function loadHomeProductsWithJsonString(encodedHomeProductsJson) {
    let HomeProductsJSON = GetJsonFromStringVariable(encodedHomeProductsJson);
    loadHomeProducts(HomeProductsJSON);
}

/**
 * This function is used to load PRODUCTS in Home page
 */
function loadHomeProductsFromFile() {
    $.getJSON("json/home-products.json", function (json) {
        loadHomeProducts(json);
    });
}
