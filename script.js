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

    const newsItem = { title, content };

    // ذخیره خبر در localStorage
    let newsList = JSON.parse(localStorage.getItem('newsList')) || [];
    newsList.push(newsItem);
    localStorage.setItem('newsList', JSON.stringify(newsList));

    // نمایش خبر جدید
    displayNewsItem(newsItem);

    // پاک کردن فرم
    document.getElementById('news-form').reset();
});

// نمایش اخبار ذخیره شده هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', () => {
    let newsList = JSON.parse(localStorage.getItem('newsList')) || [];
    newsList.forEach(newsItem => {
        displayNewsItem(newsItem);
    });
});

function displayNewsItem(newsItem) {
    const newsDiv = document.createElement('div');
    newsDiv.innerHTML = `<h3>${newsItem.title}</h3><p>${newsItem.content}</p><hr>`;
    document.getElementById('news-list').appendChild(newsDiv);
}
