<template>
    <el-card 
    shadow="hover" 
    :body-style="{padding: 0}"
    class="post"
    >
    <header class="post__header" slot="header">
        <h3>{{post.title}}</h3>
        <small>
            <i class="el-icon-time"></i>
             {{post.date}}
        </small>
    </header>
    <div class="post__body">
        <img class="post__img" :src="post.imageURL" alt="post-image">
    </div>
    <footer class="post__footer">
        <el-button type="primary" round @click.prevent="openPost">
            Открыть пост
        </el-button>
        <span>
            <i class="el-icon-message"></i>
            {{post.views}}
        </span>
    </footer>
    </el-card>
</template>

<script>

export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    methods: {
        openPost() {
            const id = 'testid';
            this.$router.push(`/post/${this.post._id}`)
            console.log("post is open")
        }
    }
}
</script>

<style lang="scss" scoped>
    .post {
        min-height: 200px;
        margin-bottom: 2rem;
        margin-bottom: 1.5 rem;
    }

    .post__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .post__img {
        width: 100%;
        height: auto;
    }

    .post__footer {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center; 
    }
</style>