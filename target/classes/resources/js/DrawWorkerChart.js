/* ------------------------worker--------------------------------- */
//用户任务完成情况统计
var workerChart1 = echarts.init(document.getElementById('workerChart1'));
var workerObj = getWorkerData();

var workerOption1 = {
    title : {
        text: '用户任务完成情况统计',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['已完成','未完成']
    },
    series : [
        {
            name: '任务数',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                //{value:workerObj.workerFinishedMissionNum, name:'已完成'},
                {value:50, name:'已完成'},
                //{value:workerObj.workerUnfinishedMissionNum, name:'未完成'},
                {value:60, name:'未完成'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

workerChart1.setOption(workerOption1);

/* ------------------------------------------------------------------- */
//条形折线图 已提交任务中 针对每个任务 ['我的分数','最高分','平均分数']
var workerChart2 = echarts.init(document.getElementById('workerChart2'));
var workerOption2 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:['我的分数','最高分数','平均分数']
    },
    xAxis: [
        {
            type: 'category',
            //data: workerObj.workerMissionName,
            data: ['任务1','任务2','任务3','任务4','任务5','任务6','任务7'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '分数',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
                formatter: '{value} 分'
            }
        },
        {
            type: 'value',
            name: '分数',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
                formatter: '{value} 分'
            }
        }
    ],
    series: [
        {
            name:'我的分数',
            type:'bar',
            //data:workerObj.workerCredit
            data:[10.0, 34.9, 27.0, 23.2, 25.6, 36.7, 35.6]
        },
        {
            name:'最高分数',
            type:'bar',
            //data:workerObj.workerMaxCredit
            data:[20.6, 45.9, 39.0, 26.4, 48.7, 40.7, 50.6]
        },
        {
            name:'平均分数',
            type:'line',
            yAxisIndex: 1,
            //data:workerObj.workerAverageCredit
            data:[14.0, 40.2, 22.3, 24.5, 36.3, 30.2, 40.3]
        }
    ]
};
workerChart2.setOption(workerOption2);
/* ------------------------------------------------------------------- */
//根据[mission,credit,quality] 三维图显示用户的标注情况
var workerChart3 = echarts.init(document.getElementById('workerChart3'));

//var mission = workerObj.workerMissionName;
//var credit = workerObj.workerCredit;
//var quality = workerObj.workerMissionCreditQuality;
var mission = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7',
    'm8', 'm9', 'm10','m11','m12',
    'm13', 'm14', 'm15', 'm16', 'm17', 'm18',
    'm19', 'm20', 'm21', 'm22', 'm23', 'm24'];
var credit = ['10', '20', '30',
    '40', '50', '60', '70'];
var quality = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];

var workerOption3 = {
    tooltip: {},
    visualMap: {
        max: 20,
        inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        }
    },
    xAxis3D: {
        type: 'category',
        data: mission
    },
    yAxis3D: {
        type: 'category',
        data: credit
    },
    zAxis3D: {
        type: 'value'
    },
    grid3D: {
        boxWidth: 200,
        boxDepth: 80,
        viewControl: {
            // projection: 'orthographic'
        },
        light: {
            main: {
                intensity: 1.2,
                shadow: true
            },
            ambient: {
                intensity: 0.3
            }
        }
    },
    series: [{
        type: 'bar3D',
        data: quality.map(function (item) {
            return {
                value: [item[1], item[0], item[2]],
            }
        }),
        shading: 'lambert',

        label: {
            textStyle: {
                fontSize: 16,
                borderWidth: 1
            }
        },

        emphasis: {
            label: {
                textStyle: {
                    fontSize: 20,
                    color: '#900'
                }
            },
            itemStyle: {
                color: '#900'
            }
        }
    }]
}
workerChart3.setOption(workerOption3);
/* ------------------------------------------------------------------- */