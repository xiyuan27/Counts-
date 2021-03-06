var submitButton=document.getElementById("submitButton");
var indexPic=1;
var requestorPhone;
var tags;

function load(userPhone) {

    requestorPhone=userPhone;
    document.getElementById("actualNumber").value=requestorPhone;
}

function loadTag(tags){
    missionLabel = tmpPrintMissionLabel(tags);
}

function submitMission() {
    if(!veriInput()){
        return;
    }
    //tmpPrintMissionLabel();//

    //alert(JSON.stringify(missionLabel));


    myDropzone.processQueue();
    alert("发布成功！");
    var form=document.getElementById("formID");
    form.submit();
};

//以下方法是把missionLabel的String变成Array并返回

function tmpPrintMissionLabel(){
    var missionLabel = [];
    var tmp = document.getElementById("tag_editor").value;
    missionLabel = tmp.split(",");
    missionLabel.filter(function (value) { return value !== " "});
    for(var i = 0;i<missionLabel.length;i++){
        //alert(missionLabel[i]);
    }
    return missionLabel;
}

/*
dropzone setting
 */
Dropzone.autoDiscover = false;

var myDropzone = new Dropzone("#myDropzone", {
    url: "/uploadPics",
    addRemoveLinks: true,
    autoProcessQueue: false,
    method: 'post',
    filesizeBase: 1024,
    parallelUploads: 100000,
    acceptedFiles: ".jpg", //上传的类型

    sending: function(file, xhr, formData) {

    },
    success: function (returnData) {
    },

    params: {
        name: "234"
    },

    init: function () {
        //var missionLabel = tmpPrintMissionLabel();


        this.on("processing", function (file) {
            this.options.params={
                name: document.getElementById("name").value,
                endTime: document.getElementById("endTime").value,
                workLevel: document.getElementById("workerLevel").value,
                description: document.getElementById("description").value,
                maxWorkerNum: document.getElementById("maxWorkerNum").value,
                reward: document.getElementById("reward").value,
                indexPic: indexPic,
                fileNum: document.getElementsByClassName("dz-image").length,
                requestorPhone: requestorPhone,
                difficulty: document.getElementById("difficulty").value,
                missionLabel: JSON.stringify(missionLabel),

                //missionLabel: JSON.stringify($("#tag_editor").tagEditor('getTags')[0].tags),
                tagType: document.getElementById("tagType").value,
                picType: document.getElementById("picType").value,
                bonusStrategy: document.getElementById("bonusStrategy").value,
                evaluateStrategy: document.getElementById("evaluateStrategy").value,

            };
            indexPic++;
        });
    },

    dictDefaultMessage:'拖动文件至此或者点击上传',
    dictMaxFilesExceeded: "您最多只能上传1个文件！",
    dictResponseError: '文件上传失败!',
    dictInvalidFileType: "文件类型只能是*.jpg,*.gif,*.png,*.jpeg。",
    dictFallbackMessage:"浏览器不受支持",
    dictFileTooBig:"文件过大上传文件最大支持.",
    dictRemoveLinks: "删除",
    dictCancelUpload: "取消"
});

function veriInput() {
    var name=document.getElementById("name").value;
    var endTime=document.getElementById("endTime").value;
    var workLevel=document.getElementById("workerLevel").value;
    var description=document.getElementById("description").value;
    var maxWorkerNum=document.getElementById("maxWorkerNum").value;
    var reward=document.getElementById("reward").value;
    var tagType=document.getElementById("tagType").value;

    if(tagType == "1" && missionLabel.length<2){
        alert("标签式任务标签不能少于2个");
        return false;
    }

    if(maxWorkerNum < document.getElementsByClassName("dz-image").length/2){
        alert("标注人数至少需大于图片数一半");
        return false;
    }

    if(name==null||name===""){
        alert("请填写任务名称！");
        return false;
    }
    if(name.length>=15){
        alert("任务名称不能大于15!");
        return false;
    }

    var existed;
    var enough;

    $.ajax({
        async: false,
        type: "POST",
        url: "/findMission",
        contentType: "application/json",
        dataType: "json",
        data: name,
        success: function (returnData){
            existed=returnData;
        },
        error: function(msg){
            //alert("fail12")
        }
    });




    if(endTime==null||endTime==""){
        alert("请正确设置起止时间！");
        return false;
    }
    if(workLevel==null||workLevel==""){
        alert("请设置工人等级限制!");
        return false;
    }
    if(description==""||description==null){
        alert("请输入任务描述!");
        return false;
    }
    if(maxWorkerNum==null||maxWorkerNum==""||isNaN(maxWorkerNum)){
        alert("请设置期待标注人数！");
        return false;
    }
    if(reward==null||reward==""||isNaN(reward)){
        alert("请正确设置奖励！");
        return false;
    }

    $.ajax({
        async: false,
        type: "POST",
        url: "/findEnough",
        contentType: "application/json",
        dataType: "json",
        data: reward+"#"+requestorPhone,
        success: function (returnData){
            enough=returnData;
        },
        error: function(){
            //alert("fail13")
        }
    });

    if(enough==false){
        alert("积分不足，请联系管理员进行充值！");
        return;
    }


    if(document.getElementsByClassName("dz-image").length<15){
        alert("任务图片数量不能少于15");
        return false;
    }

    if(existed){
        alert("任务名已被占用！");
        return false;
    }

    return true;

}



