<template>
  <div>
    <div class="introduce">
      <video
        src="../assets/video.mp4"
        autoplay
        muted
        loop
        class="background-video"
      ></video>
      <header class="header">
        <div class="logo-container">
          <img src="../assets/logo.png" alt="Logo" class="logo" />
          <span class="logo-text">沐光健康平台</span>
        </div>
        <nav>
          <ul>
            <li><a href="#" @click.prevent="showLoginPrompt">个人中心</a></li>
            <li><a href="#" @click.prevent="showLoginPrompt">在线咨询</a></li>
            <li><a href="#" @click.prevent="showLoginPrompt">病情交流</a></li>
            <li><a href="#" @click.prevent="showLoginPrompt">常见问题</a></li>
            <li><a href="#" @click.prevent="showLoginPrompt">关于我们</a></li>
          </ul>
        </nav>
      </header>
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
      <div class="card">
        <div v-if="currentForm === 'quickLogin'">
          <!-- 快速登录表单内容 -->
          <div class="input-group">
            <el-input
              placeholder="手机号"
              v-model="phoneNumber"
              prefix-icon="el-icon-phone"
              style="width: 200px; margin-bottom: 10px"
            ></el-input>
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="password"
              prefix-icon="el-icon-lock"
              show-password
              style="width: 200px; margin-bottom: 10px"
            ></el-input>
          </div>
          <div class="forget">
            <a href="#" @click.prevent="showLoginPrompt" class="no-underline-f"
              >忘记密码？</a
            >
          </div>
          <div class="submit">
            <el-button @click="login" plain> →登录 </el-button>
          </div>
          <div class="register">
            <span class="account-text">还没有账号？</span>
            <a href="#" @click.prevent="showLoginPrompt" class="no-underline-r"
              >免费注册</a
            >
          </div>
          <div class="text">
            <input type="checkbox" id="agreeCheckbox" v-model="agree" />
            <label for="agreeCheckbox"
              >我已阅读并同意《用户协议》和《隐私政策》，并确保在使用时遵守相关的法律法规，保护个人信息</label
            >
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
        </div>
      </div>
    </div>

    <footer>
      <p>&copy; 2024 BUPT. 版权所有</p>
    </footer>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      currentTime: "",
      timeGreeting: "",
      currentForm: "quickLogin", // 初始默认为快速登录表单
      agree: false,
      phoneNumber: "",
      password: "",
    };
  },
  mounted() {
    this.updateTime();
    this.startTimer();
  },
  methods: {
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
    switchForm(formType) {
      this.currentForm = formType;
    },
    login() {
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
      if (!this.username || !this.password) {
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
        .post("/api/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          // 登录成功处理
          console.log("登录成功:", response.data);
          Swal.fire({
            title: "登录成功！",
            html:
              '<span style="font-size: 18px;">欢迎回来，' +
              response.data.username +
              "！</span>",
            icon: "success",
            confirmButtonText: "确定",
            customClass: {
              popup: "my-swal-popup",
              title: "my-swal-title",
              confirmButton: "my-swal-confirm",
            },
          }).then(() => {
            // 登录成功后跳转到主页
            this.$router.push("/home");
          });
        })
        .catch((error) => {
          // 登录失败处理
          console.error("登录失败:", error);
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
        });
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
  font-size: 16px;
  color: #333;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav li {
  margin-right: 20px;
}

nav a {
  text-decoration: none;
  color: #333;
}

footer {
  margin-top: 0px;
  font-size: 0.8em;
  color: black;
  text-align: center;
}

.time {
  position: absolute;
  top: 30%;
  left: 10%;
  font-size: 18px;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
.time-text {
  font-size: 46px;
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
  padding-right: 70px;
}

.no-underline-f {
  text-decoration: none;
  color: inherit;
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
  width: 220px;
  font-size: 16px;
  font-weight: bold;
}

.register {
  padding-left: 70px;
  margin-top: 10px;
}
.account-text {
  color: rgba(0, 0, 0, 0.5); /* 半透明黑色 */
}
.no-underline-r {
  text-decoration: none;
  color: inherit;
  font-size: 16px;
  font-weight: bold;
  color: white;
}
.text {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding-left: 70px;
  padding-right: 70px;
}

.text input[type="checkbox"] {
  margin-right: 5px;
  align-self: flex-start;
}

.text label {
  font-size: 14px;
  color: #333;
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