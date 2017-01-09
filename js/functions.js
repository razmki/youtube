function getXmlHttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}
var videoInfo;
function requestVideo(i) {
    var allURL = queryStats + videoList.items[i].id.videoId + '&part=snippet,statistics';
    var xmlhttp1 = getXmlHttp();
    xmlhttp1.open('GET', allURL, false);
    xmlhttp1.onreadystatechange = function() {
        if (xmlhttp1.readyState == 4) {
            if(xmlhttp1.status == 200) {
                videoInfo = JSON.parse(xmlhttp1.responseText);
            }
        }
    }
    xmlhttp1.send(null);
}
function requestListVideos(inputValue) {
    var allURL = queryURL + inputValue;
    var xmlhttp = getXmlHttp();
    xmlhttp.open('GET', allURL, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                videoList = JSON.parse(xmlhttp.responseText);
                var res = '';
                i = 0;
                var leftValue = 0;
                var rightPage = 0;
                var wrap = document.createElement('div');
                wrap.classList.add('wrapper');
                function changeCountInRender() {
                    const markup = `
                            <div class="swipe__page flex" style="transform: translate(${rightPage}%, 0);">
                                ${renderKeywords(i)}
                            </div>
                    `;
                    rightPage += 100;
                    wrap.innerHTML += markup;
                    i += 4;
                    if (i < 16) {
                        changeCountInRender(i);
                    } else {
                        return res;
                    }

                }
                function renderKeywords(i) {
                    maxI = i + 4;
                    var result = '';
                    for (i; i < maxI; i++) {
                        requestVideo(i);
                        result += `
                        <div class="videoBlock">
                            <a href="https://www.youtube.com/watch?v=${videoList.items[i].id.videoId}"><h3>${videoList.items[i].snippet.title}</h3></a>
                            <div class="mainInfo">
                                <img src=${videoList.items[i].snippet.thumbnails.high.url}>
                                <span class="author"><i class="fa fa-user" aria-hidden="true"></i> ${videoList.items[i].snippet.channelTitle}</span>
                                <span class="otherInfo flex">
                                    <span class="dateRelease"><i class="fa fa-calendar-plus-o" aria-hidden="true"></i> ${videoList.items[i].snippet.publishedAt.slice(0, 10)}</span>
                                    <span class="dateRelease"><i class="fa fa-eye" aria-hidden="true"></i> ${videoInfo.items[0].statistics.viewCount}</span>
                                </span>
                            </div>
                            <p class="description"> ${videoList.items[i].snippet.description}</p>
                        </div>
                        `;
                        }
                    return result;
                }
                if (document.body.lastChild) {
                    document.body.removeChild(document.body.lastChild);
                }
                changeCountInRender();
                document.body.appendChild(wrap);
                
            }
        }
    };
    xmlhttp.send(null);
}