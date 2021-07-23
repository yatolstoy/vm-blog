<template>
    <div class="error__layout">
        <div class="error__content">
            <h1 class="error__title">Ошибка 404</h1>
            <nuxt-link to="/">Вернуться на главную</nuxt-link>
         </div>
    </div>
</template>

<style lang="scss" scoped>
.error-layout {
    display:flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.error__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4rem;
}

.error__title {
    color:rgb(184, 0, 0);
    margin-bottom: 1rem;
}
</style>