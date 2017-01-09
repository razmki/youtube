var queryURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyD42cwbQdzUvboEhIV8dN-FaGD5lHUhUZk&type=video&part=snippet&maxResults=16&q='
var queryStats = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyD42cwbQdzUvboEhIV8dN-FaGD5lHUhUZk&id=';
var searchInput = document.createElement('input');
var body = document.getElementsByTagName('body');
document.body.appendChild(searchInput);
var videoList;

searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13 && searchInput.value) {
        requestListVideos(searchInput.value); 
    }
});
var move;
var moveRight;
var swipePageArr;
var startX;
document.addEventListener('mousedown', animate);

function animate(e) {
    swipePageArr = document.querySelectorAll('.swipe__page');
    startX = e.pageX;
    document.addEventListener('mousemove', mouseMove);
}
    function mouseMove(event) {
        move = -(startX - event.pageX);
        moveRight = -(startX - event.pageX) + window.innerWidth;
        Array.prototype.map.call(swipePageArr, function (item, i) {
            moves = -(startX - event.pageX) + (window.innerWidth * i);
            return swipePageArr[i].setAttribute('style', `transform: translate(${moves}px, 0);`);
        })
    }
document.addEventListener('mouseup', (e) => {
    document.removeEventListener('mousemove', mouseMove);
        var movesFull = -200; //на самом деле не -200 :(
        if (move < 0) {
            Array.prototype.map.call(swipePageArr, function (item, i) {
                movesFull += 100;
                swipePageArr[i].setAttribute('style', `transform: translate(${movesFull}%, 0);`);
                swipePageArr[i].classList.add('swipe__page_animating');
            })
        }
        else if (move > 0) {
            var movesFull = -100; // а тут не минус 100
            Array.prototype.map.call(swipePageArr, function (item, i) {
                movesFull += 100;
                swipePageArr[i].setAttribute('style', `transform: translate(${movesFull}%, 0);`);
                swipePageArr[i].classList.add('swipe__page_animating');
            })
        }     
});



