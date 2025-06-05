// 1. Інформація про систему
const systemInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookiesEnabled: navigator.cookieEnabled,
};
localStorage.setItem('systemInfo', JSON.stringify(systemInfo));

// Footer з info
const footer = document.createElement('footer');
footer.style.padding = "20px";
footer.style.backgroundColor = "#1a0000";
footer.style.color = "#fff";
footer.innerHTML = `<h3>Дані з localStorage:</h3><pre>${JSON.stringify(systemInfo, null, 2)}</pre>`;
document.body.appendChild(footer);

// 2. Коментарі
fetch('https://jsonplaceholder.typicode.com/posts/5/comments')
    .then(response => response.json())
    .then(comments => {
        const section = document.createElement('section');
        section.innerHTML = `<h2>Коментарі роботодавців</h2>`;
        const list = document.createElement('ul');
        comments.forEach(c => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${c.name}</strong>: ${c.body}`;
            list.appendChild(li);
        });
        section.appendChild(list);
        document.body.appendChild(section);
    });

// 3. Модальне вікно після 60 секунд
setTimeout(() => {
    const modal = document.createElement('div');
    modal.id = 'feedback-modal';
    modal.innerHTML = `
        <form action="https://formspree.io/f/manjyanp" method="POST">
            <h2>Зворотній зв'язок</h2>
            <input type="text" name="name" placeholder="Ім’я" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="tel" name="phone" placeholder="Телефон" required>
            <textarea name="message" placeholder="Ваше повідомлення..." rows="4" required></textarea>
            <button type="submit">Відправити</button>
            <button type="button" onclick="document.getElementById('feedback-modal').remove()">Закрити</button>
        </form>
    `;
    document.body.appendChild(modal);
}, 60000);

// 4. Перемикач теми
const toggle = document.createElement('div');
toggle.className = 'theme-toggle';
toggle.innerHTML = `
    <input type="checkbox" id="themeSwitch">
    <label for="themeSwitch"></label>
`;
document.body.appendChild(toggle);

const themeSwitch = document.getElementById('themeSwitch');

function applyTheme(theme) {
    if (theme === 'day') {
        document.body.classList.add('day-theme');
        document.body.classList.remove('night-theme');
    } else {
        document.body.classList.add('night-theme');
        document.body.classList.remove('day-theme');
    }
    themeSwitch.checked = theme === 'day';
}

// Встановлення теми за часом
const hour = new Date().getHours();
const autoTheme = (hour >= 7 && hour < 21) ? 'day' : 'night';
applyTheme(autoTheme);

// Подія кліку для перемикання теми
themeSwitch.addEventListener('change', () => {
    const newTheme = themeSwitch.checked ? 'day' : 'night';
    applyTheme(newTheme);
});

