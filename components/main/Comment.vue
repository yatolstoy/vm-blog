<template>
<el-card class="comment">
    <div class="comment__header">
        <span>
            {{comment.name}}
        </span>
        <span>
            <i class="el-icon-time">
                {{ new Date(comment.date).toLocalString }}
            </i>
        </span>
    </div>
    <div class="comment__text">
        {{comment.text}}
    </div>
</el-card>
</template>

<script>
export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="css" scoped>
.comment {
    margin-bottom: 1rem;
}

.comment__header {
    display:flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: .8rem;
}

.comment__text {
    white-space: pre-line;
}

</style>