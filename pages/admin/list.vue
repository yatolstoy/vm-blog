<template>
  <el-table
    :data="posts"
    style="width: 100%">
    <el-table-column
      label="Название"
      prop="title">
    </el-table-column>
    <el-table-column label="Дата">
        <template slot-scope="{row: {date}}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ new Date(date).toLocaleString() }}</span>
        </template>
    </el-table-column>
    <el-table-column
      label="Просмотры">
         <template slot-scope="{row: {views}}">
             <i class="el-icon-view"></i>
            <span style="margin-left: 10px">{{ views }}</span>
        </template>
    </el-table-column>
    <el-table-column
      label="Комментарии">
         <template slot-scope="{row: {comments}}">
             <i class="el-icon-message"></i>
            <span style="margin-left: 10px">{{ comments.length }}</span>
        </template>
    </el-table-column>
    <el-table-column
        label="Действия"
        align="right">
      <template slot-scope="{row}">
        <el-tooltip effect="dark" content="Редактировать пост" placement="top">
        <el-button
          type="primary"
          circle
          icon="el-icon-edit"
          @click="open(row._id)"></el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="Удалить пост" placement="top">
        <el-button
          type="danger"
          circle
          icon="el-icon-delete"
          @click="remove(row._id)"></el-button>
      </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    async asyncData({store}) {
        const posts = await store.dispatch('post/fetchAdmin')
        return {posts}
    },  
    methods: {
      open(id) {
          this.$router.push(`/admin/post/${id}`)
        console.log("Open ", id);
      },
      async remove(id) {
          try {
            await this.$confirm('Удалить пост?', 'Внимание!', {
                confirmButtonText: 'Удалить',
                cancelButtonText: 'Отмена',
                type: 'warning'
            }) 
            await this.$store.dispatch('post/remove', id)
            this.posts = this.posts.filter(p => p._id != id)
            this.$message.success('Пост удалён')           
          } catch (e) {
              
          }
        console.log("Remove", id);
      }
    },
}
</script>