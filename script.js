// نمایش/پنهان کردن صفحات
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(targetId).classList.remove('hidden');
    });
});

// مدیریت فرم اخبار
document.getElementById('news-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;
    
    const newsItem = document.createElement('div');
    newsItem.innerHTML = `<h3>${title}</h3><p>${content}</p><hr>`;
    document.getElementById('news-list').appendChild(newsItem);
    
    // پاک کردن فرم
    document.getElementById('news-form').reset();
});
