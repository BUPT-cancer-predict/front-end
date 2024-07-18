<template>
  <div>
    <div class="welcome-message">
      <h1>Welcome User!</h1>
    </div>
    <div class="body">
      <div class="login-container">
        <div class="drop">
          <div class="content">
            <h2>Sign in</h2>
            <form>
              <div class="input-box">
                <el-input v-model="username" placeholder="Username"></el-input>
              </div>

              <div class="input-box">
                <el-input
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  show-password
                ></el-input>
              </div>

              <div class="input-box">
                <input type="submit" value="Login" @click.prevent="login" />
              </div>
            </form>
          </div>
        </div>
        <a href="#" class="btns" @click.prevent="openForgotDrawer"
          >Forget Password</a
        >
        <a href="#" class="btns signup" @click.prevent="openDrawer">Sign Up</a>
        <!-- 注册抽屉 -->
        <el-drawer
          v-model="drawerVisible"
          title="User Registration"
          :direction="direction"
          size="50%"
        >
          <el-form
            ref="registerFormRef"
            :model="registerForm"
            :rules="registerRules"
            label-width="100px"
          >
            <el-form-item label="Username" prop="username">
              <el-input v-model="registerForm.username" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="registerForm.email" />
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input
                v-model="registerForm.password"
                type="password"
                show-password
              />
            </el-form-item>
            <el-form-item label="Confirm" prop="confirmPassword">
              <el-input
                v-model="registerForm.confirmPassword"
                type="password"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">Register</el-button>
              <el-button @click="resetForm">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-drawer>

        <!-- 忘记密码抽屉 -->
        <el-drawer
          v-model="forgotDrawerVisible"
          title="Reset Password"
          :direction="direction"
          size="50%"
        >
          <el-form :model="forgotForm" label-width="100px">
            <el-form-item label="Account">
              <el-input
                v-model="forgotForm.account"
                placeholder="Enter your account"
              />
            </el-form-item>

            <el-form-item label="Email">
              <el-input v-model="forgotForm.email" disabled />
              <el-button type="primary" @click="queryEmail">Query</el-button>
            </el-form-item>

            <el-form-item label="Captcha">
              <el-input
                v-model="forgotForm.captcha"
                placeholder="Enter captcha"
              />
              <el-button type="primary" @click="sendCaptcha"
                >Send Captcha</el-button
              >
            </el-form-item>

            <el-form-item label="New">
              <el-input
                v-model="forgotForm.newPassword"
                type="password"
                placeholder="Enter new password"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="resetPassword"
                >Submit</el-button
              >
            </el-form-item>
          </el-form>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      drawerVisible: false,
      direction: "rtl",
      registerForm: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      forgotDrawerVisible: false,
      forgotForm: {
        account: "",
        email: "",
        captcha: "",
        newPassword: "",
      },
      registerRules: {
        username: [
          {
            required: true,
            message: "Please input your username",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Please input your email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input a valid email",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "Please input your password",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: "Please confirm your password",
            trigger: "blur",
          },
          { validator: this.validatePassword, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 登录
    async login() {
      try {
        const response = await axios.post("/api/login", {
          username: this.username,
          password: this.password,
        });

        if (response.data.success) {
          alert("登录成功！");
          // 根据后端返回的数据进行处理，例如存储 token 到本地存储
          localStorage.setItem("token", response.data.token);
          // 跳转到其他页面
          this.$router.push("/dashboard");
        } else {
          alert("用户名或密码错误！");
        }
      } catch (error) {
        console.error("登录失败:", error);
        alert("登录过程中发生错误，请稍后再试。");
      }
    },

    openDrawer() {
      this.drawerVisible = true;
    },

    closeDrawer() {
      this.drawerVisible = false;
    },

    // 表单验证
    validatePassword(rule, value, callback) {
      if (value !== this.registerForm.password) {
        callback(new Error("The two passwords do not match"));
      } else {
        callback();
      }
    },

    //// 注册
    submitForm() {
      this.$refs.registerFormRef.validate((valid) => {
        if (valid) {
          // 如果表单验证通过，调用注册接口
          this.registerUser();
        } else {
          ElMessageBox.alert("Please correct the errors below.");
        }
      });
    },

    resetForm() {
      this.$refs.registerFormRef.resetFields();
    },

    registerUser() {
      // 使用axios发送POST请求到后端API
      axios
        .post("/api/register", this.registerForm)
        .then((response) => {
          // 注册成功后的处理逻辑
          console.log("User registered successfully:", response);
          ElMessage.success("Registration successful");
          // 清空表单
          this.$refs.registerFormRef.resetFields();
        })
        .catch((error) => {
          // 注册失败后的处理逻辑
          console.error("Failed to register user:", error);
          ElMessage.error("Failed to register. Please check your inputs.");
        });
    },

    openForgotDrawer() {
      this.forgotDrawerVisible = true;
    },

    // 忘记密码-查询邮箱
    queryEmail() {
      axios
        .get(`/api/user/email?account=${this.forgotForm.account}`)
        .then((response) => {
          this.forgotForm.email = response.data.email;
        })
        .catch((error) => {
          console.error("Error querying email:", error);
        });
    },

    // 忘记密码-发送验证码
    sendCaptcha() {
      // 发送验证码到邮箱
      axios
        .post(`/api/send-captcha?email=${this.forgotForm.email}`)
        .then(() => {
          alert("Captcha sent successfully.");
        })
        .catch((error) => {
          console.error("Error sending captcha:", error);
        });
    },

    // 忘记密码-重置密码
    resetPassword() {
      axios
        .post(`/api/reset-password`, this.forgotForm)
        .then((response) => {
          alert("Password reset successfully.");
          this.closeForgotDrawer();
        })
        .catch((error) => {
          console.error("Error resetting password:", error);
        });
    },

    closeForgotDrawer() {
      this.forgotDrawerVisible = false;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.welcome-message {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%); /* 水平居中 */
  font-size: 1.2em;
  color: #333;
}
.body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #eff0f4;
}
.login-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  left: -80px;
}
.login-container .drop {
  position: relative;
  width: 350px;
  height: 350px;
  box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
    25px 35px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
    inset -20px -20px 25px rgba(255, 255, 255, 0.9);
  transition: 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 52% 48% 33% 67% / 38% 45% 55% 62%;
}
.login-container .drop:hover {
  border-radius: 50%;
}
.login-container .drop::before {
  content: "";
  position: absolute;
  top: 50px;
  left: 85px;
  width: 35px;
  height: 35px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.9;
}
.login-container .drop::after {
  content: "";
  position: absolute;
  top: 90px;
  left: 110px;
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.9;
}
.login-container .drop .content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 40px;
  gap: 15px;
}
.login-container .drop .content h2 {
  position: relative;
  color: #333;
  font-size: 1.5em;
}
.login-container .drop .content form {
  display: flex;
  justify-self: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
.login-container .drop .content form .input-box {
  position: relative;
  width: 225px;
  box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1),
    inset -2px -5px 10px rgba(255, 255, 255, 1),
    15px 15px 10px rgba(0, 0, 0, 0.05), 15px 10px 15px rgba(0, 0, 0, 0.025);
  border-radius: 25px;
}

.login-container .drop .content form .input-box::before {
  content: "";
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 65%;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
}

.login-container .drop .content form .input-box input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 1em;
  padding: 10px 15px;
}

.login-container .drop .content form .input-box input[type="submit"] {
  color: #fff;
  text-transform: uppercase;
  font-size: 1em;
  cursor: pointer;
  letter-spacing: 0.1em;
  font-weight: 500;
}

.login-container .drop .content form .input-box:last-child {
  width: 120px;
  background: #ff0f5b;
  box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1),
    15px 15px 10px rgba(0, 0, 0, 0.05), 15px 10px 15px rgba(0, 0, 0, 0.025);
  transition: 0.5s;
}

.login-container .drop .content form .input-box:last-child:hover {
  width: 150px;
}

.btns {
  position: absolute;
  right: -120px;
  bottom: 0;
  width: 120px;
  height: 120px;
  background: #c61dff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  line-height: 1.2em;
  letter-spacing: 0.1em;
  font-size: 0.8em;
  transition: 0.25s;
  text-align: center;
  box-shadow: inset 10px 10px 10px rgba(190, 1, 254, 0.05),
    15px 25px 10px rgba(190, 1, 254, 0.1), 15px 20px 20px rgba(190, 1, 254, 0.1),
    inset -10px -10px 15px rgba(255, 255, 255, 0.5);
  border-radius: 44% 56% 65% 35% / 57% 58% 42% 43%;
}

.btns:hover {
  border-radius: 50%;
}

.btns::before {
  content: "";
  position: absolute;
  top: 15px;
  left: 30px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  opacity: 0.45;
}

.btns.signup {
  width: 80px;
  height: 80px;
  bottom: 150px;
  right: -120px;
  box-shadow: inset 10px 10px 10px rgba(1, 180, 255, 0.05),
    15px 25px 10px rgba(1, 180, 255, 0.1), 15px 20px 20px rgba(1, 180, 255, 0.1),
    inset -10px -10px 15px rgba(255, 255, 255, 0.5);
  border-radius: 49% 51% 52% 48% / 63% 59% 41% 37%;
  background: #01b4ff;
}

.btns.btns.signup::before {
  left: 20px;
  width: 15px;
  height: 15px;
}

.btns:hover {
  border-radius: 50%;
}
</style>