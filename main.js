var size = 13;
var cal_aoj,cal_atcoder,cal_codeforces,cal_yukicoder,cal_all;
var now;
var query_time;
var count = 0;
var all_solved = 0;
var all_new_ac = 0;
var today_atcoder;
var today_codeforces;
var today_yukicoder;
var today_aoj;
var all_ac = {};
var new_time = 1546268400;//2019/1/1
var day = 24*60*60;
var today;
var time_diff = 9*60*60;

let aoj = {};
//
aoj.api = {};

aoj.api.baseUrl = 'https://judgeapi.u-aizu.ac.jp';

aoj.api.request = (url, params) =>
  fetch(`${url}?${$.param(Object.assign({ _timestamp: +new Date() }, params))}`)
    .then(x => x.json());

aoj.api.users = {};

aoj.api.users.findById = id =>
  aoj.api.request(`${aoj.api.baseUrl}/users/${id}`);

aoj.api.solutions = {};

aoj.api.solutions.findByUserId = (userId, page) =>
  aoj.api.request(`${aoj.api.baseUrl}/solutions/users/${userId}`, { page });

aoj.api.solutions.findAllByUserId = userId =>
  new Promise((resolve, reject) => {
    let allSolutions = [];
    let page = 0;
    let tryUnlessEmpty = () => {
      aoj.api.solutions.findByUserId(userId, page).then(nextSolutions => {
        if (nextSolutions.length === 0) {
          allSolutions.sort((a, b) => a.submissionDate - b.submissionDate);
          resolve(allSolutions);
          return;
        }
        allSolutions = allSolutions.concat(nextSolutions);
        page++;
        tryUnlessEmpty();
      });
    };
    tryUnlessEmpty();
  });
//

(function(){
    'use strict';
    now = new Date();
    cal_all = new CalHeatMap();
    cal_all.init({
        itemSelector: '#all-heatmap',
        domainLabelFormat: '%Y-%m',
        start: new Date(now.getFullYear(), now.getMonth() - 11),
        cellSize: size,
        range: 12,
        domain: "month",
        domainGutter: 5,
        legend: [1, 3, 5]
    });
    cal_aoj = new CalHeatMap();
    cal_aoj.init({
        itemSelector: '#aoj-heatmap',
        domainLabelFormat: '%Y-%m',
        start: new Date(now.getFullYear(), now.getMonth() - 11),
        cellSize: size,
        range: 12,
        domain: "month",
        domainGutter: 5,
        //legendColors: ["#efefef", "gold"],
        legend: [1, 3, 5]
    });
    cal_atcoder = new CalHeatMap();
    cal_atcoder.init({
        itemSelector: '#atcoder-heatmap',
        domainLabelFormat: '%Y-%m',
        start: new Date(now.getFullYear(), now.getMonth() - 11),
        cellSize: size,
        range: 12,
        domain: "month",
        domainGutter: 5,
        //legendColors: ["#efefef", "deeppink"],
        legend: [1, 3, 5]
    });
    cal_codeforces = new CalHeatMap();
    cal_codeforces.init({
        itemSelector: '#codeforces-heatmap',
        domainLabelFormat: '%Y-%m',
        start: new Date(now.getFullYear(), now.getMonth() - 11),
        cellSize: size,
        range: 12,
        domain: "month",
        domainGutter: 5,
        //legendColors: ["#efefef", "navy"],
        legend: [1, 3, 5]
    });

    cal_yukicoder = new CalHeatMap();
    cal_yukicoder.init({
        itemSelector: '#yukicoder-heatmap',
        domainLabelFormat: '%Y-%m',
        start: new Date(now.getFullYear(), now.getMonth() - 11),
        cellSize: size,
        range: 12,
        domain: "month",
        domainGutter: 5,
        //legendColors: ["#efefef", "brown"],
        legend: [1, 3, 5]
    });
/*
    var result = {};
    if(1 < window.location.search.length) {
        var query = window.location.search.substring(1);
        var parameters = query.split('&');
        for(var i = 0; i < parameters.length; i++) {
            var element = parameters[i].split('=');
            var paramName  = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);
            result[paramName] = paramValue;
        }
    }
*/
    //console.log(result["handle_codeforces"]);
    //console.log(result["handle_atcoder"]);
    //console.log(result["handle_aoj"]);
/*    if(result["handle_codeforces"])
	      document.getElementById("handle_codeforces").value = result["handle_codeforces"];
    if(result["handle_atcoder"])
	      document.getElementById("handle_atcoder").value = result["handle_atcoder"];
    if(result["handle_aoj"])
	      document.getElementById("handle_aoj").value = result["handle_aoj"];
*/
    getData();

})();

function getData(){
/*
    var handle_aoj = document.getElementById("handle_aoj").value;
    var handle_atcoder = document.getElementById("handle_atcoder").value;
    var handle_codeforces = document.getElementById("handle_codeforces").value;
    var str = "handle_atcoder=" + handle_atcoder + "&handle_codeforces=" + handle_codeforces + "&handle_aoj=" + handle_aoj;
    history.replaceState('', '', `?${str}`);
*/
    now = new Date();
    query_time = Math.floor(now/300);
    count = 0;
    all_solved = 0;
    all_new_ac = 0;
    all_ac = {};

    today_atcoder = 0;
    today_codeforces = 0;
    today_yukicoder = 0;
    today_aoj = 0;
    //console.log(now.getTime());
    today = Math.floor((now.getTime()/1000 + time_diff)/day) * day - time_diff;
    console.log(today);

    var handle_aoj = "is0384er";
    var handle_atcoder = "rika0384";
    var handle_codeforces = "rika0384";
    var handle_yukicoder = "wk1080id";
    getAOJ(handle_aoj);
    getAtCoder(handle_atcoder);
    getCodeForces(handle_codeforces);
    getYukicoder(handle_yukicoder);
}

function getAOJ(handle) {
    aoj.api.solutions.findAllByUserId(handle).then(function(solutions) {
        let problems = new Set();
        var aoj_ac = {};
        var solved = 0;
        var new_ac = 0;
        for (let solution of solutions) {
            if (problems.has(solution.problemId)) continue;
            problems.add(solution.problemId);
            solved += 1;
            aoj_ac[(solution.judgeDate/1000)] = 1;
            all_ac[(solution.judgeDate/1000)] = 1;
            if(Number(solution.judgeDate/1000) >= new_time)new_ac++;
            if(Number(solution.judgeDate/1000) >= today)today_aoj++;
        }

        console.log(solved);
        document.getElementById("aoj_id").textContent = handle;
        document.getElementById("aoj_solved").textContent = solved + "AC（" + new_ac + "AC）";
        cal_aoj.update(aoj_ac);
        all_solved += solved;
        all_new_ac += new_ac;
        count++;
        if(count == 4){
            cal_all.update(all_ac);
            document.getElementById("all_solved").textContent = all_solved + "AC（" + all_new_ac + "AC）";
            var today_all = today_atcoder + today_codeforces + today_yukicoder + today_aoj;
            document.getElementById("today_all").textContent = today_all + "AC";
            document.getElementById("today_atcoder").textContent = today_atcoder + "AC";
            document.getElementById("today_codeforces").textContent = today_codeforces + "AC";
            document.getElementById("today_yukicoder").textContent = today_yukicoder + "AC";
            document.getElementById("today_aoj").textContent = today_aoj + "AC";
        }

    });

}

function getAtCoder(handle){
    //var handle = document.getElementById("handle_atcoder").value;
    //var handle = "rika0384";
    //console.log(handle);
    var solved = 0;
    var new_ac = 0;
    var url = "https://kenkoooo.com/atcoder/atcoder-api/results?user=" + handle + "&timestamp=" + query_time;

    fetch(url).then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            var atcoder_ac = {};
            var problems = {};
            for(var i = 0; i < json.length; i++){
                  if(json[i].result != "AC")continue;
                  var prob = json[i].problem_id;
                  if(problems[prob] == undefined){
                      problems[prob] = 1;
                      solved += 1;
                      atcoder_ac[json[i].epoch_second] = 1;
                      all_ac[json[i].epoch_second] = 1;
                      if(Number(json[i].epoch_second) >= new_time)new_ac++;
                      if(Number(json[i].epoch_second) >= today)today_atcoder++;
                  }
            }
            console.log(solved);
            console.log(new_ac);
            document.getElementById("atcoder_id").textContent = handle;
            document.getElementById("atcoder_solved").textContent = solved +"AC（" + new_ac+ "AC）";
            cal_atcoder.update(atcoder_ac);
            all_solved += solved;
            all_new_ac += new_ac;
            count++;
            if(count == 4){
                cal_all.update(all_ac);
                document.getElementById("all_solved").textContent = all_solved + "AC（" + all_new_ac + "AC）";
                var today_all = today_atcoder + today_codeforces + today_yukicoder + today_aoj;
                document.getElementById("today_all").textContent = today_all + "AC";
                document.getElementById("today_atcoder").textContent = today_atcoder + "AC";
                document.getElementById("today_codeforces").textContent = today_codeforces + "AC";
                document.getElementById("today_yukicoder").textContent = today_yukicoder + "AC";
                document.getElementById("today_aoj").textContent = today_aoj + "AC";
            }
        });

}

function getCodeForces(handle){
    //var handle = document.getElementById("handle_codeforces").value;
    //var handle = "rika0384";
    //console.log(handle);
    var solved = 0;
    var new_ac = 0;
    var url = "https://codeforces.com/api/user.status?handle=" + handle + "&timestamp=" + query_time;

    fetch(url).then(function(response) {
            return response.json();
        }).then(function(json) {
            json = json.result;
            console.log(json);
            var codeforces_ac = {};

            var problems = {};
            for(var i = 0; i < json.length; i++){
                if(json[i].verdict != "OK" || json[i].testset != "TESTS" )  continue;
                var prob = json[i].problem;
                if(problems[prob.contestId] != undefined){
                    if(problems[prob.contestId][prob.name] == undefined){
                           problems[prob.contestId][prob.name] = 1;
                           solved += 1;
                           codeforces_ac[json[i].creationTimeSeconds] = 1;
                           all_ac[json[i].creationTimeSeconds] = 1;
                           if(Number(json[i].creationTimeSeconds) >= new_time)new_ac++;
                           if(Number(json[i].creationTimeSeconds) >= today)today_codeforces++;
                    }
                }else{
                       problems[prob.contestId] = {};
                       problems[prob.contestId][prob.name] = 1;
                       solved += 1;
                       codeforces_ac[json[i].creationTimeSeconds] = 1;
                       all_ac[json[i].creationTimeSeconds] = 1;
                       if(Number(json[i].creationTimeSeconds) >= new_time)new_ac++;
                       if(Number(json[i].creationTimeSeconds) >= today)today_codeforces++;
                }
            }
            console.log(codeforces_ac);
            console.log(solved);

            document.getElementById("codeforces_id").textContent = handle;
            document.getElementById("codeforces_solved").textContent = solved + "AC（" + new_ac + "AC）";
            cal_codeforces.update(codeforces_ac);
            all_solved += solved;
            all_new_ac += new_ac;
            count++;
            if(count == 4){
                cal_all.update(all_ac);
                document.getElementById("all_solved").textContent = all_solved + "AC（" + all_new_ac + "AC）";
                var today_all = today_atcoder + today_codeforces + today_yukicoder + today_aoj;
                document.getElementById("today_all").textContent = today_all + "AC";
                document.getElementById("today_atcoder").textContent = today_atcoder + "AC";
                document.getElementById("today_codeforces").textContent = today_codeforces + "AC";
                document.getElementById("today_yukicoder").textContent = today_yukicoder + "AC";
                document.getElementById("today_aoj").textContent = today_aoj + "AC";
            }

        });

}
function getYukicoder(handle){
    var solved = 0;
    var new_ac = 0;
    var yukicoder_ac = {"1511779777":1,"1546276642":1,"1546414885":1,"1546511280":1,"1546537883":1,"1546626859":1,"1547025828":1,
                        "1546762161":1,"1546771749":1,"1546794678":1,"1546836560":1,"1546940842":1,"1547046983":1,"1547142667":1,
                        "1547182712":1,"1547228625":1,"1547368816":1,"1547399156":1,"1547402021":1,"1547540060":1,"1547574871":1,
                        "1547650890":1,"1547774174":1,"1547824952":1,"1547912025":1,"1548002716":1,"1548169174":1,"1548169874":1,
                        "1548234283":1,"1548257597":1,"1548423757":1,"1548439119":1,"1548578454":1,"1548660259":1,"1548752028":1,
                        "1548858093":1,"1548862195":1,"1549028684":1,"1549113255":1,"1549126023":1,"1549207646":1,"1549360051":1,
                        "1549379896":1,"1549544053":1,"1549560405":1,"1549623013":1,"1549704808":1,"1549727155":1,"1549818393":1,
                        "1549898165":1,"1550067136":1,"1550072508":1,"1550214189":1,"1550249210":1,"1550331293":1,"1550490019":1,
                        "1550506221":1,"1550656602":1,"1550745798":1,"1550824009":1,"1550929661":1,"1550995551":1,"1551059627":1,
                        "1551187297":1,"1551201430":1,"1551358319":1,"1551447820":1,"1551508582":1,"1551548988":1,"1551702977":1,
                        "1551740296":1,"1552301069":1,"1552459117":1,"1552575498":1,"1552634473":1,"1552747759":1,"1552827066":1,
                        "1552912419":1,"1553004191":1,"1553016050":1};
    for(var key in yukicoder_ac){
        all_ac[key] = 1;
        if(Number(key) >= new_time)new_ac++;
        if(Number(key) >= today)today_yukicoder++;
    }
    solved += Object.keys(yukicoder_ac).length;
    document.getElementById("yukicoder_id").textContent = handle;
    document.getElementById("yukicoder_solved").textContent = solved + "AC(" + new_ac + "AC)";
    cal_yukicoder.update(yukicoder_ac);
    all_solved += solved;
    all_new_ac += new_ac;
    count++;
    if(count == 4){
        cal_all.update(all_ac);
        document.getElementById("all_solved").textContent = all_solved + "AC（" + all_new_ac + "AC）";
        var today_all = today_atcoder + today_codeforces + today_yukicoder + today_aoj;
        document.getElementById("today_all").textContent = today_all + "AC";
        document.getElementById("today_atcoder").textContent = today_atcoder + "AC";
        document.getElementById("today_codeforces").textContent = today_codeforces + "AC";
        document.getElementById("today_yukicoder").textContent = today_yukicoder + "AC";
        document.getElementById("today_aoj").textContent = today_aoj + "AC";
    }

}
