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
    <div class="overlay-text">你值得这世间所有的美好</div>
    <div class="overlay-texts">
      <div class="overlay-text-predict">
        先进的机器学习模型<br />
        为您快速检测复发风险<br />
        <el-button plain @click="goToPredict">→立即体验</el-button>
      </div>
      <div class="overlay-text-ai">
        最新的智慧大模型<br />
        为您排忧解难<br />
        <el-button plain @click="goToAI">→立即体验</el-button>
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
          <div class="imgSpace">
            <img :src="item.image" alt="News Image" class="card-image" />
          </div>
          <div class="card-content" id="cc1">
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
          <div class="imgSpace">
            <img :src="item.image" alt="News Image" class="card-image" />
          </div>

          <div class="card-content">
            <h3 class="card-title">{{ item.title }}</h3>
          </div>
        </a>
      </div>
    </div>
    <div class="more">
      <el-button type="primary" plain @click="goToConsultation"
        >更多咨询</el-button
      >
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
          title: "21种癌症表现......",
          image: require("../assets/newstitle1.jpg"), // 使用require确保路径正确
          url: "https://www.toutiao.com/article/7099316532420805133/?channel=&source=search_tab",
        },
        {
          title: "癌症治疗仪器重大突破！",
          image: require("../assets/title2.jpg"), // 使用require确保路径正确
          url: "https://www.toutiao.com/article/7409207215829156390/?channel=&source=search_tab",
        },
      ],
      largeNewsFirstRow: {
        title: "什么是癌症？",
        image: require("@/assets/title3.jpg"), // 使用require确保路径正确
        summary: "全国肿瘤防治安全周:关于癌症，你了解多少？",
        url: "https://www.toutiao.com/article/6680716292971823628/?channel=&source=search_tab",
      },
      largeNewsSecondRow: {
        title: "小分子疗法3期临床",
        image: require("@/assets/title4.jpg"), // 使用require确保路径正确
        summary: "70%癌症患者获得缓解，突破性小分子疗法挺进3期临床",
        url: "https://www.toutiao.com/article/7408715920626942504/?channel=&source=search_tab",
      },
      smallNewsSecondRow: [
        {
          title: "打针杀死癌细胞！疗法再突破",
          image: require("@/assets/title5.png"), // 使用require确保路径正确
          url: "https://www.toutiao.com/article/7017011972915020324/",
        },
        {
          title: "普通人也能承受的新型疗法！",
          image: require("@/assets/title6.jpg"), // 使用require确保路径正确
          url: "https://www.toutiao.com/article/7212829647241986600/?channel=&source=search_tab",
        },
      ],
    };
  },
  methods: {
    goToConsultation() {
      this.$router.push("/consultation");
    },
    goToPredict() {
      this.$router.push("/predict");
    },
    goToAI() {
      this.$router.push("/ai");
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

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-size: 50px;
  letter-spacing: 4px;
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
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-family: "楷体", sans-serif;
  line-height: 1.5;
}

.overlay-text-predict .el-button {
  width: 30%;
  margin-top: 5px;
  border-radius: 50px; /* 圆角 */
  background-color: black;
  border: 2px solid #ff6347;
  color: white;
}

.overlay-text-ai .el-button {
  width: 30%;
  margin-top: 5px;
  border-radius: 50px; /* 圆角 */
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid #ff6347;
  color: white;
}

.news {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;
  margin-left: 100px;
  margin-right: 100px;
}

.row {
  display: flex;
  gap: 20px;
  align-items: stretch;
}

.small-card {
  background-image: url("../assets/th.jpg");
  background-color: white;
  width: 350px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 95% 95%;
  box-shadow: 0 8px 8px #a4a4a4;
  padding: 17px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  height: 200px;
  text-decoration: none; /* 移除默认链接样式 */
  color: inherit; /* 继承父元素颜色 */
  border: 1px solid #dfdfdf;
}

.small-card:hover {
  box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2); /* 增加阴影 */
  transform: scale(1.05); /* 缩放效果 */
  transition: all 0.3s ease; /* 平滑过渡 */
}

.card-image {
  width: 100%;
  height: 100%;
  min-width: 150px;
  border-radius: 5px;
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  /* background-color: rgba(0, 0, 0, 0.5); 半透明背景 */
  color: #551a8b;
  padding: 10px;
  text-align: center;

  height: 50px;
}
#cc1 {
  color: white;
}
.imgSpace {
  width: 100%;
  height: 100%;
}
.card-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.card-summary {
  font-size: 1em;
  color: #666;
}

.large-card {
  background-color: white;
  background-image: url("../assets/th.jpg");
  background-position: center;
  background-size: 98% 95%;
  background-repeat: no-repeat;
  box-shadow: 0 8px 8px #a4a4a4;
  padding: 17px;
  border-radius: 5px;
  overflow: hidden;
  height: 200px;
  text-decoration: none;
  color: inherit;
  display: flex;
  border: 1px solid #c6c6c6;
}
.large-card:hover {
  box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2); /* 增加阴影 */
  transform: scale(1.05); /* 缩放效果 */
  transition: all 0.3s ease; /* 平滑过渡 */
}

.left-content {
  flex: 1;
  padding: 20px;
}
a {
  text-decoration: none;
}
.right-content {
  flex: 1;
  padding: 10px;

  border-radius: 5px;

  padding-left: 75px;
}

.large-card-image {
  flex: 1;
  width: 100%;
  height: 100%;
  min-width: 200px;
  border-radius: 5px;
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
.imgSpace {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>