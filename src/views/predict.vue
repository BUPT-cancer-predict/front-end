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
  <div class="patient-form" v-if="!showResult">
    <div class="overlay">
      <h3>请填写您的信息</h3>
    </div>
    <div class="form-container">
      <el-form
        :model="patientForm"
        :rules="rules"
        ref="patientFormRef"
        label-width="160px"
      >
        <el-form-item prop="ageAtDiagnosis" class="center-form-item">
          <template #label>
            <el-tooltip
              content="请输入患者的确诊年龄，这会影响我们对您的病情的进一步判断"
              placement="top"
            >
              <span>确诊年龄</span>
            </el-tooltip>
          </template>
          <el-input
            v-model.number="patientForm.ageAtDiagnosis"
            type="number"
            :min="0"
            class="center-input"
          ></el-input>
        </el-form-item>

        <el-form-item prop="familyHistory" class="center-form-item">
          <template #label>
            <el-tooltip
              content="请输入患者的恶性肿瘤家族史，这会影响我们对您的病情的进一步判断"
              placement="top"
            >
              <span>恶性肿瘤家族史</span>
            </el-tooltip>
          </template>
          <el-radio-group
            v-model="patientForm.familyHistory"
            class="center-content"
          >
            <el-radio :label="1">有</el-radio>
            <el-radio :label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="bmi" class="center-form-item">
          <template #label>
            <el-tooltip
              content="请输入患者的BMI，这会影响我们对您的病情的进一步判断"
              placement="top"
            >
              <span>BMI</span>
            </el-tooltip>
          </template>
          <el-input
            v-model.number="patientForm.bmi"
            type="number"
            :min="0"
            class="center-input"
          ></el-input>
        </el-form-item>

        <el-form-item prop="pregnancies" class="center-form-item">
          <template #label>
            <el-tooltip content="请输入患者的孕史" placement="top">
              <span>孕史</span>
            </el-tooltip>
          </template>
          <el-input
            v-model.number="patientForm.pregnancies"
            type="number"
            :min="0"
            class="center-input"
          ></el-input>
        </el-form-item>

        <el-form-item prop="deliveries" class="center-form-item">
          <template #label>
            <el-tooltip content="请输入患者的产史" placement="top">
              <span>产史</span>
            </el-tooltip>
          </template>
          <el-input
            v-model.number="patientForm.deliveries"
            type="number"
            :min="0"
            class="center-input"
          ></el-input>
        </el-form-item>

        <el-form-item prop="ca125" class="center-form-item">
          <template #label>
            <el-tooltip content="请输入患者的CA125" placement="top">
              <span>CA125</span>
            </el-tooltip>
          </template>
          <el-radio-group v-model="patientForm.ca125" class="center-content">
            <el-radio :label="1">大于35</el-radio>
            <el-radio :label="0">小于等于35</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="ca199" class="center-form-item">
          <template #label>
            <el-tooltip content="请输入患者的CA199" placement="top">
              <span>CA199</span>
            </el-tooltip>
          </template>
          <el-radio-group v-model="patientForm.ca199" class="center-content">
            <el-radio :label="1">大于40</el-radio>
            <el-radio :label="0">小于等于40</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="pathologyType" class="center-form-item">
          <template #label>
            <el-tooltip content="请输入患者的病理类型" placement="top">
              <span>病理类型</span>
            </el-tooltip>
          </template>
          <el-select
            v-model="patientForm.pathologyType"
            placeholder="请选择病理类型"
            class="center-input"
          >
            <el-option
              v-for="item in pathologyTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="microPapillary" class="center-form-item">
          <template #label>
            <el-tooltip content="请输入患者的微乳头数值" placement="top">
              <span>微乳头</span>
            </el-tooltip>
          </template>
          <el-radio-group
            v-model="patientForm.microPapillary"
            class="center-content"
          >
            <el-radio :label="1">有</el-radio>
            <el-radio :label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="highRiskPathology" class="center-form-item">
          <template #label>
            <el-tooltip content="请输入患者的高危病理特征" placement="top">
              <span>高危病理特征</span>
            </el-tooltip>
          </template>
          <el-input
            v-model="patientForm.highRiskPathology"
            placeholder="用逗号分割"
            class="center-input"
          ></el-input>
        </el-form-item>

        <el-form-item prop="cystRupture" class="center-form-item">
          <template #label>
            <el-tooltip content="请输入患者术中是否见囊肿破裂" placement="top">
              <span>术中是否见囊肿破裂</span>
            </el-tooltip>
          </template>
          <el-radio-group
            v-model="patientForm.cystRupture"
            class="center-content"
          >
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="stage" class="center-form-item">
          <template #label>
            <el-tooltip content="请输入患者的分期情况" placement="top">
              <span>分期</span>
            </el-tooltip>
          </template>
          <el-select
            v-model="patientForm.stage"
            placeholder="请选择分期"
            class="center-input"
          >
            <el-option
              v-for="item in stages"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="surgeryMethod" class="center-form-item">
          <template #label>
            <el-tooltip content="请输入患者的手术方式" placement="top">
              <span>手术方式</span>
            </el-tooltip>
          </template>

          <el-radio-group
            v-model="patientForm.surgeryMethod"
            class="center-content"
          >
            <el-radio :label="0">开腹</el-radio>
            <el-radio :label="1">腹腔镜</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="surgeryScope" class="center-form-item">
          <template #label>
            <el-tooltip content="请输入患者的手术范围" placement="top">
              <span>手术范围</span>
            </el-tooltip>
          </template>
          <el-input
            v-model="patientForm.surgeryScope"
            placeholder="用逗号分割"
            class="center-input"
          ></el-input>
        </el-form-item>

        <el-form-item prop="bilateralBorderline" class="center-form-item">
          <template #label>
            <el-tooltip content="请输入患者的双侧交界" placement="top">
              <span>双侧交界</span>
            </el-tooltip>
          </template>
          <el-radio-group
            v-model="patientForm.bilateralBorderline"
            class="center-content"
          >
            <el-radio :label="1">单侧</el-radio>
            <el-radio :label="2">双侧</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="maxDiameter" class="center-form-item">
          <template #label>
            <el-tooltip content="请输入患者的最大径大小" placement="top">
              <span>最大径大小</span>
            </el-tooltip>
          </template>
          <el-input
            v-model.number="patientForm.maxDiameter"
            type="number"
            :min="0"
            class="center-input"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <div class="button-group">
    <el-button
      type="primary"
      :disabled="isSubmitButtonDisabled"
      @click="submitForm(patientFormRef)"
    >
      提交 ({{ Math.round(fillPercentage) }}%)
    </el-button>
    <el-button @click="resetForm(patientFormRef)">重置</el-button>
  </div>

  <div class="result" v-if="showResult">
    <div class="result-header">
      <div class="title-container">
        <div class="title">预测结果</div>
      </div>
    </div>
    <div class="result-form">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        header-cell-style="background-color: #666; color: #fff;"
      >
        <el-table-column prop="label" label="项目" width="200" align="center">
        </el-table-column>
        <el-table-column prop="value" label="值" align="center">
          <template #default="{ row }">
            <div v-if="row.key === 'recurrenceProbability'">
              {{ row.value }}%
            </div>
            <div v-else-if="row.key === 'riskLevel'">
              <el-tag
                :type="riskLevelType"
                effect="dark"
                size="large"
                class="custom-tag"
              >
                {{ row.value }}
              </el-tag>
            </div>
            <div v-else-if="row.key === 'suggestions'">
              <el-tag
                type="success"
                effect="dark"
                size="large"
                class="custom-tag"
              >
                {{ row.value }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <div class="download">
        <el-button @click="generateWordDocument">下载完整预测报告</el-button>
        <el-button @click="goBackAndReset">返回填写表单</el-button>
      </div>
    </div>
  </div>
  <pagefooter></pagefooter>
</template>
  
  
  <script>
import axios from "axios";
import { ref, reactive, computed } from "vue";
import { Column, Document, Packer, Paragraph, TextRun } from "docx";
import "jspdf-autotable";
import { saveAs } from "file-saver";

import {
  ElMessage,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadioGroup,
  ElRadio,
  ElSelect,
  ElOption,
  ElInputNumber,
  ElLoading,
  ElProgress,
  ElButton,
  ElTable,
  ElTableColumn,
  ElTag,
} from "element-plus";

export default {
  conponents: {
    ElForm,
    ElFormItem,
    ElInput,
    ElRadioGroup,
    ElRadio,
    ElSelect,
    ElOption,
    ElInputNumber,
    ElLoading,
    ElProgress,
    ElButton,
    ElTable,
    ElTableColumn,
    ElTag,
  },

  setup() {
    const patientFormRef = ref(null);
    const patientForm = reactive({
      ageAtDiagnosis: null,
      familyHistory: null,
      bmi: null,
      pregnancies: null,
      deliveries: null,
      ca125: null,
      ca199: null,
      pathologyType: null,
      microPapillary: null,
      highRiskPathology: "",
      cystRupture: null,
      stage: null,
      surgeryMethod: null,
      surgeryScope: "",
      bilateralBorderline: null,
      maxDiameter: null,
    });

    //假数据
    const fakeData = {
      recurrenceProbability: 20,
      riskLevel: "中风险",
      suggestions: "定期复查，注意休息",
    };

    const rules = {
      ageAtDiagnosis: [
        { required: true, message: "请输入确诊年龄", trigger: "blur" },
      ],
      familyHistory: [
        { required: true, message: "请选择恶性肿瘤家族史", trigger: "change" },
      ],
      bmi: [{ required: true, message: "请输入BMI", trigger: "blur" }],
      pregnancies: [{ required: true, message: "请输入孕史", trigger: "blur" }],
      deliveries: [{ required: true, message: "请输入产史", trigger: "blur" }],
      ca125: [{ required: true, message: "请选择CA125", trigger: "change" }],
      ca199: [{ required: true, message: "请选择CA199", trigger: "change" }],
      pathologyType: [
        { required: true, message: "请选择病理类型", trigger: "change" },
      ],
      microPapillary: [
        { required: true, message: "请选择微乳头", trigger: "change" },
      ],
      highRiskPathology: [
        { required: true, message: "请输入高危病理特征", trigger: "change" },
      ],
      cystRupture: [
        {
          required: true,
          message: "请选择术中是否见囊肿破裂",
          trigger: "change",
        },
      ],
      stage: [{ required: true, message: "请选择分期", trigger: "change" }],
      surgeryMethod: [
        { required: true, message: "请选择手术方式", trigger: "change" },
      ],
      surgeryScope: [
        { required: true, message: "请输入手术范围", trigger: "blur" },
      ],
      bilateralBorderline: [
        { required: true, message: "请选择双侧交界", trigger: "change" },
      ],
      maxDiameter: [
        { required: true, message: "请输入最大径大小", trigger: "blur" },
      ],
    };

    const pathologyTypes = [
      { value: 1, label: "类型1" },
      { value: 2, label: "类型2" },
      // 根据实际情况添加更多选项
    ];

    const stages = [
      { value: 1, label: "I期" },
      { value: 2, label: "II期" },
      // 根据实际情况添加更多选项
    ];

    // 计算填写进度
    const filledFieldsCount = computed(() => {
      return Object.values(patientForm).filter(
        (value) => value !== null && value !== ""
      ).length;
    });

    const totalFields = Object.keys(patientForm).length;

    const fillPercentage = computed(() => {
      return (filledFieldsCount.value / totalFields) * 100;
    });

    // 控制提交按钮状态
    const isSubmitButtonDisabled = computed(() => {
      return filledFieldsCount.value < totalFields;
    });

    const tableData = ref([]);

    const showResult = ref(false);

    const riskLevelType = ref("warning");

    const submitForm = (formEl) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          // 显示加载提示
          ElMessage({ message: "正在提交数据...", type: "info" });

          axios
            .post("api/submit-predict", patientForm.value)
            .then((response) => {
              // 隐藏加载提示
              ElMessage.success("提交成功！");
              showProgress(response.data);
              updateTableData(response.data);
              showResult.value = true;
            })
            .catch((error) => {
              // 隐藏加载提示
              ElMessage.error("提交失败：" + error.message);
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    const showProgress = (data) => {
      // 使用消息提示代替进度条
      ElMessage({ message: "数据处理中...", type: "info" });

      setTimeout(() => {
        ElMessage.success("数据处理完成");
      }, 3000);
    };

    const updateTableData = (data) => {
      tableData.value = [
        {
          label: "复发概率",
          key: "recurrenceProbability",
          value: data.recurrenceProbability,
        },
        { label: "风险等级", key: "riskLevel", value: data.riskLevel },
        { label: "建议", key: "suggestions", value: data.suggestions },
      ];

      if (data.riskLevel === "低风险") {
        riskLevelType.value = "success";
      } else if (data.riskLevel === "中风险") {
        riskLevelType.value = "warning";
      } else if (data.riskLevel === "高风险") {
        riskLevelType.value = "danger";
      }
    };

    const goBackAndReset = () => {
      showResult.value = false;
      resetForm(patientFormRef.value);
    };

    const resetForm = (formEl) => {
      if (!formEl) return;
      formEl.resetFields();

      //下删
      showResult.value = !showResult.value;
      updateTableData(fakeData);
    };

    const downloadFormat = ref(null);

    const generateWordDocument = () => {
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: "患者信息",
                heading: "heading_1",
              }),
              new Paragraph({
                text: `确诊年龄: ${patientForm.ageAtDiagnosis}`,
              }),
              new Paragraph({
                text: `恶性肿瘤家族史: ${
                  patientForm.familyHistory ? "有" : "无"
                }`,
              }),
              new Paragraph({
                text: `BMI: ${patientForm.bmi}`,
              }),
              new Paragraph({
                text: `孕史: ${patientForm.pregnancies}`,
              }),
              new Paragraph({
                text: `产史: ${patientForm.deliveries}`,
              }),
              new Paragraph({
                text: `CA125: ${
                  patientForm.ca125 === 1 ? "大于35" : "小于等于35"
                }`,
              }),
              new Paragraph({
                text: `CA199: ${
                  patientForm.ca199 === 1 ? "大于40" : "小于等于40"
                }`,
              }),
              new Paragraph({
                text: `病理类型: ${patientForm.pathologyType}`,
              }),
              new Paragraph({
                text: `微乳头: ${patientForm.microPapillary ? "有" : "无"}`,
              }),
              new Paragraph({
                text: `高危病理特征: ${patientForm.highRiskPathology}`,
              }),
              new Paragraph({
                text: `术中是否见囊肿破裂: ${
                  patientForm.cystRupture ? "是" : "否"
                }`,
              }),
              new Paragraph({
                text: `分期: ${patientForm.stage}`,
              }),
              new Paragraph({
                text: `手术方式: ${
                  patientForm.surgeryMethod === 0 ? "开腹" : "腹腔镜"
                }`,
              }),
              new Paragraph({
                text: `手术范围: ${patientForm.surgeryScope}`,
              }),
              new Paragraph({
                text: `双侧交界: ${
                  patientForm.bilateralBorderline === 1 ? "单侧" : "双侧"
                }`,
              }),
              new Paragraph({
                text: `最大径大小: ${patientForm.maxDiameter}`,
              }),

              new Paragraph({
                text: "预测结果",
                heading: "heading_1",
              }),
              new Paragraph({
                text: `复发概率: ${
                  tableData.value.find(
                    (item) => item.key === "recurrenceProbability"
                  ).value
                }%`,
              }),
              new Paragraph({
                text: `风险等级: ${
                  tableData.value.find((item) => item.key === "riskLevel").value
                }`,
              }),
              new Paragraph({
                text: `建议: ${
                  tableData.value.find((item) => item.key === "suggestions")
                    .value
                }`,
              }),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "预测报告.docx");
      });
    };

    return {
      patientForm,
      rules,
      pathologyTypes,
      stages,
      patientFormRef,
      submitForm,
      resetForm,
      fillPercentage,
      isSubmitButtonDisabled,
      showResult,
      riskLevelType,
      tableData,
      updateTableData,
      showResult,
      goBackAndReset,
      downloadFormat,
      generateWordDocument,
      //假数据测试
      fakeData,
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

.patient-form {
  position: absolute;
  top: 52%;
  left: 50%;
  width: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.overlay {
  text-align: center;
}

.form-container {
  height: 500px; /* 设置固定高度 */
  width: 700px;
  overflow-y: auto; /* 加入手动滚动条 */
}
.center-form-item {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
}
.center-content {
  display: flex;
  justify-content: center;
}
.center-input .el-input__inner {
  text-align: center;
}

.el-input,
.el-radio-group {
  width: 90%;
}
.el-select {
  width: 90%;
  text-align: center;
}

.el-select__popper {
  width: 48%;
  max-width: 48%;
  position: absolute;
  left: 50%;
  transform: translateX(-21%);
}

.el-select-dropdown .el-scrollbar__wrap .el-select-dropdown__item {
  text-align: center;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  position: absolute;
  bottom: 10px; /* 距离底部的距离 */
  left: 50%;
  transform: translateX(-50%);
}

.result {
  position: absolute;
  top: 30%; /* 调整顶部位置 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 3; /* 确保在表单之上 */
  width: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-form {
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 5px;
  padding-bottom: 10px;
  width: 90%;
}

.el-table {
  width: 90%;
  font-size: 14px;
}

.el-table th,
.el-table td {
  white-space: nowrap;
}

.el-table-column {
  width: auto;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.title-container {
  display: flex;
  justify-content: center;
  flex: 1;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.custom-tag {
  font-size: 14px; /* 字体大小 */
  border-radius: 8px; /* 边框圆角 */
  color: #333; /* 文字颜色 */
}

.download .el-button {
  border-radius: 50px; /* 圆角 */
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid #ff6347;
  color: rgb(14, 13, 13);
  font-weight: bold;
  width: 200px;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>