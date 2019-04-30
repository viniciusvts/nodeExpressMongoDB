//definição de variáveis e métodos
const progressBar = "<div class='progress'><div class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-valuenow='80' aria-valuemin='0' aria-valuemax='100' style='width: 75%'></div></div>";
const pagesUrl = "/pages/";
const getContentMid = (_item)=>{
    _divId = "#content-mid"
    $(_divId).html(progressBar)
    $.ajax({
        type: "GET",
        url: pagesUrl + _item,
        success: ( data )=>{
            $(_divId).html(data);
        },
        error: (textStatus)=>{
            $(_divId).html("Não foi possivel completar a solicitação: " + textStatus.responseJSON.error);
        }
    });
}   
$(document).ready(()=>{
    //carrega o primeiro carregamento
    getContentMid("home.html");
    //manipulação dos clicks da nav bar
    $('#home').on("click", ()=>{
        $("#home").addClass("active");
        $("#blog").removeClass("active");
        $("#sobre").removeClass("active");
        getContentMid("home.html");
    });
    $('#blog').on("click", ()=>{
        $("#home").removeClass("active");
        $("#blog").addClass("active");
        $("#sobre").removeClass("active");
        getContentMid("blog.html");
    });
    $('#sobre').on("click", ()=>{
        $("#home").removeClass("active");
        $("#blog").removeClass("active");
        $("#sobre").addClass("active");
        getContentMid("sobre.html");
    });

});
