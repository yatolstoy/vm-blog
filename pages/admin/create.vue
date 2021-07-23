<template>
    <div>
        <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
     <h2 class="mb">Создать новый пост</h2> 
            <el-form-item 
            label="Название поста" 
            prop="title">
                <el-input v-model="controls.title"
                p="text"
                type="text"></el-input>
            </el-form-item>
            <el-form-item 
            label="Текст в формате .md или .html" 
            prop="text">
                <el-input v-model="controls.text"
                p="text"
                type="textarea"
                resize="none"
                :rows="10"></el-input>
            </el-form-item>

            <el-button class="mb" type="success" plain @click="previewDialog = true"> Предпросмотр </el-button>
            <el-dialog
            title="Предпросмотр"
            :visible.sync="previewDialog">
            <div :key="controls.text">
                <vue-markdown>{{controls.text}}</vue-markdown>
            </div>
               
            </el-dialog>

            <el-upload
            class="mb"
            drag
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleImageChange"
            :auto-upload="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">Перетащите картинку или <em>нажмите на область</em></div>
             <div class="el-upload__tip" slot="tip">Файлы с расширением jpg/png</div>
            </el-upload>

            <el-form-item>
                <el-button 
                    type="primary" 
                    round
                    native-type="submit"
                    :loading="loading"
                    >
                        Обновить
                    </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    data: () => ({
        loading: false,
        controls: {
            title: '',
            text: ''
        },
        previewDialog: false,
        image: null,
        rules: {
            title: [
                { required: true, message: "Название не может быть пустым", trigger: 'blur'}
                ],
          text: [
            { required: true, message: 'Текст не может быть пустым', trigger: 'blur' }
          ]
        }
    }),
    methods: {
        handleImageChange(file, fileList) {
            this.image = file.raw
            console.log(file)
        },
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if(valid && this.image) {
                    this.loading = true
                        const formData = {
                            title: this.controls.title,
                            text: this.controls.text,
                            image: this.image
                        }

                    try {
                        await this.$store.dispatch('post/create', formData)
                        this.controls.text = ''
                        this.controls.title = ''
                        this.controls.image = null
                        this.$refs.upload.clearFiles()
                        this.$message.success('Пост создан')
                    } catch (e) {

                    } finally {
                        this.loading = false
                    }
                } else {
                    this.$message.warning('Форма не валидна')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
 form {
     max-width: 600px;
 }
    
</style>