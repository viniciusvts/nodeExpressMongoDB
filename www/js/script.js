//definição de variáveis e métodos
const progressBar = "<div class='progress'><div class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-valuenow='80' aria-valuemin='0' aria-valuemax='100' style='width: 75%'></div></div>";
const getContent = (_url)=>{
    $("#content").html(progressBar)
    $.ajax({
        type: "GET",
        url: _url,
        success: ( data )=>{
            $("#content").html(data);
        }
    });
}
$(document).ready(()=>{
    //carrega a home ao primeiro carregamento
    getContent("/assets/home.html");
    //manipulação dos clicks da nav bar
    $('#home').on("click", ()=>{
        $("#home").addClass("active");
        $("#blog").removeClass("active");
        $("#sobre").removeClass("active");
        getContent("/assets/home.html");
    });
    $('#blog').on("click", ()=>{
        $("#home").removeClass("active");
        $("#blog").addClass("active");
        $("#sobre").removeClass("active");
        getContent("/assets/blog.html");
    });
    $('#sobre').on("click", ()=>{
        $("#home").removeClass("active");
        $("#blog").removeClass("active");
        $("#sobre").addClass("active");
        getContent("/assets/sobre.html");
    });

});
