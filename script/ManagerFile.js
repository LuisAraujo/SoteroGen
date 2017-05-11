ManagerFile = function(){ };


ManagerFile.prototype.getSetting = function(filepath){

    var jqxhr = $.post( "php/getSetting.php",{filepath: filepath }, function() {
    })
        .done(function(data){
            data_json = jQuery.parseJSON(data);

            for(var i = 0; i< data_json.length; i++){
                app.dirSite  = data_json[i]["dirsite"];
                console.log(app.dirSite);
                app.currentStyle  = data_json[i]["currentstyle"];
            }
        })
        .fail(function() {
            alert( "error" );
        });
};



ManagerFile.prototype.getListFiles = function(callback){

    var jqxhr = $.post( "php/getListFile.php", function() {
    })
        .done(function(data){
            data_json = jQuery.parseJSON(data);
            callback(data_json);
        })

        .fail(function() {
            alert( "error" );
     });
};


ManagerFile.prototype.getDataFiles = function(filepath){

    var jqxhr = $.post( "php/getDataFile.php",{filepath: filepath }, function() {
    })
        .done(function(data){
            data_json = jQuery.parseJSON(data);

            for(var i = 0; i< data_json.length; i++){
                $("#inp-text-title").val(data_json[i]["title"]);
                $("#inp-text-tag").val(data_json[i]["tag"]);
                $("#inp-text-date").val(data_json[i]["date"]);
                $("#inp-text-abstract").val(data_json[i]["abstract"]);
                $("#inp-text-content").val(data_json[i]["content"]);

                app.setContentInFrameEditor(data_json[i]["content"]);
            }
        })
        .fail(function() {
            alert( "error" );
        });
};

ManagerFile.prototype.saveFile = function(filepath, title, tag, date,abstract, content){


    var jqxhr = $.post("php/saveFilesPost.php",{filepath:filepath, title:title, tag:tag, date:date, abstract:abstract, content:content}, function() {
    })
    .done(function(data){
         console.log(data)
         app.showListFiles();
    })
    .fail(function() {
            alert( "error" );
    });

};




ManagerFile.prototype.createBlog = function(){

    var jqxhr = $.post( "gerator/index.php", {dirsite: app.dirSite},  function() {
    })
        .done(function(data){
            window.open("http://localhost/SoteroGen/gerator/"+app.dirSite,'_blank');
        })

        .fail(function() {
            alert( "error" );
        });
};

