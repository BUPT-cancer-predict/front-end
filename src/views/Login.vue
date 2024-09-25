<template>
  <div>
    <!-- 背景视频 -->
    <div class="introduce">
      <video
        src="../assets/video.mp4"
        autoplay
        muted
        loop
        class="background-video"
      ></video>
      <!-- 头部 -->
      <header class="header">
        <div class="logo-container">
          <img src="../assets/logo.png" alt="Logo" class="logo" />
          <span class="logo-text">沐光健康平台</span>
        </div>
        <nav>
          <ul>
            <li>
              <router-link to="/#" @click="showLoginPrompt"
                >个人中心</router-link
              >
            </li>
            <li>
              <router-link to="/#" @click="showLoginPrompt"
                >在线咨询</router-link
              >
            </li>
            <li>
              <router-link to="/#" @click="showLoginPrompt"
                >病情交流</router-link
              >
            </li>
            <li>
              <router-link to="/faq" @click="showLoginPrompt"
                >常见问题</router-link
              >
            </li>
            <li>
              <router-link to="/about-us" @click="showLoginPrompt"
                >关于我们</router-link
              >
            </li>
          </ul>
        </nav>
      </header>
      <!-- 时间和登录按钮 -->
      <div class="time">
        <div class="time-text">{{ currentTime }}</div>
        <div class="time-greeting">{{ timeGreeting }}</div>
      </div>
      <div class="card-opt">
        <el-button
          @click="switchForm('quickLogin')"
          plain
          class="transparent-button"
          :class="{
            'selected-button': currentForm === 'quickLogin',
            'unselected-button': currentForm !== 'quickLogin',
          }"
        >
          快速登录
        </el-button>
        <el-button
          @click="switchForm('dynamicPasswordLogin')"
          plain
          class="transparent-button"
          :class="{
            'selected-button': currentForm === 'dynamicPasswordLogin',
            'unselected-button': currentForm !== 'dynamicPasswordLogin',
          }"
        >
          动态密码登录
        </el-button>
      </div>
      <!-- 登录卡片 -->
      <form @submit.prevent="handleSubmit">
        <div class="card">
          <div v-if="currentForm === 'quickLogin'">
            <!-- 快速登录表单内容 -->
            <div class="input-group">
              <el-input
                ref="phoneNumberInput"
                placeholder="手机号"
                v-model="phoneNumber"
                prefix-icon="el-icon-phone"
                style="width: 250px; margin-bottom: 10px"
              ></el-input>
              <el-input
                ref="passwordInput"
                type="password"
                placeholder="请输入密码"
                v-model="password"
                prefix-icon="el-icon-lock"
                show-password
                style="width: 250px; margin-bottom: 10px"
              ></el-input>
            </div>
            <div class="forget">
              <a
                href="#"
                @click="switchForm('dynamicPasswordLogin')"
                class="no-underline-f"
                >忘记密码？</a
              >
            </div>
            <div class="submit">
              <el-button @click="fastlogin" plain> →登录 </el-button>
            </div>
            <div class="register">
              <span class="account-text">还没有账号？</span>
              <a
                href="#"
                @click="switchForm('registerform')"
                class="no-underline-r"
                >免费注册</a
              >
            </div>
            <div class="text">
              <input type="checkbox" id="agreeCheckbox" v-model="agree" />
              <label for="agreeCheckbox">
                我已阅读并同意
                <a href="/terms" target="_blank">用户协议</a>
                和
                <a href="/privacy" target="_blank">隐私政策</a>，
                并确保在使用时遵守相关的法律法规，保护个人信息
              </label>
            </div>
            <div class="more">
              <div class="line">
                <span> ———更多登录方式——— </span>
              </div>
              <div class="circles">
                <div class="circle red"></div>
                <div class="circle green"></div>
                <div class="circle blue"></div>
              </div>
            </div>
          </div>

          <div v-if="currentForm === 'dynamicPasswordLogin'">
            <!-- 动态密码登录表单内容 -->
            <div class="input-group">
              <el-input
                placeholder="手机号"
                v-model="phoneNumber"
                prefix-icon="el-icon-phone"
                style="width: 250px; margin-bottom: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="请输入验证码"
                v-model="verificationCode"
                prefix-icon="el-icon-lock"
                style="width: 250px; position: relative; margin-bottom: 10px"
              >
                <template #append>
                  <a
                    @click="sendVerificationCode"
                    :style="{
                      color: 'blue',
                      textDecoration: 'none',
                      cursor: isSending ? 'not-allowed' : 'pointer',
                      width: 'auto',
                      right: 0,
                    }"
                    :class="{ disabled: isSending }"
                  >
                    {{ verificationButtonText }}
                  </a>
                </template>
              </el-input>
            </div>
            <div class="submit">
              <el-button @click="dylogin" plain> →登录 </el-button>
            </div>
            <div class="register">
              <span class="account-text">未注册的手机在验证后自动注册账号</span>
            </div>
            <div class="text">
              <input type="checkbox" id="agreeCheckbox" v-model="agree" />
              <label for="agreeCheckbox">
                我已阅读并同意
                <a href="/terms" target="_blank">用户协议</a>
                和
                <a href="/privacy" target="_blank">隐私政策</a>，
                并确保在使用时遵守相关的法律法规，保护个人信息
              </label>
            </div>
            <div class="more">
              <div class="line">
                <span> ———更多登录方式——— </span>
              </div>
              <div class="circles">
                <div class="circle red"></div>
                <div class="circle green"></div>
                <div class="circle blue"></div>
              </div>
            </div>
          </div>
          <div v-if="currentForm === 'registerform'">
            <!-- 注册表单内容 -->
            <div class="input-group">
              <el-input
                placeholder="手机号"
                v-model="phoneNumber"
                prefix-icon="el-icon-phone"
                style="width: 250px; margin-bottom: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="请输入验证码"
                v-model="verificationCode"
                prefix-icon="el-icon-lock"
                style="width: 250px; position: relative; margin-bottom: 10px"
              >
                <template #append>
                  <a
                    @click="sendVerificationCode"
                    :style="{
                      color: 'blue',
                      textDecoration: 'none',
                      cursor: isSending ? 'not-allowed' : 'pointer',
                      width: 'auto',
                      right: 0,
                    }"
                    :class="{ disabled: isSending }"
                  >
                    {{ verificationButtonText }}
                  </a>
                </template>
              </el-input>
              <el-input
                placeholder="创建密码"
                v-model="newpassword"
                show-password
                prefix-icon="el-icon-lock"
                style="width: 250px; margin-bottom: 10px"
              ></el-input>

              <!-- 密码强度指示器 -->
              <div class="strength-indicator">
                <div
                  v-for="(level, index) in passwordStrength"
                  :key="index"
                  :class="`strength-${level}`"
                >
                  <span>{{ level }}</span>
                </div>
              </div>
              <el-input
                placeholder="确认密码"
                v-model="confirmPassword"
                show-password
                prefix-icon="el-icon-lock"
                style="width: 250px"
                @input="checkPasswordMatch"
              >
                <template #suffix>
                  <span v-if="passwordMatch" class="green">一致</span>
                  <span v-else class="red">不一致</span>
                </template>
              </el-input>
            </div>
            <div class="submit">
              <el-button @click="register_login" plain> →注册并登录 </el-button>
            </div>
            <div class="register">
              <span class="account-text">已有账号？</span>
              <a
                href="#"
                @click="switchForm('quickLogin')"
                class="no-underline-r"
                >点击登录</a
              >
            </div>

            <div class="text">
              <input type="checkbox" id="agreeCheckbox" v-model="agree" />
              <label for="agreeCheckbox">
                我已阅读并同意
                <a href="/terms" target="_blank">用户协议</a>
                和
                <a href="/privacy" target="_blank">隐私政策</a>，
                并确保在使用时遵守相关的法律法规，保护个人信息
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      currentTime: "", //当前时间
      timeGreeting: "", //时间问候语
      currentForm: "quickLogin", // 初始默认为快速登录表单
      agree: false, //同意协议
      phoneNumber: "", //手机号
      password: "", //密码
      verificationCode: "", //验证码
      isSending: false, //发送验证码倒计时
      countdown: 60, //倒计时秒数
      newpassword: "", //新密码
      passwordStrength: ["weak", "medium", "strong"], //密码强度提示
      confirmPassword: "", //确认密码
      passwordMatch: false, //密码一致性
    };
  },
  computed: {
    // 计算属性，根据isSending和countdown计算验证码按钮的文本
    verificationButtonText() {
      return this.isSending ? `${this.countdown}秒后重发` : "发送验证码";
    },
  },
  mounted() {
    this.updateTime();
    this.startTimer();
  },
  methods: {
    // 阻止表单提交
    handleSubmit() {
      console.log("表单提交");
    },
    // 更新时间
    updateTime() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      this.currentTime = `${hours}:${minutes}`;

      if (hours >= 5 && hours < 12) {
        this.timeGreeting = "早上好，新的一天也要注意健康哦！";
      } else if (hours >= 12 && hours < 18) {
        this.timeGreeting = "下午好，记得不要错过午饭时间哦！";
      } else if (hours >= 18 && hours < 22) {
        this.timeGreeting = "晚上好，熬夜对身体的伤害是很大的！";
      } else {
        this.timeGreeting = "夜深了，早点休息才是正确的选择哦！";
      }
    },
    startTimer() {
      setInterval(() => {
        this.updateTime();
      }, 1000);
    },
    showLoginPrompt() {
      // 使用 SweetAlert2 显示美化后的提示框
      Swal.fire({
        title: "请先登录！",
        html: '<span style="font-size: 18px;">请先登录您的账号才能继续操作。</span>',
        icon: "warning",
        confirmButtonText: "确定",
        customClass: {
          popup: "my-swal-popup",
          title: "my-swal-title",
          confirmButton: "my-swal-confirm",
        },
        width: "400px",
        heightAuto: false,
      });
    },
    // 切换表单
    switchForm(formType) {
      this.currentForm = formType;
    },
    // 快速登录
    fastlogin() {
      // 检查用户名和密码是否为空以及单选框是否选择
      if (!this.agree) {
        Swal.fire({
          title: "登录失败！",
          html: '<span style="font-size: 18px;">请先阅读并同意用户协议和隐私政策！</span>',
          icon: "error",
          confirmButtonText: "确定",
          customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
          },
        });
        return;
      }
      if (!this.phoneNumber || !this.password) {
        Swal.fire({
          title: "登录失败！",
          html: '<span style="font-size: 18px;">用户名和密码不能为空！</span>',
          icon: "error",
          confirmButtonText: "确定",
          customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            confirmButton: "my-swal-confirm",
          },
        });
        return;
      }

      // 发送登录请求到后端接口
      axios
        .post("/api/fastlogin", {
          phoneNumber: this.phoneNumber,
          password: this.password,
        })
        .then((response) => {
          if (response.data.code === 200) {
            // 登录成功处理
            console.log("登录成功:", response.data);
            Swal.fire({
              title: "登录成功！",
              html:
                '<span style="font-size: 18px;">欢迎回来，' +
                response.data.phoneNumber +
                "！</span>",
              icon: "success",
              confirmButtonText: "确定",
              customClass: {
                popup: "my-swal-popup",
                title: "my-swal-title",
                confirmButton: "my-swal-confirm",
              },
            });
            this.$router.push("/home");
          } else {
            // 登录失败处理
            console.error("登录失败:", response.data);
            // 错误提示
            Swal.fire({
              title: "登录失败！",
              html: '<span style="font-size: 18px;">用户名或密码错误！</span>',
              icon: "error",
              confirmButtonText: "确定",
              customClass: {
                popup: "my-swal-popup",
                title: "my-swal-title",
                confirmButton: "my-swal-confirm",
              },
            });
          }
        });
    },
    // 发送验证码
    sendVerificationCode() {
      if (this.isSending) return;

      this.isSending = true;
      this.startCountdown();

      this.sendCodeToServer();
    },
    startCountdown() {
      const timer = setInterval(() => {
        if (this.countdown <= 0) {
          clearInterval(timer);
          this.isSending = false;
          this.countdown = 60;
        } else {
          this.countdown--;
        }
      }, 1000);
    },
    // 发送验证码到后端接口
    async sendCodeToServer() {
      try {
        const response = await axios.post("/api/send-verification-code", {
          phoneNumber: this.phoneNumber,
        });

        if (response.status === 200) {
          console.log("验证码发送成功");
          Swal.fire({
            title: "验证码已发送！",
            html: '<span style="font-size: 18px;">验证码已发送至您的手机，请注意查收。</span>',
            icon: "success",
            confirmButtonText: "确定",
            customClass: {
              popup: "my-swal-popup",
              title: "my-swal-title",
              confirmButton: "my-swal-confirm",
            },
          });
        } else {
          console.error("验证码发送失败");
          Swal.fire({
            title: "验证码发送失败！",
            html: '<span style="font-size: 18px;">验证码发送失败，请稍后再试。</span>',
            icon: "error",
            confirmButtonText: "确定",
            customClass: {
              popup: "my-swal-popup",
              title: "my-swal-title",
              confirmButton: "my-swal-confirm",
            },
          });
        }
      } catch (error) {
        console.error("发送验证码时发生错误:", error);
        Swal.fire({
          title: "验证码发送失败！",
          html: '<span style="font-size: 18px;">验证码发送失败，请稍后再试。</span>',
          icon: "error",
          confirmButtonText: "确定",
          customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            confirmButton: "my-swal-confirm",
          },
        });
      }
    },
    // 动态登录
    async dylogin() {
      const phoneNumber = this.phoneNumber;
      const verificationCode = this.verificationCode;

      // 发送登录请求到后端接口
      axios
        .post("/api/dylogin", {
          phoneNumber: phoneNumber,
          verificationCode: verificationCode,
        })
        .then((response) => {
          if (response.status === 200) {
            // 登录成功处理
            console.log("登录成功:", response.data);
            Swal.fire({
              title: "登录成功！",
              html:
                '<span style="font-size: 18px;">欢迎回来，' +
                response.data.phoneNumber +
                "！</span>",
              icon: "success",
            }).then(() => {
              // 登录成功后跳转到主页
              this.$router.push("/home");
            });
          } else {
            // 登录失败处理
            console.error("登录失败:", error);
            // 错误提示
            Swal.fire({
              title: "登录失败！",
              html: '<span style="font-size: 18px;">验证码错误！</span>',
              icon: "error",
              confirmButtonText: "确定",
              customClass: {
                popup: "my-swal-popup",
              },
            });
          }
        });
    },
    // 检查密码强度
    checkPasswordStrength(password) {
      let strength = ["weak", "medium", "strong"];
      let levels = [];

      if (password.length < 6) {
        levels.push("weak");
      } else if (password.length < 10) {
        levels.push("weak", "medium");
      } else {
        levels.push("weak", "medium", "strong");
      }

      return levels;
    },
    // 检查确认密码是否匹配
    checkPasswordMatch() {
      this.passwordMatch = this.confirmPassword === this.newpassword;
    },
    // 注册
    register_login() {
      axios
        .post("/api/register", {
          phoneNumber: this.phoneNumber,
          password: this.password,
        })
        .then((response) => {
          // 加载快速登录表单
          if (response.status === 200) {
            console.log("注册成功:", response.data);
            Swal.fire({
              title: "注册成功！",
              html:
                '<span style="font-size: 18px;">欢迎注册，' +
                response.data.phoneNumber +
                "！</span>",
              icon: "success",
            });
            this.loadQuickLoginForm();
            // 自动填充手机号和密码
            this.fillLoginForm();
          }
        })
        .catch((error) => {
          console.error("注册失败:", error);
          Swal.fire({
            title: "注册失败！",
            html: '<span style="font-size: 18px;">注册失败，请稍后再试。</span>',
            icon: "error",
            confirmButtonText: "确定",
            customClass: {
              popup: "my-swal-popup",
              title: "my-swal-title",
              confirmButton: "my-swal-confirm",
            },
          });
        });
    },
    // 加载快速登录表单
    loadQuickLoginForm() {
      this.currentForm = "quickLogin";
      console.log("快速登录表单已加载");
    },
    // 自动填充手机号和密码
    fillLoginForm() {
      // 获取手机号输入框和密码输入框元素
      const phoneNumberInput = this.$refs.phoneNumberInput;
      const passwordInput = this.$refs.passwordInput;

      // 检查 DOM 元素是否存在
      if (!phoneNumberInput || !passwordInput) {
        console.error("无法找到手机号或密码输入框");
        return;
      }

      // 填充手机号和密码
      phoneNumberInput.value = this.phoneNumber;
      passwordInput.value = this.password;

      console.log("手机号和密码已自动填充");
    },
  },
  watch: {
    // 监听密码的变化
    newpassword: function (newVal) {
      this.passwordStrength = this.checkPasswordStrength(newVal);
    },
    // 监听确认密码的变化
    newpassword: function (newVal) {
      this.passwordStrength = this.checkPasswordStrength(newVal);
      this.checkPasswordMatch();
    },
  },
};
</script>

<style scoped>
.introduce {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.421);
  padding: 10px 20px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
}

.logo-text {
  margin-left: 5px;
  font-family: "隶书", sans-serif;
  font-size: 30px;
  letter-spacing: 2px;
  color: #fff;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav li {
  display: inline-block;
  margin-right: 20px;
}

nav a {
  text-decoration: none;
  font-size: 18px;
  color: #fff;
}

footer {
  margin-top: 0px;
  font-size: 0.8em;
  color: black;
  text-align: center;
}

.time {
  position: absolute;
  top: 25%;
  left: 10%;
  font-size: 80px;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
.time-text {
  font-size: 64px;
}
.time-greeting {
  font-size: 24px;
}
.card-opt {
  position: absolute;
  top: 23%;
  right: 10%;
  transform: translateY(-50%);
  display: flex;
  gap: 10px;
  z-index: 1;
}

.transparent-button {
  border-radius: 50px; /* 圆角 */
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  color: white;
  font-size: large;
  font-weight: bold;
  width: 170px;
  height: 40px;
}

.card-opt .el-button {
  --el-button-focus-border-color: transparent;
  --el-button-hover-border-color: transparent;
}

.card-opt .el-button:focus,
.card-opt .el-button:active {
  outline: none;
  box-shadow: none;
  background-color: white;
  color: black;
}

.selected-button {
  background-color: white;
  color: black;
}

.unselected-button {
  background-color: rgba(255, 255, 255, 0.5);
  color: rgba(0, 0, 0, 0.6);
  border-color: transparent;
}

.card {
  position: absolute;
  top: 55%;
  right: 10%;
  transform: translateY(-50%);
  width: 25%;
  height: auto;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.el-input {
  width: 220px;
  margin-bottom: 10px;
}
.forget {
  margin-bottom: 10px;
  text-align: right;
  font-size: 14px;
  color: white;
  padding-right: 50px;
}

.no-underline-f {
  text-decoration: none;
  color: inherit;
  font-size: small;
}

.submit {
  display: flex;
  justify-content: center;
}
.submit .el-button {
  border-radius: 50px; /* 圆角 */
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid #ff6347;
  color: white;
  width: 240px;
  font-size: 16px;
  font-weight: bold;
}

.register {
  padding-left: 50px;
  margin-top: 10px;
  font-size: small;
}

.strength-indicator {
  display: flex;
  margin-bottom: 5px;
}

.strength-weak {
  width: 70px;
  height: 20px;
  background-color: red;
  border-radius: 5px;
  margin-right: 5px;
  text-align: center;
  font-size: small;
  font-weight: bold;
}

.strength-medium {
  width: 70px;
  height: 20px;
  background-color: yellow;
  border-radius: 5px;
  margin-right: 5px;
  text-align: center;
  font-size: small;
  font-weight: bold;
}

.strength-strong {
  width: 70px;
  height: 20px;
  background-color: green;
  border-radius: 5px;
  margin-right: 5px;
  text-align: center;
  font-size: small;
  font-weight: bold;
}

.green {
  color: green;
  border-radius: 50px; /* 圆角 */
  color: white;
  font-size: smaller;
  font-weight: bold;
}

.red {
  color: red;
  border-radius: 50px; /* 圆角 */
  color: white;
  font-size: smaller;
  font-weight: bold;
  padding: 2px;
}

.account-text {
  color: rgba(0, 0, 0, 0.5); /* 半透明黑色 */
}
.no-underline-r {
  text-decoration: none;
  color: inherit;
  font-size: small;
  font-weight: bold;
  color: white;
}
.text {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 50px;
  padding-right: 50px;
}

.text input[type="checkbox"] {
  margin-right: 5px;
  align-self: flex-start;
}

.text label {
  font-size: small;
  color: rgba(0, 0, 0, 0.5); /* 半透明黑色 */
  white-space: pre-wrap;
}

.more {
  font-size: small;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  gap: 10px;
}
.line {
  text-align: center;
}

.circles {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.blue {
  background-color: blue;
}
</style>