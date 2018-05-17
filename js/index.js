var schedule= [
    "2018-05-06T24:00:00","2018-05-13T24:00:00","2018-05-20T24:00:00","2018-05-27 24:00:00","2018-06-03 24:00:00",
    "2018-06-10 24:00:00","2018-06-17 24:00:00","2018-06-24 24:00:00","2018-07-01 24:00:00"
];
window.onload = function() {
    //스케줄에 있는 시간 가져오기
    // 데드라인 :머니핏 첼린지 7월1일까지

    var timecountDown=SelectSchedule(schedule);
 
    //getTimeRemaining(timecountDown);
    
    timecountDown=initializeClock('clockdiv',timecountDown);
    
    var options = {
      useEasing: true, 
      useGrouping: true, 
      separator: ',', 
      decimal: '.', 
    };
    var challenge_population = new CountUp('challenge_population', 0, 1000, 0, 1.5, options);
    if (!challenge_population.error) {
        challenge_population.start();
    } else {
      console.error(challenge_population.error);
    }

    var challenge_prize = new CountUp('challenge_prize', 0, 100, 0, 1.5, options);
    if (!challenge_prize.error) {
        challenge_prize.start();
    } else {
      console.error(challenge_prize.error);
    }
}
    
function SelectSchedule(scheduler){
    for(var i=0;i<scheduler.length;i++){
    var startDate = scheduler[i];
    var endDate = scheduler[i+1];
    var startMs=Date.parse(startDate);
    var endMs = Date.parse(endDate);
    var currentMs = Date.parse(new Date());

    if(endMs>currentMs && currentMs>=startMs){
        return endDate;
    }
}}
function getTimeRemaining(endtime){

    var t = Date.parse(endtime)-Date.parse(new Date());
    
    var seconds = Math.floor( (t/1000)%60);
    var minutes = Math.floor((t/1000/60)%60);
    var hours = Math.floor((t/1000/60/60)%24);
    var days = Math.floor(t/(1000*60*60*24));
    return {
        'total':t,
        'days':days,
        'hours':hours,
        'minutes':minutes,
        'seconds':seconds
    };
}

function initializeClock(id,endtime){
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
    
    function updateClock(){
        var t = getTimeRemaining(endtime);
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        //시간 경과시 다음 스케줄로 시간 설정
        if (t.total < 0) {  
          return initializeClock(id,SelectSchedule(schedule));
        }}

      updateClock();
      var timeinterval = setInterval(updateClock,1000);
    }
    
