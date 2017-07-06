function enviaNFe(token, nfe, tpConteudo){
	var url = 'https://nfe.ns.eti.br/nfe/issue';
    return enviaConteudoParaAPI(token, nfe, url, tpConteudo);
}

function consultaStatusProcessamento(token, CNPJ, nsNRec){
	var json = '{"X-AUTH-TOKEN": "' + token + '", "CNPJ": "' + CNPJ + '", "nsNRec": "' + nsNRec + '"};'
	var url = 'https://nfe.ns.eti.br/nfe/issue/status';
	return enviaConteudoParaAPI(token, json, url, "json");
}

function downloadNFe(token, chNFe, tpDown){
	var json = '{"X-AUTH-TOKEN": "' + token + '", "chNFe": "' + chNFe + '", "tpDown": "' + tpDown + '"};'
	var url = 'https://nfe.ns.eti.br/nfe/get';
	return enviaConteudoParaAPI(token, json, url, "json");
}

function enviaConteudoParaAPI(token, conteudo, urlEnvio, tpConteudo = "json"){
	var content, retorno;
	if(tpConteudo == "txt")	content = "text/plain";
	else if(tpConteudo == "xml") content = "application/xml";
	else content = "application/json";

	$.ajax({
		type: 'POST',
		timeout: 10000,
		async: false,
		url: urlEnvio,
		data: conteudo,
        contentType: content,
        headers: {
            "X-AUTH-TOKEN": token
        }
    }).then(function(response){
    	retorno = response;
    }, function(response){
        retorno = response;
    });

    return retorno;
}
