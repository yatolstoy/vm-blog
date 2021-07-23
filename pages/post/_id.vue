<template>
<article class="post">
    <header class="post__header">
        <div class="post__title">
            <nuxt-link to="/">
            <i class="el-icon-back"></i>
            </nuxt-link>
            <h1>{{post.title}}</h1>
        </div>
        <div class="post__info">
            <small>
                <i class="el-icon-time"></i>
                {{post.date.toLocaleString()}}
            </small>
            <small>
                <i class="el-icon-view"></i>
                {{post.views}}
            </small>
        </div>
        <div class="post__image">
            <img :src="post.imageURL" alt="post-image">
        </div>
    </header>

    <main class="post__content">
        <vue-markdown>{{post.text}}</vue-markdown>
    </main>

    <footer>
        <app-comment-form 
        v-if="canAddComment"
        :postId="post._id"
        @created='createCommentHandler'
        />

        <div class="comments" v-if="post.comments.length">
            <app-comment 
                v-for="comment in post.comments"
                :key="comment._id"
                :comment="comment"
            />
        </div>
        <div class="text-center" v-else>Комментариев нет</div>
    </footer>
</article>
</template>

<script>
import AppComment from '@/components/main/Comment'
import AppCommentForm from '@/components/main/CommentForm'
export default {
    validate({params}) {
        return Boolean(params.id)
    },
    components: {
        AppComment,
        AppCommentForm
    },
    async asyncData({store, params}) {
      const post = await store.dispatch('post/fetchById', params.id)
      await store.dispatch('post/addView', post)
      return {
          post: {...post, views: ++post.views}
          }
    },
    data: () => ({
        canAddComment: true
    }),
    methods: {
        createCommentHandler(comment) {
        this.post.comments.unshift(comment)
        this.canAddComment = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .post {
        max-width: 600px;
        margin: 0 auto;
    }

    .post__title {
        display: flex;
        justify-content: start;
        margin-bottom: 0.5rem;
        align-items: center;

        i {
            padding: 0.5rem;
        }
    }

    .post__info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        align-items: center;
    }

    .post__image img {
        width: 100%;
        height: auto;
    }

    .post__header {
        margin-bottom: 1.5rem;
    }

    .post__content {
        margin-bottom: 2rem;
    }

</style>