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
        <img src="../assets/logo.png" alt="Logo" class="logo" />
        <span class="logo-text">沐光健康平台</span>
      </div>
      <nav>
        <ul>
          <li><a href="#">个人中心</a></li>
          <li><a href="#">在线咨询</a></li>
          <li><a href="#">病情交流</a></li>
          <li><a href="#">常见问题</a></li>
          <li><a href="#">关于我们</a></li>
        </ul>
      </nav>
    </header>
    <div class="overlay-text">你值得这世间所有的美好</div>
    <div class="overlay-texts">
      <div class="overlay-text-predict">
        先进的机器学习模型<br />
        为您快速检测复发风险<br />
        <el-button plain>→立即体验</el-button>
      </div>
      <div class="overlay-text-ai">
        最新的智慧大模型<br />
        为您排忧解难<br />
        <el-button plain>→立即体验</el-button>
      </div>
    </div>
  </div>
  <div class="news">
    <div class="row">
      <div
        class="small-card"
        v-for="(item, index) in smallNewsFirstRow"
        :key="index"
      >
        <a :href="item.url" target="_blank">
          <img :src="item.image" alt="News Image" class="card-image" />
          <div class="card-content">
            <h3 class="card-title">{{ item.title }}</h3>
          </div>
        </a>
      </div>
      <div class="large-card">
        <div class="left-content">
          <a :href="largeNewsFirstRow.url" target="_blank">
            <h3 class="card-title">{{ largeNewsFirstRow.title }}</h3>
            <p class="card-summary">{{ largeNewsFirstRow.summary }}</p>
          </a>
        </div>
        <div class="right-content">
          <a :href="largeNewsFirstRow.url" target="_blank">
            <img
              :src="largeNewsFirstRow.image"
              alt="Large News Image"
              class="large-card-image"
            />
          </a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="large-card">
        <div class="left-content">
          <a :href="largeNewsSecondRow.url" target="_blank">
            <h3 class="card-title">{{ largeNewsSecondRow.title }}</h3>
            <p class="card-summary">{{ largeNewsSecondRow.summary }}</p>
          </a>
        </div>
        <div class="right-content">
          <a :href="largeNewsSecondRow.url" target="_blank">
            <img
              :src="largeNewsSecondRow.image"
              alt="Large News Image"
              class="large-card-image"
            />
          </a>
        </div>
      </div>
      <div
        class="small-card"
        v-for="(item, index) in smallNewsSecondRow"
        :key="index"
      >
        <a :href="item.url" target="_blank">
          <img :src="item.image" alt="News Image" class="card-image" />
          <div class="card-content">
            <h3 class="card-title">{{ item.title }}</h3>
          </div>
        </a>
      </div>
    </div>
    <div class="more">
      <el-button type="primary" plain>更多咨询</el-button>
    </div>
  </div>
  <footer>
    <p>&copy; 2024 BUPT. 版权所有</p>
  </footer>
</template>


<script>
export default {
  data() {
    return {
      smallNewsFirstRow: [
        {
          title: "新闻标题1",
          image: require("@/assets/test.png"), // 使用require确保路径正确
          url: "https://www.baidu.com",
        },
        {
          title: "新闻标题2",
          image: require("@/assets/test.png"), // 使用require确保路径正确
          url: "https://www.example.com",
        },
      ],
      largeNewsFirstRow: {
        title: "大新闻标题1",
        image: require("@/assets/test.png"), // 使用require确保路径正确
        summary: "这是一段新闻摘要，用于展示更多的信息。",
        url: "https://www.google.com",
      },
      largeNewsSecondRow: {
        title: "大新闻标题2",
        image: require("@/assets/test.png"), // 使用require确保路径正确
        summary: "这是另一段新闻摘要，用于展示更多的信息。",
        url: "https://www.example.org",
      },
      smallNewsSecondRow: [
        {
          title: "新闻标题3",
          image: require("@/assets/test.png"), // 使用require确保路径正确
          url: "https://www.example.net",
        },
        {
          title: "新闻标题4",
          image: require("@/assets/test.png"), // 使用require确保路径正确
          url: "https://www.example.info",
        },
      ],
    };
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

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-size: 30px;
  color: #fff;
  font-weight: bold;
}

.overlay-texts {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  justify-content: space-between;
  width: 80%; /* 调整宽度以适应内容 */
}

.overlay-text-predict,
.overlay-text-ai {
  flex: 1;
  text-align: center; /* 文字居中对齐 */
  color: #fff;
  font-weight: bold;
}

.overlay-text-predict .el-button {
  border-radius: 50px; /* 圆角 */
  background-color: black;
  border: 2px solid #ff6347;
  color: white;
}

.overlay-text-ai .el-button {
  border-radius: 50px; /* 圆角 */
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid #ff6347;
  color: white;
}

.news {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.row {
  display: flex;
  gap: 20px;
}

.small-card {
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  height: 200px;
  text-decoration: none; /* 移除默认链接样式 */
  color: inherit; /* 继承父元素颜色 */
}

.card-image {
  width: 100%;
  height: auto;
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  color: white;
  padding: 10px;
}

.card-title {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.card-summary {
  font-size: 1em;
  color: #666;
}

.large-card {
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
  height: 200px;
  text-decoration: none; /* 移除默认链接样式 */
  color: inherit; /* 继承父元素颜色 */
  display: flex;
}

.left-content {
  flex: 1;
  padding: 20px;
}

.right-content {
  flex: 1;
  padding: 20px;
}

.large-card-image {
  flex: 1;
  width: 100%;
  height: auto;
}

/* 第一行布局 */
.row:first-child .small-card {
  flex: 1;
}

.row:first-child .large-card {
  flex: 2;
}

/* 第二行布局 */
.row:last-child .large-card {
  flex: 2;
}

.row:last-child .small-card {
  flex: 1;
}

.more {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%;
}

.more .el-button {
  border-radius: 50px; /* 圆角 */
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid #ff6347;
  color: rgb(14, 13, 13);
  font-weight: bold;
}
footer {
  margin-top: 0px;
  font-size: 0.8em;
  color: black;
  text-align: center;
}
</style>