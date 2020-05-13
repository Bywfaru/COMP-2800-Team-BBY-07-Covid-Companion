var today = new Date();
// Regular days just use these emoji
var possibleEmoji = [
    '🐹',
    '🐢',
    '🌼',
    '🍉'
];

// Special emoji if close to Halloween
if (today.getMonth() === 9 && [31, 30, 29, 28].indexOf(today.getDate()) !== -1) {
    possibleEmoji = [
        '👻',
        '🎃',
        '🧟‍♀️'
    ];
}

// Special emoji if close to Christmas
if (today.getMonth() === 11 && [21, 22, 23, 24, 25, 26].indexOf(today.getDate()) !== -1) {
    possibleEmoji = [
        '❄️',
        '🎅',
        '🎁'
    ];
}

document.body.addEventListener('click', function (event) {
    /* 
    * generate random number that falls between 0 and the total number 
    * of emoji possibilities
    */
    var randomNumber = Math.round(Math.random() * possibleEmoji.length);

    var span = document.createElement('span'); 
    span.textContent = possibleEmoji[randomNumber];
    span.className= 'emoji click-emoji';
    /* 
    * event.clientX is where the mouse was horizontally at the time of 
    * the click. This way we can insert the emoji in the exact location 
    * the user clicked.
    */
    span.style.left = event.clientX + 'px';
    // event.clientY - same idea as clientX, but vertical position.
    span.style.top = event.clientY + 'px'; 
    /* Of course these values are useless if we don’t set the emoji's
    * position to something outside the normal flow of content. */
    span.style.position = 'fixed';
    document.body.appendChild(span);
});

/*
var egg = new Egg();
egg
.addCode("up,up,down,down,left,right,left,right,b,a", function() {
    jQuery('#egggif').fadeIn(500, function() {
        window.setTimeout(function() { jQuery('#egggif').hide(); }, 5000);
    });
})
.addHook(function(){
    console.log("Hook called for: " + this.activeEgg.keys);
    console.log(this.activeEgg.metadata);
}).listen();
        
var egg = new Egg("up,up,down,down,left,right,left,right,b,a", function() {
    jQuery('#egggif').fadeIn(500, function() {
        window.setTimeout(function() { jQuery('#egggif').hide(); }, 5000);
    });
})
.listen();
var firstTime = true;
var message = "Cool. You tried it!";
var later = "\n\nThis is the real easter egg.\n\nThe first message isn't a real easter egg because the web page says what to do.\n\nThis one, however, is a message revealed only if the number '3' is hovered over more than once.\n\n "
function MouseoverMessageInAlertBox() {
    if(firstTime) { 
        alert(message); 
    } else { 
        alert(later); 
    }

    firstTime = false;
}
*/