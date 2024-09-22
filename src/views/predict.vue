<template>
  <div class="introduce">
    <img
      src="../assets/predict.png"
      alt="Background Image"
      class="background-image"
    />
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
  </div>
  <div class="patient-form">
    <div class="overlay">
      <h2>患者信息填写</h2>
      <span class="hint">(鼠标悬停对应的标签可获取简要提示说明)</span>
    </div>
    <el-form
      :model="patientForm"
      :rules="rules"
      ref="patientFormRef"
      label-width="160px"
    >
      <el-form-item prop="ageAtDiagnosis">
        <template #label>
          <el-tooltip
            content="请输入患者的确诊年龄，这会影响我们对您的病情的进一步判断"
            placement="top"
          >
            <span>确诊年龄</span>
          </el-tooltip>
        </template>
        <el-input v-model.number="patientForm.ageAtDiagnosis"></el-input>
      </el-form-item>

      <el-form-item prop="familyHistory">
        <template #label>
          <el-tooltip
            content="请输入患者的恶性肿瘤家族史，这会影响我们对您的病情的进一步判断"
            placement="top"
          >
            <span>恶性肿瘤家族史</span>
          </el-tooltip>
        </template>
        <el-radio-group v-model="patientForm.familyHistory">
          <el-radio :label="1">有</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="bmi">
        <template #label>
          <el-tooltip
            content="请输入患者的BMI，这会影响我们对您的病情的进一步判断"
            placement="top"
          >
            <span>BMI</span>
          </el-tooltip>
        </template>
        <el-input v-model.number="patientForm.bmi"></el-input>
      </el-form-item>

      <el-form-item prop="pregnancies">
        <template #label>
          <el-tooltip content="请输入患者的孕史" placement="top">
            <span>孕史</span>
          </el-tooltip>
        </template>
        <el-input-number
          v-model="patientForm.pregnancies"
          :min="0"
        ></el-input-number>
      </el-form-item>

      <el-form-item prop="deliveries">
        <template #label>
          <el-tooltip content="请输入患者的产史" placement="top">
            <span>产史</span>
          </el-tooltip>
        </template>
        <el-input-number
          v-model="patientForm.deliveries"
          :min="0"
        ></el-input-number>
      </el-form-item>

      <el-form-item prop="ca125">
        <template #label>
          <el-tooltip content="请输入患者的CA125" placement="top">
            <span>CA125</span>
          </el-tooltip>
        </template>
        <el-radio-group v-model="patientForm.ca125">
          <el-radio :label="1">大于35</el-radio>
          <el-radio :label="0">小于等于35</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="ca199">
        <template #label>
          <el-tooltip content="请输入患者的CA199" placement="top">
            <span>CA199</span>
          </el-tooltip>
        </template>
        <el-radio-group v-model="patientForm.ca199">
          <el-radio :label="1">大于40</el-radio>
          <el-radio :label="0">小于等于40</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="pathologyType">
        <template #label>
          <el-tooltip content="请输入患者的病理类型" placement="top">
            <span>病理类型</span>
          </el-tooltip>
        </template>
        <el-select
          v-model="patientForm.pathologyType"
          placeholder="请选择病理类型"
        >
          <el-option
            v-for="item in pathologyTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="microPapillary">
        <template #label>
          <el-tooltip content="请输入患者的微乳头数值" placement="top">
            <span>微乳头</span>
          </el-tooltip>
        </template>
        <el-radio-group v-model="patientForm.microPapillary">
          <el-radio :label="1">有</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="highRiskPathology">
        <template #label>
          <el-tooltip content="请输入患者的高危病理特征" placement="top">
            <span>高危病理特征</span>
          </el-tooltip>
        </template>
        <el-input v-model="patientForm.highRiskPathology"></el-input>
      </el-form-item>

      <el-form-item prop="cystRupture">
        <template #label>
          <el-tooltip content="请输入患者术中是否见囊肿破裂" placement="top">
            <span>术中是否见囊肿破裂</span>
          </el-tooltip>
        </template>
        <el-radio-group v-model="patientForm.cystRupture">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="stage">
        <template #label>
          <el-tooltip content="请输入患者的分期情况" placement="top">
            <span>分期</span>
          </el-tooltip>
        </template>
        <el-select v-model="patientForm.stage" placeholder="请选择分期">
          <el-option
            v-for="item in stages"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="surgeryMethod">
        <template #label>
          <el-tooltip content="请输入患者的手术方式" placement="top">
            <span>手术方式</span>
          </el-tooltip>
        </template>

        <el-radio-group v-model="patientForm.surgeryMethod">
          <el-radio :label="0">开腹</el-radio>
          <el-radio :label="1">腹腔镜</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="surgeryScope">
        <template #label>
          <el-tooltip content="请输入患者的手术范围" placement="top">
            <span>手术范围</span>
          </el-tooltip>
        </template>
        <el-input v-model="patientForm.surgeryScope"></el-input>
      </el-form-item>

      <el-form-item prop="bilateralBorderline">
        <template #label>
          <el-tooltip content="请输入患者的双侧交界" placement="top">
            <span>双侧交界</span>
          </el-tooltip>
        </template>
        <el-radio-group v-model="patientForm.bilateralBorderline">
          <el-radio :label="1">单侧</el-radio>
          <el-radio :label="2">双侧</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="maxDiameter">
        <template #label>
          <el-tooltip content="请输入患者的最大径大小" placement="top">
            <span>最大径大小</span>
          </el-tooltip>
        </template>
        <el-input-number
          v-model="patientForm.maxDiameter"
          :min="0"
        ></el-input-number>
      </el-form-item>

      <el-form-item>
        <div class="button-group">
          <el-button type="primary" @click="submitForm(patientFormRef)"
            >提交</el-button
          >
          <el-button @click="resetForm(patientFormRef)">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  
  <script>
import axios from "axios";
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
} from "element-plus";
import { ref } from "vue";
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
  },

  setup() {
    const patientForm = ref({
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

    const patientFormRef = ref(null);

    const submitForm = (formEl) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          const loadingInstance = ElLoading.service({
            lock: true,
            text: "正在提交数据...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });

          axios
            .post("/api/submit-patient-form", patientForm.value)
            .then((response) => {
              loadingInstance.close();
              ElMessage.success("提交成功！");
              showProgress(response.data);
            })
            .catch((error) => {
              loadingInstance.close();
              ElMessage.error("提交失败：" + error.message);
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    const showProgress = (data) => {
      const progressInstance = ElProgress.service({
        percentage: 0,
        status: "active",
        duration: 0,
      });

      let intervalId = setInterval(() => {
        progressInstance.percentage += 10;
        if (progressInstance.percentage >= 100) {
          clearInterval(intervalId);
          progressInstance.percentage = 100;
          progressInstance.status = "success";
          navigateToNextPage(data);
        }
      }, 500);
    };

    const navigateToNextPage = (data) => {
      // 假设跳转到 `/next-page` 并携带响应数据
      window.location.href = `/present?data=${encodeURIComponent(
        JSON.stringify(data)
      )}`;
    };

    const resetForm = (formEl) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    return {
      patientForm,
      rules,
      pathologyTypes,
      stages,
      patientFormRef,
      submitForm,
      resetForm,
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

.background-image {
  position: absolute;
  top: 40%;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
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

.patient-form {
  position: absolute;
  top: 90%;
  left: 50%;
  width: 50%;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
}

.el-input,
.el-select,
.el-radio-group {
  width: calc(120% - 160px);
}

.overlay {
  text-align: center;
}

.hint {
  font-size: 14px;
  color: #666;
  margin-left: 3px;
}

.button-group {
  display: flex;
  margin-left: 130px;
}
</style>