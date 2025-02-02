<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>اخبار روز</title>
    <style>
        body { font-family: Arial, sans-serif; direction: rtl; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { width: 80%; margin: auto; padding: 20px; background: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        h1 { text-align: center; }
        .news-item { display: flex; align-items: center; background: #fff; margin: 10px 0; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .news-item img { width: 120px; height: 80px; border-radius: 5px; margin-left: 15px; }
        .news-item h2 { margin: 0; font-size: 18px; }
        .news-item p { font-size: 14px; color: #555; }
        .read-more { background: #007bff; color: white; padding: 8px 12px; border: none; cursor: pointer; border-radius: 5px; }
        .read-more:hover { background: #0056b3; }
        .news-form { margin-bottom: 20px; }
        .news-form input, .news-form textarea, .news-form button { display: block; width: 100%; margin: 10px 0; padding: 10px; }
        .back-home { display: block; width: 100px; margin: 20px auto; padding: 10px; text-align: center; background: #dc3545; color: white; text-decoration: none; border-radius: 5px; }
        .back-home:hover { background: #c82333; }
    </style>
</head>
<body>
    <div class="container">
        <h1>آخرین اخبار</h1>
        <form class="news-form" id="news-form">
            <input type="text" id="news-title" placeholder="عنوان خبر" required>
            <textarea id="news-content" placeholder="متن خبر..." required></textarea>
            <button type="submit">ثبت خبر</button>
        </form>
        <div id="news-list"></div>
        <a href="index.html" class="back-home">بازگشت</a>
    </div>

    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js"></script>
    <script src="assets/js/script.js"></script> <!-- Include script.js -->
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/jquery.scrollex.min.js"></script>
    <script src="assets/js/jquery.scrolly.min.js"></script>
    <script src="assets/js/browser.min.js"></script>
    <script src="assets/js/breakpoints.min.js"></script>
    <script src="assets/js/util.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
