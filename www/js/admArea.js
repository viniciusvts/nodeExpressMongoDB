var _token; //guarda o token de acesso do servidor
var _data = []; //guarda os dados entregues pelo servidor

/**
 * Envia um solicitação get para url de destino enviando o token como header.
 * sucess: salva os dados recebidos em uma variável _data, depois esconde login.
 * error: mostra o login e apaga o token localmente salvo.
 * @param {string} _url
 * @example getContent("/blog");
 */
const getContentMid = (_url)=>{
    _divId = "#content-mid";
    $("#loading").show();
    $.ajax({
        type: "GET",
        url: _url,
        headers: {token: _token},
        success: ( data )=>{
            _data = data;
            //no primeiro carregamento se tiver dados garanto que login nao aparecerá.
            $("#login").hide();
            $(".navLista").show();
            console.log(_url);
            if(_url == "/blog") populatePosts();
            if(_url == "/users") populateUsers();
        },
        error: (textStatus)=>{
            //caso não vier dados faço login novamente
            $("#login").show();
            $(".navLista").hide();
            $("#loading").hide();
            $(messageLogin).html(textStatus.responseJSON.error);
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
        }
    });
};

/**
 * Faz o login através de um solicitação POST com os dados dos input.
 * sucess: salva o token recebido em _token, salva o token localmente e esconde login.
 * error: atualiza tela de login com mensagem.
 */
const doLogin =()=>{
    $.ajax({
        type: "POST",
        url: "/users/auth",
        data: {email: $("#email").val(), pass: $("#pass").val()},
        success: ( data )=>{
            _token = data.token;
            if( $('#formCheck').is(':checked') ){
                localStorage.setItem("token", _token);
            }else{
                sessionStorage.setItem("token", _token);
            }
            $("#login").hide();
            $(".navLista").show();
            getContentMid("/blog");
        },
        error: (textStatus)=>{
            $("#messageLogin").html(textStatus.responseJSON.error);
        }
    });
};

/**
 * Para ser usado depois de get content pq utilizará os dados recebidos  e salvos por esta função.
 * Faz um for enquando houver dados em "_data" atualizando a tela com eles.
 */
const populatePosts = ()=>{
    for( var i = 0; i < _data.length; i++){
        var $div = $("<div class='card'><div");
        $div.append("<h5 class='card-header'>" + _data[i].title + "</h5>");
        $div.append("<div class='card-body'><p class='card-text'>" + _data[i].body + "</p>");
        $div.append("<footer class='blockquote-footer'>Por: " + _data[i].idAuthor + " em: " +_data[i].date + "</footer>");
        $div.append("<a href='#' class='btn btn-primary'>Editar</a></div>");
        //chama telade edição passado "_data[i] como parãmetro
        if(i){
            $("#content-mid").append($div);
        }else{
            $("#content-mid").html($div);
        }
    }
    $("#loading").hide();
}

/**
 * Para ser usado depois de get content pq utilizará os dados recebidos  e salvos por esta função.
 * Faz um for enquando houver dados em "_data" atualizando a tela com eles.
 */
const populateUsers = ()=>{
    for( var i = 0; i < _data.length; i++){
        var $div = $("<div class='card'><div");
        $div.append("<div class='card-body'>" + _data[i].email + "</div>");
        $div.append("<footer class='blockquote-footer'>Criado em: " + _data[i].create + ". Adm: " + _data[i].admin + "</footer>");
        $div.append("<a href='#' class='btn btn-primary'>Editar</a></div>");
        //chama telade edição passado "_data[i] como parãmetro
        if(i){
            $("#content-mid").append($div);
        }else{
            $("#content-mid").html($div);
        }

    }
    $("#loading").hide();
}
//após carregar o site
$(document).ready(()=>{
////O primeiro carregamento
    $("#loading").hide();
    $(".navLista").hide();
    _token = localStorage.getItem("token");
    if(!_token) _token = sessionStorage.getItem("token");
    if(_token) getContentMid("/blog");
       
////manipulação dos clicks da nav bar
    $('#posts').on("click", ()=>{
        $("#users").removeClass("active");
        $("#posts").addClass("active");
        $("#sobre").removeClass("active");
        getContentMid("/blog");
    });
    $('#users').on("click", ()=>{
        $("#users").addClass("active");
        $("#posts").removeClass("active");
        $("#sobre").removeClass("active");
        getContentMid("/users");
    });
    $('#sobre').on("click", ()=>{
        $("#users").removeClass("active");
        $("#posts").removeClass("active");
        $("#sobre").addClass("active");
        getContentMid("/sobre"); //fazer a rota
    });
    $("#sair").on("click", ()=>{
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        location=("/");
    })
});
