<template>
  <div class="main">
    <div class="big">
      <!-- 身体区域 -->
      <div class="container">
        <!-- 表单区域 -->
        <table width="1000px">
          <th>预测表单</th>
          <tr>
            <td>确诊年龄</td>
            <td><input type="text" v-model="age" /></td>
          </tr>
          <tr>
            <td>是否有恶性肿瘤家族史,有为1，没有为0:</td>
            <td>
              <input
                type="radio"
                name="family"
                id="family1"
                value="1"
                v-model="familyHistory"
              />
              <label for="family1">1</label>
              <input
                type="radio"
                value="0"
                name="family"
                id="family0"
                v-model="familyHistory"
              />
              <label for="family0">0</label>
            </td>
          </tr>

          <tr>
            <td>BMI(身体质量指数):</td>
            <td>
              <input type="text" value="体重（kg）/身高²（m）" v-model="bmi" />
            </td>
          </tr>

          <tr>
            <td>怀孕史:</td>
            <td>
              <input
                type="text"
                value="患者怀孕次数"
                v-model="pregnancyHistory"
              />
            </td>
          </tr>
          <tr>
            <td>产史:</td>
            <td>
              <input
                type=" text"
                value="患者分娩次数"
                v-model="deliveryHistory"
              />
            </td>
          </tr>
          <tr>
            <td>CA125,大于35为1，反之为0:</td>
            <td>
              <input
                type="radio"
                name="125"
                id="1251"
                value="1"
                v-model="ca125"
              />
              <label for="1251">1</label>
              <input
                type="radio"
                name="125"
                id="1250"
                value="0"
                v-model="ca125"
              />
              <label for="1250">0</label>
            </td>
          </tr>
          <tr>
            <td>CA199,大于40为1，反之为0</td>
            <td>
              <input
                type="radio"
                name="199"
                id="1991"
                value="1"
                v-model="ca199"
              />
              <label for="1991">1</label>
              <input
                type="radio"
                name="199"
                id="1990"
                value="0"
                v-model="ca199"
              />
              <label for="1990">0</label>
            </td>
          </tr>
          <tr>
            <td>病理类型编号:</td>
            <td><input type="text" v-model="cancerSort" /></td>
          </tr>

          <tr>
            <td>微乳头(是否存在微乳头结构，无为0，有为1):</td>

            <td>
              <input
                type="radio"
                name="weirutou"
                id="weirutou1"
                value="1"
                v-model="weirutou"
              /><label for="weirutou1">1</label>
              <input
                type="radio"
                name="weirutou"
                id="weirutou0"
                value="0"
                v-model="weirutou"
              /><label for="weirutou0">0</label>
            </td>
          </tr>
          <tr>
            <td>
              高危病理特征:（是否存在高危病理特征，无为0，有为1,若有则标明具体特征，无则不用填）:
            </td>
            <td>
              <input
                type="radio"
                name="highrisk"
                id="highrisk0"
                value="0"
                v-model="highRisk"
              /><label for="highrisk0">0</label>
              <input
                type="radio"
                name="highrisk"
                id="highrisk1"
                value="1"
                v-model="highRisk"
              /><label for="highrisk1">1</label><br />具体类型:
              <input type="text" v-model="sort" />
            </td>
          </tr>
          <tr>
            <td>术中是否见囊肿破裂（有为1，没有为0）</td>
            <td>
              <input
                type="radio"
                name="nangzhong"
                id="nangzhong1"
                value="1"
                v-model="swellBreak"
              /><label for="nangzhong1">1</label>
              <input
                type="radio"
                name="nanhzhong"
                id="nangzhong0"
                value="0"
                v-model="swellBreak"
              /><label for="nangzhong0">0</label>
            </td>
          </tr>
          <tr>
            <td>分期（根据FIGO分期标准选择相应的分期编号）:</td>
            <td><input type="text" /></td>
          </tr>

          <tr>
            <td>手术方式（手术是开腹还是腹腔镜，开腹为0，腹腔镜为1）:</td>
            <td>
              <input
                type="radio"
                name="method"
                id="method1"
                value="1"
                v-model="surgeryMethod"
              /><label for="method1">1</label>
              <input type="radio" name="method" id="method0" value="0" /><label
                for="method0"
                >0</label
              >
            </td>
          </tr>

          <tr>
            <td>手术范围（手术的具体范围，具体编号对应不同的手术）:</td>
            <td><input type="text" v-model="surgeryRange" /></td>
          </tr>

          <tr>
            <td>双侧交界（是否为双侧交界性肿瘤，单侧为1，双侧为2）:</td>
            <td>
              <input
                type="radio"
                name="shuangce"
                id="shuangce1"
                value="1"
                v-model="bilateralBorder"
              /><label for="shuangce1">1</label>
              <input
                type="radio"
                name="shuangce"
                id="shuangce2"
                value="2"
                v-model="bilateralBorder"
              /><label for="shuangce2">2</label><br />
            </td>
          </tr>

          <tr>
            <td>最大径大小（肿瘤的最大径长度，不详时请输入0）：</td>
            <td><input type="text" v-model="maximum" /></td>
          </tr>
        </table>
        <!-- 按钮区域 -->
        <button :plain="true" @click="showOut" text-align="center">预测</button>
        <button @click="reset" style="margin-left: 20px">重新预测</button>
      </div>
    </div>
    <div class="feedback">
      <!-- 结果预测表 -->
      <el-descriptions
        class="margin-top"
        title="预测结果表"
        :column="3"
        :size="size"
        border
        direction="vertical"
      >
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">复发概率值</div>
          </template>
          <div v-if="showFlag">0%</div>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">风险等级划分</div>
          </template>
          <div v-if="showFlag">低风险</div>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">相关建议</div>
          </template>
          <div v-if="showFlag">好好休息</div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <pagefooter></pagefooter>
  </div>
  <page-footer></page-footer>
</template>
<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      showFlag: false,
      age: "",
      familyHistory: "",
      bmi: "",
      pregnancyHistory: "",
      deliveryHistory: "",
      ca125: "",
      ca199: "",
      cancerSort: "",
      sort: "",
      weirutou: "",
      highRisk: "",
      cancerCharacter: "",
      swellBreak: "",
      fenqi: "",
      surgeryMethod: "",
      surgeryRange: "",
      bilateralBorder: "",
      maximum: "",
    };
  },
  methods: {
    showOut() {
      this.showFlag = true;
      ElMessage("预测完成");
    },

    reset() {
      this.showFlag = false;
      this.age = "";
      this.familyHistory = "";
      this.bmi = "";
      this.pregnancyHistory = "";
      (this.deliveryHistory = ""), (this.ca125 = "");
      this.ca199 = "";
      this.cancerSort = "";
      this.sort = "";
      this.weirutou = "";
      this.highRisk = "";
      this.cancerCharacter = "";
      this.swellBreak = "";
      this.fenqi = "";
      this.surgeryMethod = "";
      this.surgeryRange = "";
      this.bilateralBorder = "";
      this.maximum = "";
      ElMessage("已重置");
    },
  },
};
</script>
<style>
/* 容器样式，增加一些内边距和最大宽度 */
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 10px auto; /* 居中显示 */
  border: 1px solid #dddddd;
  border-radius: 5px;
}

/* 表格样式 */
table {
  width: 100%; /* 宽度调整为100%，以适应不同屏幕 */
  /* border-collapse: collapse; 边框合并   */
  margin-bottom: 20px; /* 表格底部间距 */
}

/* 表格标题和单元格样式 */
th,
td {
  padding: 8px; /* 单元格内边距 */
  text-align: left; /* 文本左对齐 */
  border-bottom: 1px solid #ddd; /* 底部边框 */
}

/* 表格标题样式（如果需要的话） */
th {
  background-color: #fff; /* 背景色 */
  font-weight: bold; /* 字体加粗 */
}

/* 输入框和单选按钮样式 */
input[type="text"],
input[type="radio"] + label {
  margin-right: 10px; /* 输入框和标签之间的间距 */
}

/* 按钮样式 */
el-button,
button {
  padding: 10px 20px; /* 内边距 */
  margin-top: 20px; /* 顶部间距 */
  background-color: #007bff; /* 背景色 */
  color: white; /* 字体颜色 */
  border: none; /* 去除边框 */
  border-radius: 5px; /* 边框圆角 */
  cursor: pointer; /* 鼠标悬停时显示手指形状 */
  font-size: 16px; /* 字体大小 */
  margin-left: 800px;
}

/* 预测结果显示样式 */
div[v-if="showFlag"] {
  background-color: #f8f9fa; /* 背景色 */
  padding: 20px; /* 内边距 */
  border: 1px solid #ddd; /* 边框 */
  border-radius: 5px; /* 边框圆角 */
  margin-top: 20px; /* 顶部间距 */
}

/* 预测结果中的文本样式 */
div[v-if="showFlag"] p {
  margin: 0; /* 去除默认的外边距 */
  font-size: 16px; /* 字体大小 */
}
.output {
  text-align: center;
}
.head {
  display: flex;
  align-items: center;
  width: 100%;
  height: 75px;
  text-align: center;
  background-color: #007bff;
  border-radius: 5px;
  margin: 0 auto;
}
.logo {
  margin-left: 20px;
  width: 50px;
  height: 50px;
}
.headline {
  text-align: center;
  margin: 0 auto;
  color: white;
}
.bottom {
  /* display:flex;
  align-items: center; */
  text-align: center;
  border-top: 1px solid #dddddd;
}
.try {
  border: 2px solid;
}
.feedback {
  border: 1px solid #dddddd;

  padding: 20px;
  max-width: 1200px;
  margin: 20px auto;
}
</style>