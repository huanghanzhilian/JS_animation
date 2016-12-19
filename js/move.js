


function starmove(obj, json,time, fn) {
    var fn,times;
    if(arguments[2]==undefined){
        times=30;
    }else if(typeof time=="function"){
        times=30;
        fn=time;
    }else if(typeof time=="number"){
        times=time;
    }

    if(arguments[3]){
        fn=fn;
    }
    clearInterval(obj.zzz);
    obj.zzz = setInterval(function() {
        var flag = true;
        for (var attr in json) {
            var icur = 0;
            if (attr == 'opacity') {
                icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                icur = parseInt(getStyle(obj, attr));
            }

            var speed = (json[attr] - icur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (icur != json[attr]) {
                flag = false;
            }
            if (attr == 'opacity') {
                icur += speed;
                obj.style.filter = 'alpha(opacity:' + icur + ')';
                obj.style.opacity = icur / 100;
            } else {
                obj.style[attr] = icur + speed + 'px';
            }

        }
        if (flag) {
            clearInterval(obj.zzz);
            if (fn) {
                fn();
            }
        }
    }, times)
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}