<script>
        // Простой скрипт для фильтрации по цене
        const priceRange = document.getElementById('priceRange');
        const selectedPrice = document.getElementById('selectedPrice');
        
        priceRange.addEventListener('input', function() {
            selectedPrice.textContent = `Выбрано: до ${this.value} ₽`;
        });
        // Скрипт для фильтрации по категориям
        const filterOptions = document.querySelectorAll('.filter-option');
        
        filterOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Удаляем активный класс у всех опций в этой группе
                const parentGroup = this.parentElement;
                const optionsInGroup = parentGroup.querySelectorAll('.filter-option');
                optionsInGroup.forEach(opt => opt.classList.remove('active'));
                
                // Добавляем активный класс к выбранной опции
                this.classList.add('active');
            });
        });

        // Здесь можно добавить более сложную логику фильтрации
        document.querySelector('.apply-filters').addEventListener('click', function() {
            alert('Фильтры применены! В реальном проекте здесь будет фильтрация карточек.');
        });
        
    function openModal(modalId) {
        document.getElementById(modalId).style.display = "block";
    }
    
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
        // При закрытии главной модалки обязательно закрываем и подмодалку
        const submodals = document.querySelectorAll('.submodal');
        submodals.forEach(submodal => submodal.style.display = "none");
    }
    
    function openSubModal(submodalId) {
        document.getElementById(submodalId).style.display = "block";
    }
    
    function closeSubModal(submodalId) {
        document.getElementById(submodalId).style.display = "none";
    }
</script>