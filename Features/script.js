// 1. ВЗЯТИЕ ЗАКАЗА В РАБОТУ
document.querySelectorAll('.take-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const row = this.closest('tr');
        const orderNum = row.querySelector('td').textContent;
        const statusCell = row.querySelector('.status');
        
        // Меняем статус
        statusCell.textContent = 'В работе';
        statusCell.className = 'status work';
        
        // Меняем кнопку
        this.textContent = 'В работе';
        this.disabled = true;
        this.style.background = '#94a3b8';
        
        // Показываем уведомление
        showNotification(`Заказ ${orderNum} взят в работу!`, 'success');
    });
});

// 2. ЗАВЕРШЕНИЕ ЗАКАЗА
document.querySelectorAll('.done-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const orderNum = this.closest('tr').querySelector('td').textContent;
        if (confirm(`Завершить заказ ${orderNum}?`)) {
            const statusCell = this.closest('tr').querySelector('.status');
            statusCell.textContent = 'Завершён';
            statusCell.className = 'status completed';
            this.remove();
            showNotification(`Заказ ${orderNum} завершён!`, 'success');
        }
    });
});

// 3. ПОКАЗ ДОКУМЕНТОВ
document.querySelectorAll('.docs-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const orderNum = this.closest('tr').querySelector('td').textContent;
        const modal = document.getElementById('docModal');
        const modalTitle = modal.querySelector('h3');
        
        // Меняем заголовок в зависимости от заказа
        modalTitle.innerHTML = `<i class="fas fa-folder-open"></i> Документы ${orderNum}`;
        modal.style.display = 'flex';
    });
});

// 4. СКАЧИВАНИЕ ДОКУМЕНТОВ
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const fileName = this.closest('li').querySelector('i').nextSibling.textContent.trim();
        showNotification(`Скачивание: ${fileName}`, 'info');
    });
});

// 5. ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('docModal').style.display = 'none';
});

// Закрытие по клику вне окна
window.addEventListener('click', function(event) {
    const modal = document.getElementById('docModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// 6. ВЫХОД ИЗ СИСТЕМЫ
document.querySelector('.logout-btn').addEventListener('click', function() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        showNotification('Вы вышли из системы', 'warning');
        // В реальном проекте здесь будет редирект
    }
});

// 7. ОПЛАТА ДОСТУПА
document.querySelector('.pay-btn').addEventListener('click', function() {
    showNotification('Перенаправление на страницу оплаты...', 'info');
    // В реальном проекте здесь будет переход на платёжную систему
});

// 8. ПРИМЕНЕНИЕ ФИЛЬТРОВ
document.querySelector('.filter-btn').addEventListener('click', function() {
    const searchText = document.querySelector('.search input').value;
    const statusFilter = document.querySelector('.filters select').value;
    
    if (searchText || statusFilter !== 'Все статусы') {
        showNotification(`Фильтры применены: "${searchText || 'нет'}", статус: "${statusFilter}"`, 'info');
    } else {
        showNotification('Показаны все заказы', 'info');
    }
});

// 9. УВЕДОМЛЕНИЯ (вспомогательная функция)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notif">×</button>
    `;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Кнопка закрытия уведомления
    notification.querySelector('.close-notif').addEventListener('click', () => {
        notification.remove();
    });
    
    // Автоматическое закрытие через 4 секунды
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Добавляем стили для анимации уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .close-notif {
        background: transparent;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 15px;
    }
`;
document.head.appendChild(style);