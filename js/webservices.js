// webservices
"use strict";

let ws_keyword = {
    endpoint: 'https://resource.geolba.ac.at/PoolParty/sparql/geoera_keyword',
    json: function (query, thenFunc) {
        return fetch(this.endpoint + '?query=' + encodeURIComponent(query) + '&format=application/json')
            .then(res => res.json())
            .then(thenFunc);
    }
};


let ws_micka = {
    endpoint: 'https://egdi.geology.cz/csw/',
    json2text: function (query, thenFunc) {
        return fetch(this.endpoint + '?request=GetRecords&query=(' + query + `)&MaxRecords=${parseInt($('#maxResults').val(), 10)}&format=application/json&language=eng&ElementSetName=full`)
            .then(res => res.text())
            .then(thenFunc);
    },

    fixRes: function (res) {
        if (res.includes('<!DOCTYPE html>')) { //repair json+html mix
            res = res.split('<!DOCTYPE html>')[0] + ']}';
        }
        return res
    },

    createQ1: function (terms, queryType) { //micka query doesn`t accept brackets? -> replace
        return terms.map(a => encodeURIComponent(queryType + '\'' + a + '\'').replace('\(', '').replace('\)', '')).join('+OR+');
    },

    createQ2: function (terms, queryType) { //micka query doesn`t accept brackets? -> replace
        return terms.map(a => encodeURIComponent(queryType + '\'*' + a + '*\'').replace('\(', '').replace('\)', '')).join('+OR+');
    }

};

let ws_opac = {
    //https://opac.geologie.ac.at/wwwopacx/wwwopac.ashx?database=ChoiceFullCatalogue&search=(title='granit','gneiss')&limit=100
    //https://opac.geologie.ac.at/wwwopacx/wwwopac.ashx?database=ChoiceFullCatalogue&search=keyword.contents='Posidonienschiefer'&output=json&fields=title
    //https://opac.geologie.ac.at/wwwopacx/wwwopac.ashx?command=getmetadata&database=ChoiceFullCatalogue&output=json
        
    endpoint: 'https://opac.geologie.ac.at/wwwopacx/wwwopac.ashx',
    json: function (query, thenFunc) {
        return fetch (`https://opac.geologie.ac.at/wwwopacx/wwwopac.ashx?database=ChoiceFullCatalogue&search=${query}&limit=5&output=json`)
            .then(res => res.json())
            .then(thenFunc);
    }
};
