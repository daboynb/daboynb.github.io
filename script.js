(function () {
    'use strict';

    // ── 1. Private Repos tab + eyes ──
    var privateTab = document.getElementById('private-tab');
    var privateDropdown = document.getElementById('private-dropdown');
    var pupils = document.querySelectorAll('.pupil');

    if (privateTab && privateDropdown) {
        privateTab.addEventListener('click', function (e) {
            e.stopPropagation();
            privateDropdown.classList.toggle('open');
        });

        document.addEventListener('click', function (e) {
            if (!privateDropdown.contains(e.target) && e.target !== privateTab) {
                privateDropdown.classList.remove('open');
            }
        });
    }

    document.addEventListener('mousemove', function (e) {
        pupils.forEach(function (pupil) {
            var eye = pupil.parentElement;
            var rect = eye.getBoundingClientRect();
            var eyeCenterX = rect.left + rect.width / 2;
            var eyeCenterY = rect.top + rect.height / 2;

            var dx = e.clientX - eyeCenterX;
            var dy = e.clientY - eyeCenterY;
            var angle = Math.atan2(dy, dx);
            var dist = Math.min(Math.hypot(dx, dy), 8);

            var x = Math.cos(angle) * dist;
            var y = Math.sin(angle) * dist;
            pupil.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        });
    });

    // ── 2. Konami Code ──
    var konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowLeft', 'ArrowRight', 'ArrowRight'
    ];
    var konamiIndex = 0;

    document.addEventListener('keydown', function (e) {
        if (e.key === konamiSequence[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiSequence.length) {
                konamiIndex = 0;
                coffeeRain();
            }
        } else {
            konamiIndex = 0;
        }
    });

    function coffeeRain() {
        var emojis = ['\u2615', '\u{1F9CB}', '\u{1F375}'];
        var count = 40;

        for (var i = 0; i < count; i++) {
            (function (idx) {
                setTimeout(function () {
                    var drop = document.createElement('div');
                    drop.className = 'coffee-drop';
                    drop.textContent = emojis[idx % emojis.length];
                    drop.style.left = Math.random() * 100 + 'vw';
                    var duration = 2 + Math.random() * 2;
                    drop.style.animationDuration = duration + 's';
                    drop.style.animationDelay = '0s';
                    document.body.appendChild(drop);

                    setTimeout(function () {
                        drop.remove();
                    }, (duration + 0.5) * 1000);
                }, idx * 80);
            })(i);
        }
    }

    // ── 3. Click title to cycle taglines ──
    var taglines = [
        'caffeine-powered dev \u2014 breaking things until they work',
        'mass ctrl+z energy',
        'it works on my machine \u00AF\\_(\u30C4)_/\u00AF',
        '404: social life not found',
        'git push --force and pray',
        'powered by mass amounts of mass amounts of mass amounts of mass amounts of coffee',
        'i don\'t always test my code, but when i do, i do it in production'
    ];
    var taglineIndex = 0;

    var title = document.getElementById('site-title');
    var tagline = document.getElementById('tagline');

    if (title && tagline) {
        title.addEventListener('click', function () {
            taglineIndex = (taglineIndex + 1) % taglines.length;
            tagline.style.opacity = '0';
            setTimeout(function () {
                tagline.textContent = taglines[taglineIndex];
                tagline.style.opacity = '1';
            }, 200);
        });
    }

    // ── 4. Footer click ──
    var footerText = document.getElementById('footer-text');
    var coffeeCount = 0;
    var baseFooter = '\u00A9 2026 daboynb';

    if (footerText) {
        footerText.addEventListener('click', function () {
            coffeeCount++;
            var coffee = '';
            for (var i = 0; i < coffeeCount; i++) {
                coffee += ' \u2615';
            }
            if (coffeeCount === 1) {
                footerText.textContent = baseFooter + ' \u2014 built with' + coffee;
            } else if (coffeeCount <= 10) {
                footerText.textContent = baseFooter + ' \u2014 built with' + coffee;
            } else {
                footerText.textContent = baseFooter + ' \u2014 ok that\'s a lot of coffee' + coffee;
                footerText.style.fontSize = Math.min(0.9 + coffeeCount * 0.05, 2) + 'rem';
            }
        });
    }
})();
