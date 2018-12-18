function settMockData(path, payload) {
    var url = getApiBaseUrl() + "internal/mock/tjeneste/" + path;
    var OPTIONS = {
        headers: new Headers({
            "accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API")
        }),
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify(payload)
    };
    return fetch(url, OPTIONS)
        .then(function (response) {
        return;
    });
}
exports.settMockData = settMockData;
function clearMockData(path) {
    var url = getApiBaseUrl() + "internal/mock/tjeneste/" + path;
    var OPTIONS = {
        headers: new Headers({
            "accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API")
        }),
        method: "DELETE",
        credentials: "same-origin"
    };
    return fetch(url, OPTIONS)
        .then(function (response) {
        return;
    });
}
exports.clearMockData = clearMockData;
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts
            .pop()
            .split(";")
            .shift();
    }
    else {
        return "null";
    }
}
function getApiBaseUrl() {
    // if (erDev()) {
    //     // Kjør mot lokal soknadsosialhjelp-server:
    //     return "http://localhost:8181/soknadsosialhjelp-server/";
    //
    //     // Kjør mot lokal mock backend:
    //     // return "http://localhost:3001/sendsoknad/";
    // }
    // if (location.href.indexOf("localhost:8080") >= 0) {
    //     return "http://localhost:8181/soknadsosialhjelp-server/";
    // }
    // return kjorerJetty() ? "http://127.0.0.1:8181/soknadsosialhjelp-server/" : "/soknadsosialhjelp-server/";
    return "http://localhost:8181/soknadsosialhjelp-server/";
}
