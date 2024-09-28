<template>
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
        <router-link to="/" class="logo-link">
          <img src="../assets/logo.png" alt="Logo" class="logo" />
        </router-link>
        <span class="logo-text">沐光健康平台</span>
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/personal-center">个人中心</router-link>
          </li>
          <li>
            <router-link to="/online-consultation">在线咨询</router-link>
          </li>
          <li>
            <router-link to="/disease-exchange">病情交流</router-link>
          </li>
          <li>
            <router-link to="/faq">常见问题</router-link>
          </li>
          <li>
            <router-link to="/about-us">关于我们</router-link>
          </li>
        </ul>
      </nav>
    </header>

    <div class="aiqa">
      <div class="sidebar">
        <div class="ailogo">
          <img src="../assets/ai_logo.jpg" alt="Logo" class="logo-image" />
        </div>
        <div class="history-title">历史对话</div>
        <div class="history">
          <el-card
            v-for="(dialog, index) in historyDialogs"
            :key="index"
            class="dialog-card"
            @click="showDialog(dialog)"
          >
            <div class="dialog-header">
              <p class="first-message">{{ dialog.firstMessage }}</p>
              <p class="timestamp">{{ formatDate(dialog.timestamp) }}</p>
            </div>
            <div class="dialog-body">
              <!-- 可以在这里展示更多的对话信息 -->
            </div>
          </el-card>
        </div>
        <el-button primary @click="setNewTalk" class="new-talk"
          >新的对话</el-button
        >
      </div>
      <div class="main-container">
        <div class="title">
          <h1>AI智能诊断</h1>
          <p>AI智能诊断，AI智能诊断，AI智能诊断</p>
        </div>
        <div ref="messagesContainer" class="messages">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="{
              user: message.type === 'user',
              ai: message.type === 'ai',
            }"
          >
            <div class="avatar" :class="message.type">
              <img
                :src="message.type === 'user' ? userAvatar : aiAvatar"
                alt="Avatar"
              />
            </div>
            <div class="message-bubble" :class="message.type">
              <p>{{ message.text }}</p>
            </div>
          </div>
        </div>
        <div class="content">
          <el-input
            :rows="3"
            type="textarea"
            v-model="userInput"
            placeholder="请输入您的问题，支持enter发送，enter+shift换行"
            class="custom-textarea"
            @keydown.enter.prevent="handleEnter"
          ></el-input>
          <el-button type="primary" @click="sendQuestion">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userInput: "",
      messages: [],
      currentConversationId: null,
      userAvatar: require("../assets/user.jpeg"),
      aiAvatar: require("../assets/ai.jpeg"),

      historyDialogs: [
        {
          id: 1,
          timestamp: 1695780000000,
          firstMessage: "你好，有什么可以帮助你的吗？",
          messages: [
            { type: "user", text: "你好，有什么可以帮助你的吗？" },
            {
              type: "ai",
              text: "你好，我是一个AI智能助手。你可以向我提问任何问题。",
            },
            { type: "user", text: "我需要了解产品的详细信息。" },
            { type: "ai", text: "当然，请告诉我具体的产品名称。" },
            { type: "user", text: "产品名称是 XYZ。" },
            { type: "ai", text: "好的，我会发送详细资料给你。" },
          ],
        },
        {
          id: 2,
          timestamp: 1695780000000,
          firstMessage: "你好，有什么可以帮助你的吗？",
          messages: [
            { type: "user", text: "你好，有什么可以帮助你的吗？" },
            {
              type: "ai",
              text: "你好，我是一个AI智能助手。你可以向我提问任何问题。",
            },
            { type: "user", text: "我需要了解产品的详细信息。" },
          ],
        },
        {
          id: 3,
          timestamp: 1695780000000,
          firstMessage: "你好，有什么可以帮助你的吗？",
          messages: [
            { type: "user", text: "你好，有什么可以帮助你的吗？" },
            {
              type: "ai",
              text: "你好，我是一个AI智能助手。你可以向我提问任何问题。",
            },
            { type: "user", text: "我需要了解产品的详细信息。" },
          ],
        },
        {
          id: 4,
          timestamp: 1695780000000,
          firstMessage: "你好，有什么可以帮助你的吗？",
          messages: [
            { type: "user", text: "你好，有什么可以帮助你的吗？" },
            {
              type: "ai",
              text: "你好，我是一个AI智能助手。你可以向我提问任何问题。",
            },
            { type: "user", text: "我需要了解产品的详细信息。" },
          ],
        },
        {
          id: 5,
          timestamp: 1695780000000,
          firstMessage: "你好，有什么可以帮助你的吗？",
          messages: [
            { type: "user", text: "你好，有什么可以帮助你的吗？" },
            {
              type: "ai",
              text: "你好，我是一个AI智能助手。你可以向我提问任何问题。",
            },
            { type: "user", text: "我需要了解产品的详细信息。" },
          ],
        },
        {
          id: 6,
          timestamp: 1695780000000,
          firstMessage: "你好，有什么可以帮助你的吗？",
          messages: [
            { type: "user", text: "你好，有什么可以帮助你的吗？" },
            {
              type: "ai",
              text: "你好，我是一个AI智能助手。你可以向我提问任何问题。",
            },
            { type: "user", text: "我需要了解产品的详细信息。" },
          ],
        },
      ],
    };
  },
  methods: {
    async fetchHistoryDialogs() {
      try {
        const response = await axios.get("/api/history-dialogs");
        this.historyDialogs = response.data;
      } catch (error) {
        console.error("Error fetching history dialogs:", error);
      }
    },
    showDialog(dialog) {
      this.currentConversationId = dialog.id;
      // 将历史对话的消息添加到当前的消息列表中
      this.messages = dialog.messages;
      this.scrollToBottom();
    },
    async sendQuestion() {
      if (!this.userInput.trim()) return;

      this.messages.push({ type: "user", text: this.userInput });
      this.scrollToBottom();

      this.messages.push({ type: "ai", text: "正在加载回答..." });
      this.scrollToBottom();

      setTimeout(() => {
        const answer = this.getFakeAnswer(this.userInput);
        this.messages[this.messages.length - 1].text = answer;
      }, 1000);

      this.userInput = "";
      this.scrollToBottom();
    },
    handleEnter(event) {
      if (event.shiftKey) {
        this.userInput += "\n";
      } else {
        event.preventDefault();
        this.sendQuestion();
      }
    },
    getFakeAnswer(question) {
      const fakeAnswers = [
        "您好，关于这个问题，您可以尝试以下方法...",
        "这个问题通常可以通过重启设备解决。",
        "根据我的分析，可能是软件配置问题，请检查配置文件。",
        "这个问题可能是网络连接不稳定造成的，请检查网络设置。",
        "这个问题比较复杂，建议您联系技术支持获取帮助。",
      ];

      return fakeAnswers[Math.floor(Math.random() * fakeAnswers.length)];
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const messagesContainer = this.$refs.messagesContainer;
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      });
    },
    async setNewTalk() {
      // 检查当前对话是否为空
      if (!this.currentConversationId) {
        console.log("Creating new conversation...");
        // 创建新对话
        try {
          const response = await axios.post("/api/create-conversation", {
            messages: this.messages,
          });
          this.currentConversationId = response.data.conversationId;
          console.log("New conversation created:", response.data);
        } catch (error) {
          console.error("Error creating new conversation:", error);
        }
      } else {
        console.log("Updating existing conversation...");
        // 更新已有对话
        try {
          const newMessages = this.messages.filter((msg) => !msg.isExisting); // 过滤出新增的消息
          await axios.put(
            `/api/update-conversation/${this.currentConversationId}`,
            {
              messages: newMessages,
            }
          );
          console.log("Conversation updated:", this.currentConversationId);
        } catch (error) {
          console.error("Error updating conversation:", error);
        }
      }

      // 刷新历史对话列表
      await this.fetchHistoryDialogs();

      // 清空当前消息列表
      this.messages = [];
      this.userInput = "";
      this.currentConversationId = null; // 重置当前对话 ID
      this.scrollToBottom();
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
  },

  mounted() {
    this.fetchHistoryDialogs();
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

.aiqa {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 10px;
  z-index: 2;
  width: 90%;
  height: 75%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  overflow-y: scroll;
}

.sidebar {
  width: 20%;
  height: 100%;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.history {
  flex: 1; /* 占用剩余空间 */
  overflow-y: auto; /* 超出高度时显示滚动条 */
  margin-left: 10px;
  margin-right: 10px;
  padding-right: 8px; /* 预留滚动条的空间 */
}

.history::-webkit-scrollbar {
  width: 8px; /* 滚动条宽度 */
}

.history::-webkit-scrollbar-track {
  background-color: transparent; /* 滚动条轨道颜色 */
}

.history::-webkit-scrollbar-thumb {
  background-color: gray; /* 默认滚动条颜色 */
  border-radius: 4px; /* 滚动条圆角 */
}

.history-title {
  font-size: 16px; /* 调小字号 */
  font-weight: bold;
  text-align: center; /* 居中对齐 */
}

.ailogo {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.logo-image {
  width: 50px;
  height: 50px;
}

.new-talk {
  width: 75%;
  background-color: #2582f5 !important;
  color: white;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin: 10px auto; /* 添加水平居中 */
  text-align: center; /* 文字居中 */
  display: block;
}

.dialog-card {
  cursor: pointer;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

.dialog-header {
  height: 30px;
}

.first-message {
  white-space: nowrap; /* 不允许换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
  font-size: 0.1em;
}

.timestamp {
  text-align: right; /* 时间居右 */
  font-size: 0.1em; /* 较小字体 */
}

.main-container {
  width: 78%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.title {
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.messages .message-bubble {
  max-width: 70%;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-break: break-word;
  height: 30px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.messages .user {
  display: flex;
  justify-content: flex-end;
}

.messages .user .message-bubble {
  background-color: #e0e0e0;
  margin-left: auto;
}

.messages .ai {
  display: flex;
  justify-content: flex-start;
}

.messages .ai .message-bubble {
  background-color: #b3d4fc;
  margin-right: auto;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user .avatar {
  margin-right: 0;
  order: 1;
}

.ai .avatar {
  margin-right: 10px;
  order: 0;
}

.user .avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.ai .avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 98%;
  height: 100px;
  margin-left: 10px;
  margin-left: 10px;
}

.content .custom-textarea {
  resize: none;
  overflow-y: auto;
  margin-right: 10px;
  height: 60px;
}
</style>