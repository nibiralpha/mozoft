var datas = [];
$.get("http://localhost:3000/report", function (data) {
    
    console.log("with null", data);

    data.report.forEach(element => {
        var nulll = false;
        element.data.forEach(info => {
            if (info.pa != null && info.da != null && info.count != null && info.link != null) {
                nulll = false;
            } else {
                nulll = true;
                return
            }
        })

        if (nulll == false) {
            datas.push(element);
        }
    });
    console.log("without null", datas);
});