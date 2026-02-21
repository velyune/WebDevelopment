// Логика переключения видов (Вход, Регистрация, Восстановление, Подтверждение)
function switchView(viewId) {
    // Скрываем все формы
    document.querySelectorAll('.form-view').forEach(el => {
        el.classList.remove('active');
    });
    
    // Показываем нужную форму
    document.getElementById(viewId).classList.add('active');

    // Управление видимостью табов
    const tabsBlock = document.getElementById('main-tabs');
    if (viewId === 'login' || viewId === 'register') {
        tabsBlock.style.display = 'flex';
        
        // Обновляем активный таб
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        if(viewId === 'login') tabsBlock.children[0].classList.add('active');
        if(viewId === 'register') tabsBlock.children[1].classList.add('active');
    } else {
        // Прячем табы на страницах восстановления и подтверждения, 
        // так как это побочные сценарии
        tabsBlock.style.display = 'none';
    }
}

// Функции-стабы для обработки форм (Имитация отправки на сервер)

function handleLogin(e) {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    const contact = document.getElementById('login-contact').value;
    console.log('Попытка входа:', { contact });
    
    // Имитация загрузки и успешного входа
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'Загрузка...';
    btn.disabled = true; // Блокируем кнопку от повторных нажатий
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
        alert('Успешная авторизация! Перенаправление в ЛК...');
        // Здесь в будущем будет: window.location.href = '/dashboard';
    }, 1000);
}

function handleRegister(e) {
    e.preventDefault();
    const role = document.getElementById('reg-role').value;
    const contact = document.getElementById('reg-contact').value;
    console.log('Попытка регистрации:', { role, contact });

    // По ТЗ требуется подтверждение контакта.
    // Перекидываем пользователя на экран ввода кода из SMS/Email.
    switchView('confirm');
}

function handleRecovery(e) {
    e.preventDefault();
    const contact = document.getElementById('rec-contact').value;
    console.log('Запрос восстановления для:', contact);
    
    alert(`Инструкции по восстановлению отправлены на: ${contact}`);
    
    // Возвращаем пользователя на экран логина
    switchView('login');
}

function handleConfirm(e) {
    e.preventDefault();
    const code = document.getElementById('conf-code').value;
    console.log('Введен код:', code);
    
    alert('Контакт успешно подтвержден! Аккаунт создан.');
    
    // Переводим на логин для финального входа (или можно сразу авторизовать)
    switchView('login');
}