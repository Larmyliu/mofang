<template>
  <div>
    <div class="crumbs crumbs-register">
      <el-breadcrumb separator="/" class="register-title">
        <el-breadcrumb-item><i class="el-icon-setting"></i>注册</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="userContent">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="username" label="用户名称">
          <el-input v-model="form.username" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" label="确认密码">
          <el-input v-model="form.checkPass" type="password" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="birth" label="出生日期">
          <el-col :span="24">
            <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              >
            </el-date-picker>
            <!-- <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" value-format="yyyy-MM-dd"
              style="width: 100%;"></el-date-picker> -->
          </el-col>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-select class="select-sex" v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">确定</el-button>
          <el-button @click="onCancle()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Util from '../utils/utils';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      };
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if (!Util.emailReg.test(this.form.email)) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback();
        }
      };
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if (!Util.phoneReg.test(this.form.phone)) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      };
      var validateCard = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入身份证号'));
        } else if (!Util.idCardReg.test(this.form.card)) {
          callback(new Error('请输入正确的身份证号'));
        } else {
          callback();
        }
      };
      return {
        form: {
          username: '',
          password: '',
          checkPass: '',
          email: '',
          phone: '',
          birth: '',
          sex: ''
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            required: true,
            validator: validatePass2,
            trigger: 'blur'
          }],
          email: [{
            required: true,
            validator: validateEmail,
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            validator: validatePhone,
            trigger: 'blur'
          }],
          birth: [{
            required: true,
            message: '请输入出生日期',
          }],
          sex: [{
            required: true,
            message: '请输入性别',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        debugger
        const self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.$Apply.user.register(self.form).then(res => {
              if(res.data.code == 0){
                self.$router.push('/register-success');
              }

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },

      onCancle() {
        this.$router.push('/login');
      },
      getDateTimes(str) {
        var str = new Date(str);
        return str;
      }
    }
  }

</script>

<style>
  .crumbs-register {
    background-color: #324157;
    height: 50px;
    line-height: 50px;
  }

  .register-title {
    line-height: 50px;
    margin: 0 auto;
    width: 50px;
    font-size: 16px;
  }

  .userContent {
    width: 400px;
    margin: 0 auto;
  }

  .select-sex {
    width: 320px;
  }

</style>
