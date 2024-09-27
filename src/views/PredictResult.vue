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
  </div>
  <div class="result">
    <div class="overlay">
      <h2>预测结果</h2>
    </div>
    <div class="result-form">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        header-cell-style="background-color: #666; color: #fff;"
      >
        <el-table-column
          prop="label"
          label="项目"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column prop="value" label="值" align="center">
          <template #default="{ row }">
            <div v-if="row.key === 'recurrenceProbability'">
              {{ row.value }}%
            </div>
            <div v-else-if="row.key === 'riskLevel'">
              <el-tag :type="riskLevelType" effect="dark" size="large">{{
                row.value
              }}</el-tag>
            </div>
            <div v-else-if="row.key === 'suggestions'">
              <el-tag type="success" effect="dark" size="large">{{
                row.value
              }}</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <pagefooter></pagefooter>
</template>

<script>
import axios from "axios";
import { ElCard, ElTag, ElAlert } from "element-plus";

export default {
  components: {
    ElCard,
    ElTag,
    ElAlert,
  },

  data() {
    return {
      recurrenceProbability: 0,
      riskLevel: "",
      riskLevelType: "",
      suggestions: "",
      tableData: [
        {
          key: "recurrenceProbability",
          label: "复发概率值",
          value: this.recurrenceProbability,
        },
        { key: "riskLevel", label: "风险等级", value: this.riskLevel },
        { key: "suggestions", label: "相关建议", value: this.suggestions },
      ],
    };
  },

  created() {
    // this.parseDataFromURL();

    // 使用假数据进行测试
    this.recurrenceProbability = 65;
    this.updateRiskLevel("高风险");
    this.suggestions = "及时就诊，注意休息";
    this.tableData = [
      {
        key: "recurrenceProbability",
        label: "复发概率值",
        value: this.recurrenceProbability,
      },
      { key: "riskLevel", label: "风险等级", value: this.riskLevel },
      { key: "suggestions", label: "相关建议", value: this.suggestions },
    ];
  },

  methods: {
    parseDataFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      const data = urlParams.get("data");
      if (data) {
        try {
          const parsedData = JSON.parse(decodeURIComponent(data));
          this.recurrenceProbability = parsedData.recurrenceProbability;
          this.updateRiskLevel(parsedData.riskLevel);
          this.suggestions = parsedData.suggestions;
        } catch (error) {
          console.error("Error parsing data:", error);
        }
      }
    },
    updateRiskLevel(riskLevel) {
      if (riskLevel === "低风险") {
        this.riskLevel = "低风险";
        this.riskLevelType = "success";
      } else if (riskLevel === "中风险") {
        this.riskLevel = "中风险";
        this.riskLevelType = "warning";
      } else if (riskLevel === "高风险") {
        this.riskLevel = "高风险";
        this.riskLevelType = "danger";
      }
    },
  },
};
</script>

<style>
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

.result {
  position: absolute;
  top: 52%;
  left: 50%;
  width: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}

.result-form {
  margin: 20px; /* 添加边距 */
}
</style>