<template>
  <div class="all">
    <pagehead></pagehead>
    <!-- 卡片组件 -->
    <div id="content">
      <el-card class="system-intro">
        <h2 class="card-title">XX系统为您保驾护航 专注于您的身体健康</h2>
        <p class="card-desc">
          这是一个用于病情预测的系统。通过分析患者的病历数据，可以预测患者未来的健康状况，帮助医生做出更准确的诊断。
        </p>
      </el-card>
    </div>

    <!-- 医疗动态 -->
    <div id="news">
      <!-- 走马灯 -->
      <el-carousel height="600px">
        <el-carousel-item v-for="(item, index) in newsImages" :key="index">
          <img :src="item" alt="News Image" style="width: 100%; height: 100%" />
        </el-carousel-item>
      </el-carousel>

      <!-- 新闻卡片 -->
      <div class="news-cards">
        <el-row :gutter="20">
          <el-col
            :span="12"
            v-for="(newsItem, index) in newsItems"
            :key="index"
          >
            <el-card shadow="hover" @click="handleNewsClick(newsItem.url)">
              <div vslot="header" class="clearfix">
                <span>{{ newsItem.title }}</span>
              </div>
              <div>{{ newsItem.description }}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <pagefooter></pagefooter>
  </div>
</template>

<script>
import _PageHeader from "element-plus/lib/el-page-header";

export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      newsImages: [
        "http://dingyue.nosdn.127.net/OKeFJklDlYKTib3tK9CnUn46Z7iKAcSBMNYj38sho55hL1513151118761.jpeg",
        "https://ts1.cn.mm.bing.net/th/id/R-C.80ac1965bf38dd31068b1f96bb77d471?rik=sTY7H2oF%2b%2b8fhw&riu=http%3a%2f%2fpic.616pic.com%2fys_bnew_img%2f00%2f21%2f07%2feicTguByVx.jpg&ehk=5tWHfRxk4FUJayqGcHdQ63mHjbBrslYp3CI9bUutXJM%3d&risl=&pid=ImgRaw&r=0",
        "https://n.sinaimg.cn/spider202034/383/w1080h903/20200304/7820-iqfqmau1499737.jpg",
      ],
      newsItems: [
        {
          title: "在中国年轻人中，与肥胖相关的癌症发病率急剧上升",
          description:
            "8月23日，发表在细胞出版社（Cell Press）旗下期刊Med上的一项综合研究显示，2007年至2021年间，中国与肥胖相关的癌症发病率以惊人的速度每年增长3.6%......",
          url: "https://new.qq.com/rain/a/20240821A02CT100",
        },
        {
          title: "数说｜最新癌症统计报告发布：肺癌再次成为全球第一大癌",
          description:
            "本周是中国第 30 个全国肿瘤防治宣传周。世界卫生组织下属的国际癌症研究机构（IARC）的 Freddie Bray 领衔的团队，近期也在医学领域影响因子排名第一的期刊《临床医师癌症杂志》上，发布了最新的癌症报告",
          url: "https://www.thepaper.cn/newsDetail_forward_26966880",
        },
        {
          title: "国家癌症中心刚刚发布：2024年全国癌症报告",
          description:
            "本次发布的结果为国家癌症中心与国际肿瘤研究机构（IARC）联合测算，与IARC发布的GLOBOCAN 2022的中国数据保持一致且同步发布。中国肿瘤登记数据质量和规范程度进一步提高，获得国内外一致认可，更新的恶性肿瘤负担数据能够为肿瘤防控和国家健康战略实施提供更客观的基础数据。",
          url: "https://www.thepaper.cn/newsDetail_forward_28031161",
        },
      ],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleNewsClick(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
/* 顶部 Logo 图片 */
.logo {
  width: 50px;
  height: 50px;
}

/* 卡片样式 */
.system-intro {
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: #007bff;
}

.card-title {
  color: white;
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1.8;
  text-align: center;
}

.card-desc {
  color: white;
  font-size: 30px;
  line-height: 1.6;
  text-align: center;
}

#news {
  margin-top: 5px;
}

.news-cards {
  margin-top: 20px;
}

.el-card {
  cursor: pointer;
}

.el-card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.page-footer {
  margin-top: 20px;
}

.new-source-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.links {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.link-item {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.link-item:hover {
  background-color: #0056b3;
  color: white;
}
/* #0056b3 */
footer {
  margin-top: 0px;
  font-size: 0.8em;
  color: black;
  text-align: center;
}

.all {
  background-color: #f5f5f5;
}
.clearfix {
  font-size: 20px;
  font-weight: bold;
}
</style>