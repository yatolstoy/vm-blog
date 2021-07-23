<template>
    <div>
        <h1>Welocme to adm pg</h1>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['admin-auth']
}
</script>