
/**
 * This function is used to loan PRODUCTS in Products page
 * @param {string} encodedProductJson - Encoded Products JSON
 */
function loadProducts(encodedProductJson) {
    let ProductJSON = GetJsonFromStringVariable(encodedProductJson, "ASC");
    if ($.trim(ProductJSON) != "") {
        // convert json to HTML and append in page
        $(ProductJSON).each(function (index, elem) {
            $("#divProducts").append(
                $('<div/>', { 'class': 'col-lg-3 col-md-6 wow fadeInUp' }, { 'data-wow-delay': '0.0s' }).append(
                    $('<div/>', { 'class': 'team-item px-0 pt-0' }).append(
                        $('<div/>', { 'class': 'team-img' }).append(
                            $('<img/>', { 'src': defaultImgFolderPath + GetThumbImgPath(elem.imgpath) }, { 'alt': elem.description })
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
 * This function is used to get HTML decoded string
 * @param {string} input - HTML Encoded string
 */
function htmlDecode(input) {
    var DecodeTextArea = $('<textarea id="txtDecode" style="display: none;" />');
    DecodeTextArea.html(input);
    $("body").append(DecodeTextArea);

    var returnResult = $("#txtDecode").val();
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
 * This function is used to get JSON object from encoded json string
 * @param {string} encodedStrJson - Encoded Json in string format
 * @param {string} sortDirection - "ASC" or "DESC"
 */
function GetJsonFromStringVariable(encodedStrJson, sortDirection) {
    let decodedStr = htmlDecode(encodedStrJson);

    if ($.trim(decodedStr) != "") {
        // get json
        let decodedJson = JSON.parse('{"jsonbody":' + decodedStr + '}').jsonbody;

        // sort json
        if (sortDirection == "ASC") { decodedJson.sort(function (a, b) { return a.sortorder - b.sortorder; }); }
        else if (sortDirection == "DESC") { decodedJson.sort(function (a, b) { return a.sortorder - b.sortorder; }).reverse(); }

        return decodedJson;
    }
}